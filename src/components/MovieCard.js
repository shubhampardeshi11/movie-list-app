// src/components/MovieCard.js
import React from 'react';
import '../styles/App.css'; // Import styles for cards

const MovieCard = ({ title, image, genres, cast, director, description }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p><strong>Genres:</strong> {genres.join(', ')}</p>
        <p><strong>Cast:</strong> {cast.join(', ')}</p>
        <p><strong>Director:</strong> {director}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
