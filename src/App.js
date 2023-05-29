import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesGrid from "./Components/MoviesGrid";
import Navbar from "./Components/Navbar";
import MovieDetail from "./Components/MovieDetail";
import TopRated from "./Components/TopRated";
import Popular from "./Components/Popular";
import Error from "./Components/Error";
import Upcoming from "./Components/Upcoming";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<MoviesGrid />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="movies/top_rated" element={<TopRated />} />
          <Route path="movies/popular" element={<Popular />} />
          <Route path="movies/upcoming" element={<Upcoming />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
