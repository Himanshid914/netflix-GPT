
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
    const dispatch =useDispatch()
    // const  [trailerId, setTrailerId] = useState(null);
    // we can create new hook to make code clean => useMovieTrailer
     //fetch trailer video and updating store with trailer video data
     const getMovieVideos= async () => {
         const data = await fetch("https://api.themoviedb.org/3/movie/"
         +movieId +"/videos?language=en-US",
          API_OPTIONS);
         const json = await data.json();
         console.log(json);
 
         const  filterTrailer = json.results.filter(video => video.type === "Trailer");
         const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];
         console.log(trailer);
         //setTrailerId(trailer.key);
         dispatch(addTrailerVideo(trailer));
     };
     useEffect(() => {
        getMovieVideos()
     },[]);
};
export default useMovieTrailer;