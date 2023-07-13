import { CDN_URL } from "../utils/constants";

const styleCard = {
    backgroundColor: "#f0f0f0"
};

const RestaurantCard = (props) => {
    const {resData} = props;

    const{cloudinaryImageId, name, cuisines, avgRating, costForTwo, deliveryTime} = resData?.data;

    return (
        <div className="res-card" style={styleCard}>
            <img className="res-logo"
             src={ CDN_URL+ cloudinaryImageId}></img>
            <h3 style={{fontSize: "20px"}}>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating}</h4>
            <h4>Rs.{costForTwo/100}FOR TWO</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    )
}
export default RestaurantCard; 