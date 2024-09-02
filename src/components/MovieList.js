// src/components/MovieList.js
import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMovies } from '../services/fetchMovies';
import MovieCard from './MovieCard';
import GenreFilter from './GenreFilter';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012); // Default year is 2012
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Fetch movies for the default year (2012) on initial load
  useEffect(() => {
    fetchMovies(currentYear, selectedGenres).then((newMovies) => setMovies(newMovies));
  }, [currentYear, selectedGenres]);

  // Function to fetch more movies based on scrolling direction
  const fetchMoreMovies = useCallback(
    (direction) => {
      const newYear = direction === 'up' ? currentYear - 1 : currentYear + 1;

      // Fetch movies for the new year
      fetchMovies(newYear, selectedGenres).then((newMovies) => {
        if (newMovies.length > 0) {
          // Update movie list and current year
          setMovies((prevMovies) => [...prevMovies, ...newMovies]);
          setCurrentYear(newYear);
        } else {
          setHasMore(false); // Stop fetching when no more movies are available
        }
      });
    },
    [currentYear, selectedGenres] // Memoize the function with currentYear and selectedGenres as dependencies
  );

  return (
    <>
      <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <InfiniteScroll
        dataLength={movies.length}
        next={() => fetchMoreMovies('down')}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.9}
        style={{ overflow: 'hidden' }} // Ensure smooth scroll
      >
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={movie.poster_path}
              genres={movie.genre_ids}
              cast={['Actor 1', 'Actor 2']} // Fetch or mock this data
              director="Director Name" // Fetch or mock this data
              description={movie.overview}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default MovieList;
