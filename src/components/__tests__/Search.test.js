import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../../components/mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
 
describe("Body component test",() =>{

    beforeAll(() =>{
        console.log("Before All");
        })
        
        beforeEach(() =>{
        console.log("Before Each");
        })
        
        afterAll(() =>{
        console.log("After All");
        })
        
        afterEach(() =>{
        console.log("Before Each");
        })

global.fetch = jest.fn(() =>{
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        },
    });         
}); 

it("Should render Body component with search", async () => {

 await act(async () =>
    render(
        <BrowserRouter>
        <Body/>
        </BrowserRouter>
    )
 ); 

 const searchBtn = screen.getByRole("button", {name: "Search"});

 expect(searchBtn).toBeInTheDocument();

});  

it("Should search Res List for eat text input", async () => {

    await act(async () =>
       render(
           <BrowserRouter>
           <Body/>
           </BrowserRouter>
       )
    ); 

    const cardsBeforeSearch = screen.getAllByTestId("resCard");

    expect(cardsBeforeSearch.length).toBe(9);

    const searchInput = screen.getByTestId("searchInput");

    const searchBtn = screen.getByRole("button", {name: "Search"});
   
    fireEvent.change(searchInput, {target: {value: "eat"}});

    fireEvent.click(searchBtn);

    //screen should load 2 RestaurantCards 

    const cardsAfterSearch = screen.getAllByTestId("resCard");
   
    expect(cardsAfterSearch.length).toBe(2);
   });  

it("Should filter top rated restaurants", async () => {

    await act(async () =>
       render(
           <BrowserRouter>
           <Body/>
           </BrowserRouter>
       )
    ); 

    const cardsBeforeFilter = screen.getAllByTestId("resCard");

    expect(cardsBeforeFilter.length).toBe(9);

    const topRatedBtn = screen.getByRole("button", {name: "Top Rated Restaurants"});
   
    fireEvent.click(topRatedBtn);

    //screen should load 5 RestaurantCards 

    const cardsAfterFilter = screen.getAllByTestId("resCard");
   
    expect(cardsAfterFilter.length).toBe(5);
   });  

});