import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'  
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generate-video" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
