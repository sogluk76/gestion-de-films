import React from 'react'
import "../Style/NavbarStyle"

const Navbar = () => {
  return (
    <nav class="navbar">
        <a href="#" class="site-name">MonSite</a>
        <div class="nav-links">
            <a href="#liste-des-films">Liste des films</a>
            <a href="#wishlist">Wishlist</a>
            <a href="#recherche">Recherche</a>
        </div>
    </nav>
  )
}

export default Navbar