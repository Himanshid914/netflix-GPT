import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,    //default value
        movieResults : null,
        movieNames : null
    },
    reducers: { 
        // this toggle is used to show and hide gptSearchView
        toggleGptSearchView : ( state ) => {
           state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult : (state, action) => {
            const {movieNames, movieResults} =action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }

    },
});

export const  { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;
export default gptSlice;