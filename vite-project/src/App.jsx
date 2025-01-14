import { Routes, Route } from "react-router";
import React from 'react'
import MovieList from './components/MovieList'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
    </Routes>
  )
}

export default App