import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchCities, fetchCitiesById} from "../api/weatherService";
import {getCachedFavourites, updateCachedFavourites} from "./localStorageManager";

export enum SortingOptions {
    PROXIMITY = 'proximity',
    WINDY = 'windy',
    LEAST_WINDY = 'least windy'
}

export type City = {
    id: number,
    name: string,
    weather: {
        main: string,
        description: string,
        icon: string
    },
    rain: any,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    main: {
        temp: number
    },
    favourite?: {
        isFavourite: boolean,
        favouriteIndex: number
    }
}

type Coordinates = {
    lat: number,
    lon: number
}

type stateType = {
    cityList: City[],
    sortingPreference: SortingOptions,
    status: string,
    coordinates: Coordinates,
    favouriteCurrentIndex: number
}

const initialState: stateType = {
    cityList: [],
    sortingPreference: SortingOptions.PROXIMITY,
    status: 'ok',
    coordinates: {
        lat: 46.7593700345782,
        lon: 23.582500997337327
    },
    favouriteCurrentIndex: 0
}

export const fetchCitiesByCoord = createAsyncThunk(
    'cities/fetchCitiesByCoord',
    async ({lat, lon}: Coordinates) => {
        return fetchCities(lat, lon);
    }
)

export const fetchFavouriteCities = createAsyncThunk(
    'cities/fetchFavouriteCities',
    async (ids: number[]) => {
        return fetchCitiesById(ids);
    }
)

export const weatherInCitiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setSortingPreference(state, action) {
            state.sortingPreference = action.payload
        },
        addFavourite(state, action) {
            const newCityId = action.payload

            //Adding a 'favouriteIndex' so the favourite cities can be displayed in the order the user added them.
            state.cityList.find((city) => city.id === newCityId)!.favourite = {
                isFavourite: true,
                favouriteIndex: state.favouriteCurrentIndex++
            }
            updateCachedFavourites(state.cityList.filter((city) => city.favourite))
        },
        removeFavourite(state, action) {
            state.cityList.find(({id}) => id === action.payload)!.favourite = undefined
            updateCachedFavourites(state.cityList.filter((city) => city.favourite))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCitiesByCoord.pending, (state, action) => {
            state.status = 'loading'
        });
        builder.addCase(fetchCitiesByCoord.fulfilled, (state, action) => {
            state.status = 'ok'
            state.cityList = action.payload
            const favouriteCities = getCachedFavourites();
            favouriteCities.forEach((favCity) => {
                state.cityList.find((city: City) => city.id === favCity.id)!.favourite = {
                    isFavourite: true,
                    favouriteIndex: favCity.favourite!.favouriteIndex
                }
            });
        });
        builder.addCase(fetchCitiesByCoord.rejected, (state, action) => {
            state.status = 'error'
        });
        builder.addCase(fetchFavouriteCities.pending, (state, action) => {
            state.status = 'loading'
        });
        builder.addCase(fetchFavouriteCities.fulfilled, (state, action) => {
            state.status = 'ok';
            action.payload.forEach((newStats: City) => {
                const indexToUpdate = state.cityList.findIndex((city: City) => city.id === newStats.id)
                state.cityList[indexToUpdate] = {  ...newStats, favourite: state.cityList[indexToUpdate].favourite  }
            })
        });
        builder.addCase(fetchFavouriteCities.rejected, (state, action) => {
            state.status = 'error'
        });
    }
})

export const {
    setSortingPreference,
    addFavourite,
    removeFavourite,
} = weatherInCitiesSlice.actions

export default weatherInCitiesSlice.reducer
