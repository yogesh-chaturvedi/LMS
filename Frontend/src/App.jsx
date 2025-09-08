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
import AllCourses from './pages/Dashboard/AllCourses'
import InstructorProtectedRoutes from './components/InstructorProtectedRoutes'
import AddCourses from './pages/Instructor/AddCourses'
import MyCourses from './pages/Instructor/MyCourses'
import AddLectures from './pages/Instructor/AddLectures'
import EditLecture from './pages/Instructor/EditLecture'
import Profile from './pages/Profile'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import AllUsers from './pages/Dashboard/AllUsers'


function App() {

  return (
    <Routes>
      {/* global routes */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/reset' element={<Reset />} />
      <Route path='success' element={<Success />} />
      <Route path='cancel' element={<Cancel />} />
      <Route path='/course' element={<Courses />} />

      {/* users can only access if they are logged in  */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/course-details/:id' element={<CourseDetails />} />
        <Route path='/course-progress/:id' element={<CourseProgress />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      {/* admin only routes */}
      <Route element={<AdminProtectedRoutes />}>
        <Route path="/admin/dashboard" element={<DashboardHome />} />
        <Route path="/admin/courses" element={<AllCourses />} />
        <Route path="/admin/add-instructor" element={<AddInstructor />} />
        <Route path="/admin/users" element={<AllUsers />} />
      </Route>

      {/* instructor only routes */}
      <Route element={<InstructorProtectedRoutes />}>
        <Route path='/instructor/add-courses' element={<AddCourses />} />
        <Route path='/instructor/my-courses' element={<MyCourses />} />
        <Route path='/instructor/add-lectures/:courseId' element={<AddLectures />} />
        <Route path='/instructor/add-lectures/:courseId/:lectureId' element={<AddLectures />} />
        <Route path='/instructor/edit-lectures/:courseId/:lectureId' element={<EditLecture />} />
      </Route>

    </Routes>
  )
}
export default App
