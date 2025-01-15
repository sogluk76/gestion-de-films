import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  // Supprimer un film de la wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <h2 className="text-2xl">Votre wishlist est vide.</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-center mb-8">Ma Wishlist</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {wishlist.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
              <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/100x150'}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{movie.release_date}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/Detail/${movie.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Détails
                </Link>
                <button
                  onClick={() => removeFromWishlist(movie.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
