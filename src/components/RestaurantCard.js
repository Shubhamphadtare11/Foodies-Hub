import { CDN_URL } from "../utils/constants";

const styleCard = {
    //backgroundColor: "white"
};

const RestaurantCard = (props) => {
    const {resData} = props;

    const{cloudinaryImageId, name, cuisines, avgRating, costForTwo, deliveryTime} = resData?.info;

    return (
        <div className="res-card m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200" style={styleCard}>
            <img className="res-logo rounded-lg"
             src={ CDN_URL+ cloudinaryImageId}></img>
            <h3 className="font-bold py-4" style={{fontSize: "20px"}}>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating}</h4>
            <h4>Rs.{costForTwo}</h4>
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