import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { CiPercent } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { BiSolidTimeFive } from "react-icons/bi";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const navigate = useNavigate;

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  const [fevoroute, setFevoroute] = useState("");

  if (resInfo === null) return <Shimmer />;

  // console.log(resInfo)
  const handleFeveroute = () => {
    setFevoroute("red");
  };
  console.log(resInfo)
  const {
    city,
    totalRatingsString,
    name,
    avgRating,
    cuisines,
    costForTwoMessage,
    areaName,
  } = resInfo?.cards[0]?.card?.card?.info ? resInfo?.cards[0]?.card?.card?.info : resInfo?.cards[2]?.card?.card?.info;

  const { slaString } = resInfo?.cards[0]?.card?.card?.info?.sla ? resInfo?.cards[0]?.card?.card?.info?.sla : resInfo?.cards[2]?.card?.card?.info?.sla;

  //const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  
  const categories =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
    ?
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
    :
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
    ;
   
//card 2 for web and card 5 for mobile

  return (
    <div className="restaurant-menu">
      <div className="container mx-auto">
        <div className="pt-5 pb-5">
          <div className="grid grid-cols-12">
            <div className="col-span-1 md:col-span-2"> </div>
            <div className="col-span-10 md:col-span-8">
              <div className="details">
                <div className="home-path">
                  <h6>
                    <Link to="/">
                    <IoChevronBackCircleOutline
                      style={{ color: "orangered", fontSize: "20px" }}
                    /></Link>{" "}
                    Home / {city} / {areaName}
                  </h6>
                </div>
                <div className="search-like">
                  <p style={{ fontSize: "22px", textAlign: "center" }}>
                    <AiOutlineHeart
                      onClick={handleFeveroute}
                      style={{ color: { fevoroute } }}
                    />{" "}
                    &nbsp;&nbsp;|&nbsp;&nbsp; <FiSearch />
                  </p>
                </div>
              </div>
              <div className="restaurant-info">
                <div className="restaurantDetails">
                  <h2 style={{ fontWeight: "bolder" }}>{name}</h2>
                  <h6 style={{ fontSize: "15px", color: "gray" }}>
                    {cuisines.join(", ")}
                  </h6>
                  <h6 style={{ fontSize: "13px", color: "gray" }}>
                    {areaName}
                  </h6>
                </div>
                <div className="restaurant-rating">
                  <h6 className="starrating">
                    <AiFillStar /> {avgRating}
                  </h6>
                  <hr></hr>
                  <h6 className="starratings">{totalRatingsString}</h6>
                </div>
              </div>
              <hr></hr>
              <div className="time-and-price">
                <p style={{ fontWeight: "bolder" }}>
                  <BiSolidTimeFive style={{ fontSize: "20px" }} /> {slaString} |
                  <HiMiniCurrencyRupee style={{ fontSize: "20px" }} />
                  {costForTwoMessage}
                </p>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-12 offer-upto md:col-span-3">
                  <h6 className="upto-off flex items-center justify-center">
                    <CiPercent /> Flat 10% off upto 120
                  </h6>
                  <h6 className="use-off">USE PARTY I ABOVE Rs.130</h6>
                </div>
                <div className="col-span-12 offer-upto md:col-span-3">
                  <h6 className="upto-off">Flat 10% off upto 120</h6>
                  <h6 className="use-off">USE PARTY I ABOVE Rs.130</h6>
                </div>
                <div className="col-span-12 offer-upto md:col-span-3">
                  <h6 className="upto-off">Flat 10% off upto 120</h6>
                  <h6 className="use-off">USE PARTY I ABOVE Rs.130</h6>
                </div>
                <div className="col-span-12 offer-upto md:col-span-3">
                  <h6 className="upto-off">Flat 10% off upto 120</h6>
                  <h6 className="use-off">USE PARTY I ABOVE Rs.130</h6>
                </div>
              </div>
            
              <hr></hr>
              {/* category-accordian for restaurant menu */}
              {/* categories accordian */}
              {categories.map((category, index) => (
                //Controlled Component
                <RestaurantCategory
                  key={category?.card?.card.title}
                  data={category?.card?.card}
                  showItems={index === showIndex ? true : false}
                  setShowIndex={() => setShowIndex(index)}
                />
              ))}
            </div>
            <div className="col-span-1 md:col-span-2"> </div>
          </div>
          <div className="pb-5"></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
