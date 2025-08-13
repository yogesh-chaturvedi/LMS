import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';


const Login = () => {
    const { auth, setAuth } = useContext(AuthContext)
    const naviagte = useNavigate();
    const [loginData, setLoginData] = useState({
        userEmail: '',
        userPassword: ''
    })

    function handleChange(e) {
        setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(loginData)


    // to login
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios({
                method: "post",
                url: 'http://localhost:3000/auth/login',
                data: loginData,
                withCredentials: true
            })
            const { message, success } = response.data;
            if (success) {
                setAuth(true)
                toast(message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setLoginData({ userEmail: '', userPassword: '' })
                naviagte('/')
                console.log(message)
            }
        }
        catch (error) {
            console.log("there i an error", error)
        }
    }

    return (
        <div className="min-h-screen flex justify-center bg-slate-200  items-center ">

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <div className="login border-2 border-slate-300 shadow-xl bg-slate-100  rounded-xl w-[90vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] flex flex-col gap-5 py-5 justify-center items-center">
                <h1 className='font-bold text-2xl underline'>LogIn</h1>


                <form className='flex gap-3 flex-col w-[80%]' onSubmit={handleSubmit}>

                    {/* email */}
                    <div className='w-full '>
                        <label className='font-bold text-2xl' htmlFor="email">Email</label>
                        <input value={loginData.userEmail} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='userEmail' type="text" placeholder='Enter your email' />
                    </div>

                    {/* password */}
                    <div className='w-full'>
                        <label className='font-bold text-2xl' htmlFor="password">Password</label>
                        <input value={loginData.userPassword} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='userPassword' type="password" placeholder='Enter your password' />

                        <p className='text-blue-800 text-sm cursor-pointer' >
                            <Link to='/reset'>Foget Password?</Link>
                        </p>
                    </div>

                    <div className='text-center '>
                        <button type='submit' className='px-4 text-lg  font-bold bg-blue-600 text-white rounded-2xl cursor-pointer'>LogIn</button>
                        <div className='mt-2'>If You are new, Then you can
                            <Link to='/signup' className='text-blue-800'> SignUp</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
