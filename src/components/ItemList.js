import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import { FaDotCircle } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="p-2 m-2 border-gray-400 border-b-2 text-left flex flex-col md:flex-row justify-between"
        >
          <div className=" md:w-9/12">
            <h6>
              {item?.card?.info?.itemAttribute.vegClassifier === "VEG" ? (
                <FaDotCircle className="veg-icon" />
              ) : (
                <FaDotCircle className="nonveg-icon" />
              )}
              <span>
                {item?.card?.info?.ribbon.text ? (
                  <span
                    className="flex items-center"
                    style={{ color: "orange" }}
                  >
                    <AiFillStar /> Bestseller
                  </span>
                ) : (
                  ""
                )}
              </span>
            </h6>
            <div className="py-2">
              <span
                style={{
                  fontWeight: "bolder",
                  fontSize: "18px",
                }}
              >
                {item.card.info.name}
              </span>
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                <span>
                  ₹
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}{" "}
                  |
                </span>
                <span> 60% OFF | USE STEALDEAL</span>
                <span></span>
              </p>
            </div>
            <p className="text-xs" style={{ fontSize: "13px", color: "gray" }}>
              {item.card.info.description}
            </p>
          </div>
          <div className=" md:w-3/12 p-4">
            <div className="menu-img text-center">
              <img src={CDN_URL + item.card.info.imageId} />
              <button
                className=" p-1 mt-1 rounded-lg addBtn shadow-lg"
                onClick={() => handleAddItem(item)}
              >
                {" "}
                Add +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
