import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const actorsResponse = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
        const actorsData = await actorsResponse.json();
        setActors(actorsData.cast.slice(0, 10));

        const similarMoviesResponse = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR&page=1`);
        const similarMoviesData = await similarMoviesResponse.json();
        setSimilarMovies(similarMoviesData.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film :', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToWishlist = () => {
    if (movie) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const isAlreadyInWishlist = wishlist.some((item) => item.id === movie.id);

      if (!isAlreadyInWishlist) {
        wishlist.push(movie);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${movie.title} a été ajouté à votre wishlist !`);
      } else {
        alert(`${movie.title} est déjà dans votre wishlist.`);
      }
    }
  };

  if (!movie) return <div className="text-center p-6 bg-gray-100">Chargement...</div>;

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 p-6 flex items-center justify-center">
              <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300'}
                alt={movie.title}
                className="rounded-lg shadow-lg max-h-96 object-cover mx-auto"
              />
            </div>
            <div className="lg:w-2/3 p-6">
              <h1 className="text-4xl font-semibold mb-4">{movie.title}</h1>
              <p className="text-lg text-gray-400 mb-4">{movie.overview}</p>
              <div className="mb-4">
                <p className="text-lg text-gray-300">Date de sortie : <span className="text-gray-100">{movie.release_date}</span></p>
                <p className="text-lg text-gray-300">Note moyenne : <span className="text-yellow-400">{movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</span></p>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Genres :</h3>
              <div className="flex flex-wrap mb-4">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="mr-2 mb-2 px-4 py-1 bg-blue-600 rounded-full text-sm text-white">{genre.name}</span>
                ))}
              </div>
              {movie.runtime > 0 && (
                <p className="text-lg text-gray-300 mb-4">Durée : <span className="text-gray-100">{formatRuntime(movie.runtime)}</span></p>
              )}

              {/* Bouton Wishlist */}
              <button
                onClick={addToWishlist}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition focus:outline-none"
              >
                Ajouter à la Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Section des Acteurs */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-center mb-6">Acteurs principaux :</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {actors.map((actor) => (
              <div key={actor.id} className="text-center bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                <img
                  src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : 'https://via.placeholder.com/100x150'}
                  alt={actor.name}
                  className="w-32 h-48 object-cover rounded-lg mx-auto mb-4"
                />
                <p className="text-lg text-white">{actor.name}</p>
                <p className="text-sm text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section des films similaires */}
        {similarMovies.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-center mb-6">Films similaires :</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {similarMovies.map((similarMovie) => (
                <div key={similarMovie.id} className="text-center bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                  <img
                    src={similarMovie.poster_path ? `${IMAGE_BASE_URL}${similarMovie.poster_path}` : 'https://via.placeholder.com/100x150'}
                    alt={similarMovie.title}
                    className="w-32 h-48 object-cover rounded-lg mx-auto mb-4"
                  />
                  <p className="text-lg text-white">{similarMovie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
