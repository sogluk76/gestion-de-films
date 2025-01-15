import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular'); // Catégorie par défaut
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=fr-FR`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des films :', error);
    }
  };

  const searchMovies = async () => {
    if (searchTerm.trim() === '') return;

    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${searchTerm}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Erreur lors de la recherche de films :', error);
    }
  };

  useEffect(() => {
    fetchMovies(category);
  }, [category]);

  return (
    <div className="text-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Liste des films</h1>

      {/* Dropdown et barre de recherche */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        {/* Dropdown pour sélectionner la catégorie */}
        <div>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 text-lg border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="now_playing">En salles (Now Playing)</option>
            <option value="popular">Populaires</option>
            <option value="top_rated">Les mieux notés (Top Rated)</option>
            <option value="upcoming">À venir (Upcoming)</option>
          </select>
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Rechercher un film..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-lg border rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={searchMovies}
            className="p-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Rechercher
          </button>
        </div>
      </div>

      {/* Liste des films */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <img
            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300'}
            alt={movie.title}
            className="w-full h-auto max-h-64 object-contain rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-800 mb-2">{movie.title}</h3>
            <p className="text-gray-600">Note moyenne : {movie.vote_average.toFixed(1)} ({movie.vote_count} Votes)</p>
            <button
              onClick={() => alert(`Voir les détails du film : ${movie.title}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Voir les détails
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
