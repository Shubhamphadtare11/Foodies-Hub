import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import  "../../style.css"
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import {
    BiSolidCartAlt,
    BiSolidOffer,
    BiSolidLogInCircle,
    BiSolidLogOutCircle,
  } from "react-icons/bi";


const Header = () => {    

    const[btnNameReact, setBtnNameReact] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext);


    // Subscribing to store using Selector
    const cartItems = useSelector((store) => store.cart.items);
    

    return(
        <div className="header flex justify-between shadow-lg ">
            <div className="logo-container">
                <img className="logo w-36" src={LOGO_URL} />
            </div>
            <div className="nav-items flex items-center">
                <ul className="flex">
                    <li className="px-4">
                        Online Status: {onlineStatus ? "🟢" : "🔴"}
                        </li>
                    <li className="px-4"><Link className="navHeader" to="/"><AiFillHome/>Home</Link></li>
                    {/* <li className="px-4"><Link to="/about">About Us</Link></li> */}
                    {/* <li className="px-4"><Link to="/contact">Contact Us</Link></li> */}
                    <li className="px-4"><Link to="/offer" className="navHeader"><BiSolidOffer />Offer<sup style={{ color: "orangered" }}>New</sup></Link></li> 
                    <li className="px-4 font-bold"><Link to="/cart" className="navHeader"><BiSolidCartAlt />Cart - ({cartItems.length})</Link></li>
                    <li className="px-4"><button className="login navHeader" onClick={() =>{
                    btnNameReact == "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
               }}>  {btnNameReact === "Login" ? (
                <BiSolidLogInCircle
                  style={{ fontSize: "20px", color: "green" }}
                />
              ) : (
                <BiSolidLogOutCircle
                  style={{ fontSize: "20px", color: "red" }}
                />
              )}

                {btnNameReact}</button></li>
                    <li className=""><Link className="px-4 navHeader" to="/contact"><FaUserCircle />{loggedInUser}</Link></li>
                </ul>
            </div>
        </div>
    )
}
 
export default Header; 