// src/App.js
import React from 'react';
import MovieList from './components/MovieList';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Movie List App</h1>
      </header>
      <main>
        <MovieList />
      </main>
    </div>
  );
};

export default App;
