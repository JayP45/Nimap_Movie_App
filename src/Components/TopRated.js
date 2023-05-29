import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TopRated() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="top-rated"> Top Rated Movies</div>
      <div className="movie-grid">
        {movies.slice(0, 5).map((movie) => (
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie ? movie.title.slice(0, 15) + "..." : movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default TopRated;
