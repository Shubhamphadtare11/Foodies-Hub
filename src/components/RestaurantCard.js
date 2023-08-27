import { CDN_URL } from "../utils/constants";
import  "../../style.css"
import { AiOutlineStar } from "react-icons/ai";

const styleCard = {
    //backgroundColor: "white"
};

const RestaurantCard = (props) => {
    const {resData} = props;

    const{cloudinaryImageId, name, cuisines, avgRating, costForTwo, areaName} = resData;


    const avgrating = {
        backgroundColor: avgRating >= 4 ? "green" : "orange",
      };

    return (
        <div data-testid="resCard" className="res-card m-4 p-4 w-[250px] rounded-lg shadow-xl " style={styleCard}>
            <img className="res-logo rounded-lg"
             src={ CDN_URL+ cloudinaryImageId}></img>
             <div className="flex justify-between items-center">
             <h3 className="font-bold py-4 text single-line" style={{fontSize: "20px"}}>{name}</h3>
                <h4 className="avgrating" style={avgrating}><AiOutlineStar/>{avgRating}</h4>
             </div>
            <h4 className="text single-line">{cuisines.join(", ")}</h4>
            <h4>Rs.{costForTwo}</h4>
            <small className="text-gray-500">{areaName}</small>
        </div>
    );
};

// Higher Order Component

//input - RestaurantCard => RestaurantCardPromoted

export const withPromtedLabel = (RestaurantCard) => {
        return(props) => {
            return (
                <div>
                    <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
                    <RestaurantCard {...props}/>
                </div>
            );
        };
};


export default RestaurantCard;  