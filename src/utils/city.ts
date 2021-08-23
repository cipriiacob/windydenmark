import {City, SortingOptions} from "../redux/weatherInCities";

export function sort(cityList: City[], sortingPreference: SortingOptions) {
    switch (sortingPreference) {
        case SortingOptions.LEAST_WINDY:
            return [...cityList].sort((a, b) => a.wind.speed - b.wind.speed);
        case SortingOptions.WINDY:
            return [...cityList].sort((a, b) => b.wind.speed - a.wind.speed);
        default:
            return cityList;
    }
}
