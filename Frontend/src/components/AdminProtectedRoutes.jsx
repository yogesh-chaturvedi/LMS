import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet, replace } from 'react-router-dom';

const AdminProtectedRoutes = () => {

    const { user, setUser, loading } = useContext(AuthContext);

    if (loading) return <p className="font-bold text-2xl">Loading...</p>;
    return (user !== null && user.role === "admin" ? (<Outlet />) : (<Navigate to='/login' replace />))
}

export default AdminProtectedRoutes
