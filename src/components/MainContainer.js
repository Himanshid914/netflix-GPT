import { useSelector } from "react-redux";
import VideoBackGround from "./VideoBackGround";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
    
    const movies = useSelector(store=>  store.movies?.nowPlayingMovies);  // get movies from store
    if (movies === null)return;

    const mainMovie = movies[0];  // movie tralier  which play  on main container
     console.log(mainMovie);

     const { original_title , overview, id } = mainMovie;
   return (
   <div>
         <VideoTitle title= {original_title} overview={overview} />
         <VideoBackGround movieId={id}/>
   </div>
   );
};
export default MainContainer;