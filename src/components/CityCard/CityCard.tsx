import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addFavourite, City, removeFavourite } from "../../redux/weatherInCities";
import ConfirmationModal from "../Modal/ConfirmationModal";

import { ReactComponent as HollowStar } from "../../assets/star-hollow.svg";
import { ReactComponent as FilledStar } from "../../assets/star-filled.svg";

import './CityCard.scss'
import {getWindDirection} from "../../utils/cardinal";

const CityCard = (props: City) => {
    const dispatch = useDispatch()
    const [showPopup, setShowPopup] = useState(false)
    return (
        <div className='city-card-wrapper' key={props.id}>
            <div className='top-bar'>
                <div className='city-name'>{props.name}</div>
                {props.favourite && props.favourite.isFavourite ?
                    <FilledStar className='favourite-button' onClick={() => setShowPopup(true)} />
                    :
                    <HollowStar className='favourite-button' onClick={() => dispatch(addFavourite(props.id))} />
                }
            </div>
            <div className='weather-info'>
                <div className='main-info'>
                    <div className='temperature'>
                        <div className='value'>{(props.main.temp).toFixed(0)}</div>
                        <div className='measuring-unit'>&#8451;</div>
                    </div>
                </div>
                <div className='forecast-info'>
                    {props.weather.description}
                </div>
                <div className='atmospheric-info'>
                    <BottomInfo topSide={props.wind.speed.toFixed(0) + ' m/s'} bottomSide='Wind Speed'/>
                    <BottomInfo topSide={getWindDirection(props.wind.deg)} bottomSide='Wind Direction'/>
                    <BottomInfo topSide={props.clouds.all.toFixed(0) + '%'} bottomSide='Cloudiness'/>
                </div>
            </div>
            { showPopup && <ConfirmationModal
                message='Remove from favourites?'
                cancel={() => { setShowPopup(false)}}
                confirm={() => {
                    dispatch(removeFavourite(props.id))
                    setShowPopup(false)
                }}
            />}
        </div>
    )
}

type BottomInfoProps = {
    topSide: string,
    bottomSide: string
}

const BottomInfo = ({topSide, bottomSide} : BottomInfoProps) => {
    return (
        <div className='city-card-bottom-info'>
            <div className='top-side'>{topSide}</div>
            <div className='bottom-side'>{bottomSide}</div>
        </div>
    )
}

export default CityCard;
