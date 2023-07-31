import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import useOnlineStatus from "./utils/useOnlineStatus";


const Grocery = lazy(() => import("./components/Grocery")); 

const AppLayout = () => {

  const [userName, setUserName] = useState();

  //suppose we got authentication data from api
  useEffect(() => {
    //make an api call and send username and password
    const data = {
      name: "Shubham Phadtare",
    };
    setUserName(data.name);

  },[]);


  return (
    <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
      {/* Shubham Phadtare */}
    <div className="app">
        <Header/>
        <Outlet/>
    </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);