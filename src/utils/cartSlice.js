import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],      
    },
    reducers: {
        addItem: (state, action) => {
            // mutating the state here  
            // Redux Toolkit uses immer BTS
            state.items.push(action.payload);
        },
        removeItem: (state, action) =>{
            state.items.pop(); 
        },
        clearCart: (state, action) => {

            //RTK(Redux Toolkit) - either mutate the existing state or return a new state
            state.items.length = 0;
            //we can use below instead of above
            // return { items: [] };
        },
    },
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;  

export default cartSlice.reducer;