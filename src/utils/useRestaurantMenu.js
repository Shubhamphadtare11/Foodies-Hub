import React,  { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import RestaurantMenu from "../utils/APIData/RestaurantMenu.json";

const useRestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        setTimeout(()=>{
            fetchData()
        },1000)
        
    }, []);

    const fetchData = () => {
        setResInfo(RestaurantMenu[0]?.data);
    };
    console.log(RestaurantMenu[0]?.data)
    console.log(resInfo)
    return resInfo;
}

export default useRestaurantMenu;