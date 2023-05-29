import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CastMember from "./CastMember";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState();
  const { id } = useParams();

  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const data = await response.json();
      setMovieDetail(data);
      console.log("thissss------", data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="movie-details">
        <div className="right-side">
          <img
            className="movie__poster"
            src={`https://image.tmdb.org/t/p/original${
              movieDetail ? movieDetail.poster_path : ""
            }`}
          />
          <span className="movie__name">
            {movieDetail ? movieDetail.original_title : ""}
          </span>
          <div className="movie__rating">
            Rating: {movieDetail ? movieDetail.vote_average.toFixed(1) : ""}
          </div>
          <div className="movie__release_date">
            Release Date: {movieDetail ? movieDetail.release_date : ""}
          </div>
          <h2 className="overview-tag">Overview</h2>
          <div className="movie__overview">
            {movieDetail ? movieDetail.overview : ""}
          </div>
        </div>
        <div className="left-side">
          <img
            className="movie__backdrop"
            src={`https://image.tmdb.org/t/p/original${
              movieDetail ? movieDetail.backdrop_path : ""
            }`}
          />
        </div>
      </div>
      <div>
        <CastMember />
      </div>
    </>
  );
};

export default MovieDetail;
