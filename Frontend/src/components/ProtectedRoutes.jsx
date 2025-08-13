import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoutes = () => {

    const { auth } = useContext(AuthContext);

    console.log(auth)


    if (auth === null) return <p className="font-bold text-2xl">Loading...</p>;
    return auth ? <Outlet /> : <Navigate to='/login' replace />

}

export default ProtectedRoutes
