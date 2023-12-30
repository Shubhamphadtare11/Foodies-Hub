import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";

const Body = () => {
  //local state variable - super powerful variable
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  // const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    // console.log(
    //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    setListOfRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>looks like you are offline, please check internet connection</h1>
    );

  const handleTopratingRestaurant = () => {
    const filterTopRatedRestaurant = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4
    );
    setFilteredRestaurant(filterTopRatedRestaurant);
  };

  const handleBelowPrice = () => {
    setListOfRestaurant(listOfRestaurants);
    const FindBelowPrice = listOfRestaurants.filter(
      (res) => res?.info?.costForTwo < "₹300 for two"
    );
    // console.log(findPriceRange);
    setFilteredRestaurant(FindBelowPrice);
  };

  const handleAbovePrice = () => {
    setListOfRestaurant(listOfRestaurants);
    const findGreaterprice = listOfRestaurants.filter(
      (res) => res?.info?.costForTwo >= "₹300 for two"
    );
    // console.log(findGreaterprice);
    setFilteredRestaurant(findGreaterprice);
  };

  //Conditional Rendering
  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body container mx-auto ">
      <div className="">
        <div className="headingTitle">
          <h4 className=" sm:text-2xl" style={{ fontWeight: "bolder" }}>
            Restaurants With Online Food Delivery in Pune
          </h4>
        </div>
        <div className="filter grid grid-cols-12">
          <div className="searchFiltered col-span-12 md:col-span-8 flex items-center">
            <button
              className="filter-btn topRated px-4 py-2 bg-gray-100 "
              onClick={handleTopratingRestaurant}
            >
              Rating 4.0+
              <span className="inline-block ">
                <AiOutlineStar style={{ color: "orange" }} />
              </span>
            </button>
            <button
              className="filter-btn topRated px-4 py-2 bg-gray-100 "
              onClick={handleBelowPrice}
            >
              Less than Rs.300
            </button>
            <button
              className="filter-btn topRated px-4 py-2 bg-gray-100 "
              onClick={handleAbovePrice}
            >
              More than Rs.300
            </button>
          </div>
          <div className="search col-span-12 md:col-span-4">
            <div className="flex items-center">
              <input
                type="text"
                data-testid="searchInput"
                placeholder="Search for restaurant and food"
                className="search-box px-3 rounded-lg w-[23rem] border border-solid border-gray-400"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                className="px-4 py-2 searchBtn m-4 rounded-lg"
                onClick={() => {
                  const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                <AiOutlineSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="res-container  flex flex-wrap">
          {filteredRestaurant &&
            filteredRestaurant.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
              >
                {restaurant?.info.promoted ? (
                  <RestaurantCardPromoted resData={restaurant?.info} />
                ) : (
                  <RestaurantCard resData={restaurant?.info} />
                )}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
