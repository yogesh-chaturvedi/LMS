import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CourseDetails from './pages/CourseDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reset from './pages/Reset'
import ProtectedRoutes from './components/ProtectedRoutes'
import CourseProgress from './pages/CourseProgress'
import Courses from './pages/Courses'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/reset' element={<Reset />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/course-details/:id' element={<CourseDetails />} />
        <Route path='/course-progress/:id' element={<CourseProgress />} />
        <Route path='/course' element={<Courses />} />
      </Route>
    </Routes>
  )
}
export default App
