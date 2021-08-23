import React, {useEffect, useState} from 'react';

import {City, fetchCitiesByCoord, fetchFavouriteCities} from './redux/weatherInCities';
import MainPage from "./components/MainPage/MainPage";
import {useDispatch, useSelector} from "react-redux";

const App = () => {
    const [refreshFavouritesInterval, setRefreshFavouritesInterval] = useState(undefined)
    const [refreshAllCitiesInterval, setRefreshAllCitiesInterval] = useState(undefined)
    const dispatch = useDispatch()

    const coordinates = useSelector(((state: any) => state.weatherInCities.coordinates))
    const favouriteCities = useSelector(((state: any) => state.weatherInCities.favouriteCities))

    useEffect(() => {
        dispatch(fetchCitiesByCoord({...coordinates}))
    }, [])

    useEffect(() => {
        setRefreshFavouritesInterval(setInterval(() => {

            const favouriteCitiesIds = favouriteCities
                .filter((city: City) => city.favourite!.isFavourite)
                .map((city: City) => city.id)

            dispatch(fetchFavouriteCities(favouriteCitiesIds))
        }, 30 * 60 * 1000) as any)
        setRefreshAllCitiesInterval(setInterval(() => {
            dispatch(fetchCitiesByCoord(coordinates))
        }, 6 * 60 * 60 * 1000) as any)
        return () => {
            clearInterval(refreshFavouritesInterval)
            setRefreshFavouritesInterval(undefined)
            clearInterval(refreshAllCitiesInterval)
            setRefreshAllCitiesInterval(undefined)
        }
    }, [])

    return <MainPage/>
}
export default App;
