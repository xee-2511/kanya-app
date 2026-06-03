import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes — add dashboard and feature pages here after auth is set up */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 404 — add a NotFound page here later */}
      </Routes>
    </BrowserRouter>
  )
}

export default App