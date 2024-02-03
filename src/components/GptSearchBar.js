import openai from "../utils/openai";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef} from "react";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    //search movie in tmdb
    const searchMoviesTMDB = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS
        
        );
        const json = await data.json();
        return json.results;
    };
    const handleGptSearch = async() => {
        console.log(searchText.current.value);
        //query
        const gptQuery = "Act as a movie recommendation system and suggest some movies for the query : " 
        + searchText.current.value 
        + "only give me the names of 5 movies , comma seperated like the example result given ahead .Example Result : Gadar, Sholay, Koi Mil Gaya, Don, Golmaal "
        //Make an API call to GPT API and get movie results
        // this piece of code got from openai => this is the msg we sent to find solution
        const gptResults = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: gptQuery }],
            stream: true,
        });
        console.log(gptResults.choices?.[0]?.messages?.content);
        // this gptMoviesList  is having array of movies/ list of movies (5 movies list , comma seperated)
        const gptMoviesList = gptResults.choices?.[0]?.messages?.content.split(",");

        // for each movie I will search TMDB ApI
        // here we get list of 5 promises 
        const promiseArray = gptMoviesList.map(movie => searchMoviesTMDB(movie));  // called 5 times => this will give me 5 promises not the result 
        // here we have function which will provide results => promises.all
        const tmdbResults  =  await Promise.all(promiseArray);
        console.log(tmdbResults);
        dispatch(addGptMovieResult({movieNames:gptMoviesList, movieResults: tmdbResults}));
    };

    return ( 
    <div className="pt-[10%]">
        <form className="w-1/2 bg-black grid grid-cols-9"
        onSubmit={(e) => e.preventDefault()}
        >
            <input 
            ref = {searchText}
            type="text" 
            className="p-4 m-4 col-span-6" 
            placeholder= {lang[langKey].gptSearchPlaceholder} />
            <button className=" col-span-3 py-2 px-4 m-4 bg-red-900 text-white rounded-lg"
                onClick = {handleGptSearch}
            >
                {/* Search */}
                {lang[langKey].search}
            </button>

        </form>
    </div>
    );
};
export default GptSearchBar;