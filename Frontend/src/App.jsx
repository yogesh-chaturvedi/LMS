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
import DashboardHome from './pages/Dashboard/DashboardHome'
import AdminProtectedRoutes from './components/AdminProtectedRoutes'
import AddInstructor from './pages/Dashboard/AddInstructor'

function App() {

  return (
    <Routes>
      {/* global routes */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/reset' element={<Reset />} />

      {/* users can only access if thsy are logged in  */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/course-details/:id' element={<CourseDetails />} />
        <Route path='/course-progress/:id' element={<CourseProgress />} />
        <Route path='/course' element={<Courses />} />
      </Route>

      {/* admin protected routes */}
      <Route element={<AdminProtectedRoutes />}>
        <Route path="/admin/dashboard" element={<DashboardHome />} />
        <Route path="/admin/add-instructor" element={<AddInstructor />} />
      </Route>
    </Routes>
  )
}
export default App
