import React, {useState} from "react";
import {
    City,
    setSortingPreference,
    SortingOptions
} from "../../redux/weatherInCities";
import {useDispatch, useSelector} from "react-redux";
import CardList from "../CardList/CardList";

import './MainPage.scss'
import SeparatorBar from "../SeparatorBar/SeparatorBar";
import SelectableTabs from "../SelectableTabs/SelectableTabs";
import ApplicationHeader from "../ApplicationHeader/ApplicationHeader";
import CenteredContent from "../CenteredContent/CenteredContent";
import Button from "../Button/Button";
import {sort} from "../../utils/city";

function getFavourites (favourites: City[]) {
    return [...favourites.filter((city: City) => city.favourite && city.favourite.isFavourite)]
        .sort((a: City, b: City) => a.favourite!.favouriteIndex - b.favourite!.favouriteIndex)
}

function MainPage () {
    const [currentlyDisplaying, setCurrentlyDisplaying] = useState(10)
    const allCities = useSelector((state: any) => state.weatherInCities.cityList);
    const sortingPreference = useSelector((state: any) => state.weatherInCities.sortingPreference);
    const favouriteCities = getFavourites(useSelector((state: any) => state.weatherInCities.cityList))

    const displayedCities = sort(allCities, sortingPreference).slice(0, currentlyDisplaying);

    const dispatch = useDispatch()

    return (
        <div className='main-page'>
            <ApplicationHeader/>
            <div className='content'>
                <CardList
                    before={<SeparatorBar name='Your favourites'/>}
                    after={favouriteCities.length === 0 && <CenteredContent content='You will find your favourite locations here' />}
                    items={favouriteCities}/>

                <CardList
                    before={<SeparatorBar name='Cities near your location'
                                          after={<SelectableTabs
                                              description='Sorting by'
                                              options={[SortingOptions.PROXIMITY, SortingOptions.WINDY, SortingOptions.LEAST_WINDY ]}
                                              active={sortingPreference}
                                              selectAction={(item: any) => {
                                                  dispatch(setSortingPreference(item))
                                                  setCurrentlyDisplaying(10)
                                              }}
                                          />}
                    />}
                    after={<CenteredContent content={
                        currentlyDisplaying >= allCities.length ?
                            'You reached the end of the page'
                            :
                            <Button onClick={() => {
                                setCurrentlyDisplaying(currentlyDisplaying + 10)
                            }}>Load more</Button>
                    }/>}
                    items={displayedCities}/>
            </div>
        </div>
    )
}
export default MainPage;
