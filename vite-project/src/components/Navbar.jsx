import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
        <a className="text-4xl text-white font-bold" href="#">MonSite</a>
        <div className="flex space-x-4">
            <a className="text-white hover:text-blue-400" href="liste-des-films">Liste des films</a>
            <a className="text-white hover:text-blue-400" href="wishlist">Wishlist</a>
            <a className="text-white hover:text-blue-400" href="#recherche">Recherche</a>
        </div>
    </nav>
  )
}

export default Navbar
