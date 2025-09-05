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
        <div className='min-h-screen flex justify-center bg-slate-200 items-center'>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <div className="login border-2 border-slate-300 rounded-2xl shadow-xl bg-slate-100 w-[90vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] flex flex-col gap-5 py-5 justify-center items-center">
                <h1 className='font-bold text-2xl underline'>SignUp</h1>

                <form className='flex gap-3 flex-col w-[80%]' onSubmit={handleSubmit}>

                    {/* name  */}
                    <div className='w-full '>
                        <label className='font-bold text-2xl' htmlFor="name">Name</label>
                        <input value={signupData.userName} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='userName' type="text" placeholder='Enter your name' />
                    </div>

                    {/* email */}
                    <div className='w-full '>
                        <label className='font-bold text-2xl' htmlFor="email">Email</label>
                        <input value={signupData.userEmail} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='userEmail' type="text" placeholder='Enter your email' />
                    </div>

                    {/* password */}
                    <div className='w-full'>
                        <label className='font-bold text-2xl' htmlFor="password">Password</label>
                        <input value={signupData.userPassword} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='userPassword' type="password" placeholder='Enter your password' />
                    </div>

                    <div className='text-center '>
                        <button type='submit' className='px-4 text-lg  font-bold bg-blue-600 text-white rounded-2xl'>Save</button>
                        <div className='mt-2'>If you already have an account, then you can <Link to='/login' className='text-blue-800'>LogIn</Link></div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup
