import RestaurantCard, {withPromtedLabel} from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {
    //local state variable - super powerful variable
    const [listOfRestaurants, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&page_type=DESKTOP_WEB_LISTING");
    
        const json = await data.json();
    
        console.log(json);
        setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    };


    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) 
        return <h1>looks like you are offline, please check internet connection</h1>

    //Conditional Rendering
    return listOfRestaurants.length ===0 ? <Shimmer /> :(
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" className="search-box border border-solid border-black" value={searchText} 
                    onChange={ (e) =>
                        {setSearchText(e.target.value);}
                    } />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                     onClick={
                        () => {
                            const filteredRestaurant = listOfRestaurants.filter(
                                (res) => res.data.name.toLowerCase().includes(searchText.toLowerCase()));
                                setFilteredRestaurant(filteredRestaurant);
                        }
                    }>Search</button>
                </div>
            <div className="search m-4 p-4 flex items-center">
            <button className="filter-btn px-4 py-2 bg-gray-100 rounded-lg" onClick={
                    () =>{
                        const filteredList= listOfRestaurants.filter((res) => res.data.avgRating>4);
                        setListOfRestaurant(filteredList);
                    }
                    }>
                    Top Rated Restaurants</button>
            </div>
            </div>
            <div className="res-container flex flex-wrap">
          {
            filteredRestaurant.map((restaurant) => (
            <Link key={restaurant.data.id} to={"/restaurants/" + restaurant.data.id}>
                 {/* if the restaurant is promoted then add a promoted label to it */}
                {restaurant.data.promoted ? (<RestaurantCardPromoted resData={restaurant}/>) : (<RestaurantCard resData={restaurant}/>)}
                
                </Link> 
            ))
          }
            </div>
        </div>
    )
}

export default Body; 