import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';




const Signup = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        userName: '',
        userEmail: '',
        userPassword: ''
    })

    function handleChange(e) {
        setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(signupData)



    // send user credentials 
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios({
                method: "post",
                url: `${BASE_URL}auth/signup`,
                data: signupData,
            })

            const { message, success, error } = response.data

            if (success) {
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
                console.log(message)
                setSignupData({ userName: '', userEmail: '', userPassword: '' })
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
            }

        }
        catch (error) {
            console.log("there is an error", error)
            const message = error?.response?.data?.error?.details[0]?.message || error?.response?.data?.message
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
        }
    }


    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-900">

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="login border border-slate-700 shadow-2xl bg-slate-800 rounded-2xl w-[90vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] flex flex-col gap-5 py-8 px-6 justify-center items-center">
                <h1 className="font-bold text-3xl text-white underline">SignUp</h1>

                <form className="flex gap-4 flex-col w-[80%]" onSubmit={handleSubmit}>
                    {/* name */}
                    <div className="w-full">
                        <label className="font-bold text-lg text-gray-200" htmlFor="name">
                            Name
                        </label>
                        <input
                            value={signupData.userName}
                            onChange={handleChange}
                            className="border border-slate-600 bg-slate-700 text-white placeholder-gray-400 w-full rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="userName"
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* email */}
                    <div className="w-full">
                        <label className="font-bold text-lg text-gray-200" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={signupData.userEmail}
                            onChange={handleChange}
                            className="border border-slate-600 bg-slate-700 text-white placeholder-gray-400 w-full rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="userEmail"
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* password */}
                    <div className="w-full">
                        <label className="font-bold text-lg text-gray-200" htmlFor="password">
                            Password
                        </label>
                        <input
                            value={signupData.userPassword}
                            onChange={handleChange}
                            className="border border-slate-600 bg-slate-700 text-white placeholder-gray-400 w-full rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="userPassword"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition duration-300"
                        >
                            Save
                        </button>
                        <div className="mt-3 text-gray-300">
                            If you already have an account, then you can
                            <Link to="/login" className="text-blue-400 ml-1">
                                LogIn
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signup
