import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,    //default value
    },
    reducers: { 
        // this toggle is used to show and hide gptSearchView
        toggleGptSearchView : ( state ) => {
           state.showGptSearch = !state.showGptSearch;
        },

    },
});

export const  { toggleGptSearchView } = gptSlice.actions;
export default gptSlice;