import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Header = () => {    

    const [btnNameReact, setBtnNameReact] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext);

    //if no dependency array => useEffect is called on every render
    //if dependency array is empty = [] => useEffect is called on initial render(just once)
    //if dependency array is [btnNameReact] => called every time btnNameReact is updated

    //useEffect(() => {}, [btnNameReact]); 

    return(
        <div className="header flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
            <div className="logo-container">
                <img className="logo w-56" src={LOGO_URL} />
            </div>
            <div className="nav-items flex items-center">
                <ul className="flex">
                    <li className="px-4">
                        Online Status: {onlineStatus ? "🟢" : "🔴"}
                        </li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link></li> 
                    <li className="px-4"><Link to="/cart">Cart</Link></li>
                    <button className="login" onClick={() =>{
                      btnNameReact==="Login" ? setBtnNameReact ("Logout") : setBtnNameReact ("Login");
                    }}>{btnNameReact}</button>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    )
}

export default Header; 