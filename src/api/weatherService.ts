import { City } from '../redux/weatherInCities'
import rawList from '../mocked/nearCluj.json'

const BASE_URL: string = 'http://api.openweathermap.org/data/2.5/'

const devMode: boolean = false;
const APPID: string = '155aa8a2a26e8f5868794737284baeae';
const FETCH_SIZE = 50;
const UNITS: string = 'metric'

function parseCity (rawCity: any) {
    return {
        id: rawCity.id,
        name: rawCity.name,
        isFavourite: false,
        weather: {
            main: rawCity.weather[0].main,
            description: rawCity.weather[0].description,
            icon: rawCity.weather[0].icon
        },
        rain: rawCity.rain,
        wind: {
            speed: rawCity.wind.speed,
            deg: rawCity.wind.deg
        },
        clouds: {
            all: rawCity.clouds.all
        },
        main: {
            temp: rawCity.main.temp
        }
    } as City
}
function parseCityList (rawResponse: any): City[] {
    return rawResponse.list.map((rawCity: any) => parseCity(rawCity));
}

export function fetchCities(lat: number, lon: number) {
    if (devMode) return Promise.resolve(parseCityList(rawList))

    let url = BASE_URL + 'find?'
        + 'lat=' + lat + '&lon=' + lon
        + '&cnt=' + FETCH_SIZE
        + '&units=' + UNITS
        + '&appid=' + APPID

    return fetch(url)
        .then((result: any) => result.json())
        .then((data) => {
            return parseCityList(data)
        })
}

export function fetchCitiesById(ids: number[]) {
    let url = BASE_URL + 'weather?'
        + '&units=' + UNITS
        + '&appid=' + APPID
        + '&id='

    let promises = ids.map((id: number) =>
        fetch(url + id)
            .then((result: any) => result.json())
            .then((data) => parseCity(data)))
    return Promise.all(promises)
}
