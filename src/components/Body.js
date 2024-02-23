import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import ShimmerCursor from "./ShimmerCursor";

const Body = () => {
  //local state variable - super powerful variable
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);

  // const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D23.022505%26lng%3D72.5713621%26page_type%3DDESKTOP_WEB_LISTING"
      );
      //https://corsproxy.io/?
      const json = await data.json();

      //console.log(json);
      const jsonRestaurants=json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants;
      if(jsonRestaurants){
          setListOfRestaurant(
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          );
          setFilteredRestaurant(
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          );
        }
        else{
          setListOfRestaurant(
            json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          );
          setFilteredRestaurant(
            json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          );
        }
      
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>looks like you are offline, please check internet connection</h1>
    );

    const allRestaurants = ()=>{
      const allRestaurantsList = listOfRestaurants;

      setFilteredRestaurant(allRestaurantsList);
    }

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

  if (!listOfRestaurants) {
    return (
      <div>
        <ShimmerCursor />
        <Shimmer />
      </div>
    );
  }

  //Conditional Rendering
  return listOfRestaurants?.length === 0 ? (
    <div>
      <ShimmerCursor />
      <Shimmer />
    </div>
  ) : (
    <>
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
                onClick={allRestaurants}
              >
                All Restaurants
              </button>
             
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
                  {/* {restaurant?.info?.promoted ? (
                  <RestaurantCardPromoted resData={restaurant?.info} />
                ) : ( */}
                  <RestaurantCard resData={restaurant?.info} />
                  {/* )} */}
                </Link>
              ))}
          </div>
        </div>
        {Loading && <Shimmer />}
      </div>
      
    </>
  );
};

export default Body;
