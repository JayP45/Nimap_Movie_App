import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {
    event.preventDefault();
    setMovieName(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${movieName}&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <>
      <div className="navbar">
        <h1>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span>MovieDb</span>
          </Link>
        </h1>
        <ul className="nav-list">
          <li>
            <Link
              to="/movies/popular"
              style={{ textDecoration: "none", color: "lightgrey" }}
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to="/movies/top_rated"
              style={{ textDecoration: "none", color: "lightgrey" }}
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              to="/movies/upcoming"
              style={{ textDecoration: "none", color: "lightgrey" }}
            >
              Upcoming
            </Link>
          </li>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="Movie Name"
            value={movieName}
            className="search-input"
            onChange={handleInputChange}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {
        <div className="movie-grid">
          {movies.slice(0, 1).map((movie) => (
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>
                  {movie ? movie.title.slice(0, 15) + "..." : movie.title}
                </h3>
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      }
    </>
  );
};

export default Navbar;
