import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const Reset = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const [resetData, setResetData] = useState({
        userEmail: '',
        newPassword: '',
        confirmPassword: ''
    })

    function handleChange(e) {
        setResetData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log(resetData)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}password/reset`,
                data: resetData,
                withCredentials: true
            });

            const { message, success } = response.data;
            if (success) {
                toast.success(message || "Password reset successfully!", {
                    position: "top-center",
                    autoClose: 1500,
                    theme: "dark",
                });

                setResetData({ userEmail: '', newPassword: '', confirmPassword: '' })
            }
        } catch (error) {
            console.log("there is an error", error);

            // Try to extract the message safely
            const message =
                error?.response?.data?.details?.[0]?.message ||
                error?.response?.data?.message ||
                "Something went wrong!";

            toast.error(message, {
                position: "top-center",
                autoClose: 1500,
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
                <h1 className="font-bold text-3xl text-white underline">Reset</h1>

                <form className="flex gap-4 flex-col w-[80%]" onSubmit={handleSubmit}>
                    {/* email */}
                    <div className="w-full">
                        <label className="font-bold text-lg text-gray-200" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={resetData.userEmail}
                            onChange={handleChange}
                            className="border border-slate-600 bg-slate-700 text-white placeholder-gray-400 w-full rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="userEmail"
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* new password */}
                    <div className="w-full">
                        <label className="font-bold text-lg text-gray-200" htmlFor="password">
                            New Password
                        </label>
                        <input
                            value={resetData.newPassword}
                            onChange={handleChange}
                            className="border border-slate-600 bg-slate-700 text-white placeholder-gray-400 w-full rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="newPassword"
                            type="password"
                            placeholder="Enter your new password"
                        />
                    </div>

                    {/* confirm password */}
                    <div className="w-full">
                        <label className="font-bold text-lg text-gray-200" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            value={resetData.confirmPassword}
                            onChange={handleChange}
                            className="border border-slate-600 bg-slate-700 text-white placeholder-gray-400 w-full rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="confirmPassword"
                            type="password"
                            placeholder="Re-enter your password"
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

export default Reset
