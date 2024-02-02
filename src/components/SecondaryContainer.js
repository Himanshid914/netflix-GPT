import { useSelector } from "react-redux";

import MoviesList from "./MoviesList";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    return (
        movies.nowPlayingMovies &&(
    <div className="bg-black">
        <div className="-mt-50 pl-12 relative z-20">
           <MoviesList title={"Popular Movies"} movies= {movies.popularMovies} />
           <MoviesList title={"Now Playing Movies"} movies= {movies.nowPlayingMovies} />
           <MoviesList title={"Trending Movies"} movies= {movies.topRatedMovies} />
           <MoviesList title={"Upcoming Movies"} movies= {movies.upcomingMovies} />
           
        </div>

        {/* 
            - MovieCard * n
            - MovieList - Popular
            - MovieList - Trending
            - MovieList - Now Playing
            - MovieList - Horror
            - MovieList - Documentary

        */}
    </div>
    ));
};
export default SecondaryContainer;