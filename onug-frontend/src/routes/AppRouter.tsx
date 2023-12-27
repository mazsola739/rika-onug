import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Room from './Room'
import Settings from './Settings'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Room with ID Route */}
        <Route path="/room/:id" element={<Room />} />

        {/* Settings Route */}
        <Route path="/settings" element={<Settings />} />

        {/* 404 Not Found Route (optional) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  )
}

export default AppRouter
