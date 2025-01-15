import React, { useState, useEffect } from 'react';
import { Link } from "react-router";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular'); // Catégorie par défaut
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Fonction de récupération des films
  const fetchMovies = async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=fr-FR`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des films :', error);
    }
  };

  // Fonction de recherche des films
  const searchMovies = async () => {
    if (debouncedSearchTerm.trim() === '') return;

    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${debouncedSearchTerm}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Erreur lors de la recherche de films :', error);
    }
  };

  // Effet pour déclencher la recherche après un délai (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    // Nettoyage du timer au changement de `searchTerm`
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Effet pour récupérer les films selon la catégorie ou la recherche
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMovies();
    } else {
      fetchMovies(category);
    }
  }, [category, debouncedSearchTerm]);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Liste des films</h1>

        {/* Sélecteur de catégorie et champ de recherche */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 pl-4 pr-10 text-lg bg-gray-800 text-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="now_playing">En salles (Now Playing)</option>
              <option value="popular">Populaires</option>
              <option value="top_rated">Les mieux notés (Top Rated)</option>
              <option value="upcoming">À venir (Upcoming)</option>
            </select>
            <span className="absolute top-0 right-0 mt-3 mr-4 text-white pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 text-lg bg-gray-800 text-white border rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
            >
              <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300'}
                alt={movie.title}
                className="w-full h-auto object-contain rounded-lg mb-4" // Modifié ici
              />
              <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
              <p className="text-gray-400">Note moyenne : {movie.vote_average.toFixed(1)} ({movie.vote_count} Votes)</p>
              <Link
                to={`/Detail/${movie.id}`}
                className="block mt-4 mb-2 px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition focus:outline-none"
              >
                Voir les détails
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
