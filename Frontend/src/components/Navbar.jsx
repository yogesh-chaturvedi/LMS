import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { assets } from '../assets/assets'

const Navbar = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { user, setUser, loading, setLoading } = useContext(AuthContext);
    // console.log('user' ,user)

    const [profile, setProfile] = useState(true)

    function handleLogin() {
        navigate('/login')
    }

    function handleSignUp() {
        navigate('/signup')
    }

    async function handleLogout() {
        console.log("logout")
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}auth/logout`,
                withCredentials: true
            })
            const { success, message } = response.data;
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
                setUser(null);
            }

        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    // function to toggle profile 
    function handleClick() {
        if (profile === true) {
            setProfile(false)
        }
        else {
            setProfile(true)
        }
        console.log(profile)
    }


    function handleProfile() {
        navigate('/profile')
    }

    function handleCreateCourse() {
        navigate("/instructor/add-courses")
    }

    function handleAdmin() {
        navigate("/admin/dashboard")
    }

    function GoToHome() {
        navigate('/')
    }

    return (
        <div>

            <nav className="bg-gray-900 border-b border-gray-400 px-28 shadow-md  py-3 flex justify-between items-center">
                {/* Logo / Platform Name */}
                <h1 onClick={() => GoToHome()} className="text-2xl font-bold text-blue-600 cursor-pointer">eLearning</h1>

                {/* Right Side Buttons */}
                <div className="space-x-4">
                    {user ? (<div className="space-x-4 flex gap-3 items-center" >
                        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-lg font-bold transition duration-300">
                            Logout
                        </button>
                        <div className='relative' >

                            <img onClick={() => handleClick()} className="h-10 w-10 border-2 border-gray-400 rounded-full object-contain" src={user.profileImage} alt="profile-Image" />

                            {/* dropdown */}
                            <div className={`w-52 py-3 px-2 rounded-lg flex-col flex gap-4 bg-gray-400 absolute top-10 right-2 ${profile ? 'hidden' : 'flex'} `}>
                                <span onClick={() => handleProfile()} className='cursor-pointer px-2 w-[80%] text-gray-300 text-lg rounded-md bg-gray-600 hover:bg-gray-700'>My Profile</span>

                                {/* for instructor */}
                                {user.role === 'instructor' ? (<span onClick={() => handleCreateCourse()} className='cursor-pointer px-2 w-[80%] text-gray-300 text-lg rounded-md bg-gray-600 hover:bg-gray-700'>Create Course</span>) : ""}

                                {/* for admin */}
                                {user.role === 'admin' ? (<span onClick={() => handleAdmin()} className='cursor-pointer px-2 w-[80%] text-gray-300 text-lg rounded-md bg-gray-600 hover:bg-gray-700'>Dashboard</span>) : ""}
                            </div>

                        </div>
                    </div>) : (<div className="space-x-4" >
                        <button onClick={handleLogin} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                            Login
                        </button>
                        <button onClick={handleSignUp} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                            Signup
                        </button>
                    </div>)}

                </div>
            </nav >
        </div >
    )
}

export default Navbar
