import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const InstructorProtectedRoutes = () => {

    const { user, setUser, loading, setLoading } = useContext(AuthContext)

    if (loading) return <p className='text-2xl font-bold'>Loading...</p>
    return (user !== null && (user.role === "instructor" || user.role === "admin") ? (<Outlet />) : (<Navigate to='/login' replace />))
}

export default InstructorProtectedRoutes
