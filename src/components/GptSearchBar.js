import { useSelector } from "react-redux";
import lang from "../utils/languageConstant";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);

    return ( 
    <div className="pt-[10%]">
        <form className="w-1/2 bg-black grid grid-cols-9" >
            <input 
            type="text" 
            className="p-4 m-4 col-span-6" 
            placeholder= {lang[langKey].gptSearchPlaceholder} />
            <button className=" col-span-3 py-2 px-4 m-4 bg-red-900 text-white rounded-lg">
                {/* Search */}
                {lang[langKey].search}
            </button>

        </form>
    </div>
    );
};
export default GptSearchBar;