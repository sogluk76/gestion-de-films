import React from 'react'
import { Link } from "react-router";


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
        <a className="text-4xl text-white font-bold" href="/">MonSite</a>
        <div className="flex space-x-4">
            <Link className="text-white hover:text-blue-400" to="/">Liste des films</Link>
            <Link className="text-white hover:text-blue-400" to="wishlist">Wishlist</Link>
        </div>
    </nav>
  )
}

export default Navbar
