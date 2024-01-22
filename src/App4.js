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
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// import Cart from "./components/Cart";
import Footer from "./components/Footer";
 

//lazy loading/code splitting
const Cart = lazy(() => import("./components/Cart")); 

const AppLayout = () => {

  const [userName, setUserName] = useState();

  //suppose we got authentication data from api
  useEffect(() => {
    //make an api call and send username and password
    const data = {
      name: "Shubham",
    };
    setUserName(data.name);

  },[]);


  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
      {/* Shubham Phadtare */}
    <div className="app">
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
    </UserContext.Provider>
    </Provider>
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
        path: "/offer",
        element: <Suspense fallback={<h1>Loading...</h1>}><Error/></Suspense>,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Suspense fallback={<h1>Loading...</h1>}><Cart/></Suspense>,
      },
    ],
    errorElement: <Error />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);