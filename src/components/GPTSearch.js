import { BG_URL } from "../utils/constants";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
    return ( // two component needed => GptSearchBar  &  GptMoviesSuggestions
    <div>
        <div className=" absolute -z-10 ">
                <img src= {BG_URL}
                 alt="logo"
                />
        </div>

        <GptSearchBar/>
        <GptMoviesSuggestions/>
    </div>
    );
};
export default GPTSearch;