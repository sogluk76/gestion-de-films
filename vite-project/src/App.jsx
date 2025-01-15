import { Routes, Route } from "react-router";
import React from 'react'
import MovieList from './components/MovieList'
import Wishlist from './components/Wishlist'
import MovieDetail from './components/MovieDetail'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/Wishlist" element={<Wishlist />} />
      <Route path="/Detail/:id" element={<MovieDetail />} />
    </Routes>
    </>
  )
}

export default App