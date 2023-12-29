import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link,NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import "../../style.css";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import {
  BiSolidCartAlt,
  BiSolidOffer,
  BiSolidLogInCircle,
  BiSolidLogOutCircle,
} from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import "./css/Header.css"

const Header = () => {

  const [btnNameReact, setBtnNameReact] = useState("Login");
  const[menuOpen,setMenuOpen]= useState(false);

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  // Subscribing to store using Selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <nav className="header flex justify-between shadow-lg ">
      <div className="logo-container">
        <img className="logo w-[5rem] ml-2" src={LOGO_URL} />
      </div>

    <div className="menu" onClick={()=>{
      setMenuOpen(!menuOpen)
    }}>
      <span></span>
      <span></span>
      <span></span>
    </div>
      <ul className={menuOpen?"open":""}>
        <li className="px-4">Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
        <li className="px-4">
          <NavLink className="navHeader" to="/">
            <AiFillHome />
            Home
          </NavLink>
        </li>
        {/* <li className="px-4"><Link to="/about">About Us</Link></li> */}
        {/* <li className="px-4"><Link to="/contact">Contact Us</Link></li> */}
        <li className="px-4">
          <NavLink to="/offer" className="navHeader">
            <BiSolidOffer />
            Offer<sup style={{ color: "orangered" }}>New</sup>
          </NavLink>
        </li>
        <li className="px-4">
          <NavLink to="/cart" className="navHeader">
            <BiSolidCartAlt />
            Cart - ({cartItems.length})
          </NavLink>
        </li>
        <li className="px-4">
          <button
            className="login navHeader"
            onClick={() => {
              btnNameReact == "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {" "}
            {btnNameReact === "Login" ? (
              <BiSolidLogInCircle
                style={{ fontSize: "20px", color: "green" }}
              />
            ) : (
              <BiSolidLogOutCircle style={{ fontSize: "20px", color: "red" }} />
            )}
            {btnNameReact}
          </button>
        </li>
        <li className="">
          <NavLink className="px-4 navHeader" to="/contact">
            <FaUserCircle />
            {loggedInUser}
          </NavLink>
        </li>
      </ul>

      {/* hamburger menu */}
      {/* <div className="hamburger-menu block sm:hidden">
        <a href="#">
          <GiHamburgerMenu />
        </a>
      </div> */}
    </nav>
  );
};

export default Header;
