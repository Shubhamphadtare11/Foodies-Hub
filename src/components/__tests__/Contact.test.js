import { render, screen } from "@testing-library/react";
import Contact from "../Contact"
import "@testing-library/jest-dom"; 

describe("Contact page test case",() =>{
    test("Should load contact us component", () => {

        render(<Contact/>)
     
        const heading = screen.getByRole("heading");
     
        //Assertion
     
        expect(heading).toBeInTheDocument();     
     
     });
     
     test("Should load button inside contact component", () => {
     
         render(<Contact/>)
      
         const button = screen.getByText("Submit");
      
         //Assertion
         expect(button).toBeInTheDocument();     
      
      });
     
      test("Should load input name inside contact component", () => {
     
         render(<Contact/>)
      
         const inputName = screen.getByPlaceholderText("name");
         
         //Assertion
         expect(inputName).toBeInTheDocument();     
      
      });
     
      test("Should load 2 input boxes inside contact component", () => {
     
         render(<Contact/>)
      
         //Qurying
         const inputBoxes = screen.getAllByRole("textbox");
      
     
         console.log(inputBoxes.length);
     
         //Assertion
         expect(inputBoxes.length).toBe(2);
      });
});

