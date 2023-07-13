import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import resList from "../utils/mockData";

// Not using keys(not acceptable) <<< index as key <<< unique id
const Body = () => {

    //local state variable - super powerful variable

    const [listOfRestaurants, setListOfRestaurant] = useState(resList);

    return(
        <div className="body">
            <div className="filer">
                <button className="filter-btn" onClick={
                    () =>{
                        const filteredList= listOfRestaurants.filter((res) => res.data.avgRating>4);
                        setListOfRestaurant(filteredList);
                    }
                    }>
                    Top Rated Restaurants</button>
            </div>
            <div className="res-container">
          {
            listOfRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.data.id} resData={restaurant}/>
            ))
          }
            </div>
        </div>
    )
}

export default Body; 