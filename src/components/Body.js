import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";

const Body = () => {
    //local state variable - super powerful variable
    const [listOfRestaurants, setListOfRestaurant] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&page_type=DESKTOP_WEB_LISTING");
    
        const json = await data.json();
    
        console.log(json);
        setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    };

    if(listOfRestaurants.length ===0){
        return <Shimmer />;
    }

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