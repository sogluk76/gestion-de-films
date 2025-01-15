import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  const [wishlistCount, setWishlistCount] = useState(0);

  // Met à jour le nombre de films dans la wishlist en surveillant le localStorage
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlist.length);
    };

    // Initialisation
    updateWishlistCount();

    // Écoute des changements sur le localStorage
    window.addEventListener('storage', updateWishlistCount);

    return () => {
      window.removeEventListener('storage', updateWishlistCount);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-400">
          MoviesApp
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="relative hover:text-gray-400">
              Wishlist
              <span className="ml-2 inline-block px-2 py-1 text-xs font-bold bg-red-600 text-white rounded-full">
                {wishlistCount}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
