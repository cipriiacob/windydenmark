import {City} from "./weatherInCities";

const FAVOURITES = 'favouriteCities'

export function getCachedFavourites(): City[] {
    const cachedFavourites = localStorage.getItem(FAVOURITES)
    if (cachedFavourites) {
        return JSON.parse(cachedFavourites)
    }
    return []
}

export function updateCachedFavourites(items: City[]) {
    localStorage.setItem(FAVOURITES, JSON.stringify(items))
}
