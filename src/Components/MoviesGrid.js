import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MoviesGrid = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  return (
    <>
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

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>

        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
};

export default MoviesGrid;
