import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);
  const containerRef = useRef(null); // Ref for the container

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: { api_key: 'b23a898ea9de73476c7518cd168c3f12' }
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error.response?.data || error.message);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreChange = (id) => {
    const isAlreadySelected = selectedGenres.includes(id);
    setSelectedGenres(isAlreadySelected 
      ? selectedGenres.filter((genreId) => genreId !== id)
      : [...selectedGenres, id]
    );

    if (containerRef.current) {
      const selectedButton = containerRef.current.querySelector(`button.genre-button[data-id='${id}']`);
      selectedButton?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  return (
    <div className="genre-filter" ref={containerRef}>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-button ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
          data-id={genre.id} // Added data attribute to find the element later
          onClick={() => handleGenreChange(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
