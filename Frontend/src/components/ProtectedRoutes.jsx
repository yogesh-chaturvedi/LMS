import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoutes = () => {

    const { user, setUser, loading } = useContext(AuthContext);

    // console.log(user.role)

    if (loading) return <p className="font-bold text-2xl">Loading...</p>;
    return user !== null ? (<Outlet />) : (<Navigate to='/login' replace />)

}

export default ProtectedRoutes
