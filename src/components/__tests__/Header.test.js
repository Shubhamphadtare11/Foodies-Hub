import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../Header"
import appStore from "../../utils/appStore"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("should render header component with login button", () => {
      render(
        <BrowserRouter>
      <Provider store={appStore}>
      <Header/>
      </Provider>
      </BrowserRouter>
      );

      const loginButton = screen.getByRole("button");

      //Assertion
        expect(loginButton).toBeInTheDocument();

});

it("should render header component with cart items 0", () => {
    render(
      <BrowserRouter>
    <Provider store={appStore}>
    <Header/>
    </Provider>
    </BrowserRouter>
    );

    const cartItems = screen.getByText("Cart - (0 items)");

   //we can use below also it is called regex 
   // const cartItems = screen.getByText(/Cart/);

    //Assertion
      expect(cartItems).toBeInTheDocument();

});

it("should change login button to logout onclick", () => {
    render(
      <BrowserRouter>
    <Provider store={appStore}>
    <Header/>
    </Provider>
    </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login"});

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", {name: "Logout"});
        
    //Assertion
      expect(logoutButton).toBeInTheDocument();

});