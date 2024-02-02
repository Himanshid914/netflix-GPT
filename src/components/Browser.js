
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTrendingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";
const Browser = () =>{
  
   const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();

    return (
        <div>
          <Header/>
          {
            showGptSearch ? ( <GPTSearch/> ) : 
            ( <>
            <MainContainer/>
            <SecondaryContainer/>
            </> )
          }
          {/* <GPTSearch/>
          <MainContainer/>
          <SecondaryContainer/> */}
          {/* 
              Main Container
                 - Video Background
                 - Video Title
              Secondary container 
                 - Movie list * n
                 - cards * n

               */}
        </div>
    ); 
};
export default Browser;