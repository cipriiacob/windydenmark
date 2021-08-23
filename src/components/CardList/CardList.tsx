import CityCard from "../CityCard/CityCard";

import './CardList.scss'
import {City} from "../../redux/weatherInCities";

const CardList = (props: {
    before?: any,
    after?: any,
    items: City[]
}) => {
    return (
        <div className='card-list-wrapper'>
            {props.before}
            <div className='elements-wrapper'>
                {props.items.map(item => <CityCard {...item} key={item.id}/>)}
            </div>
            {props.after}
        </div>
    )
}


export default CardList;
