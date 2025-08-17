import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
    const naviagte = useNavigate();
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    function handleLogin() {
        naviagte('/login')
    }

    function handleSignUp() {
        naviagte('/signup')
    }

    async function handleLogout() {
        console.log("logout")
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/auth/logout',
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


    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <nav className="bg-white border-2  border-red-600  px-28 shadow-md  py-3 flex justify-between items-center">
                {/* Logo / Platform Name */}
                <h1 className="text-2xl font-bold text-blue-600">eLearning</h1>

                {/* Right Side Buttons */}
                <div className="space-x-4">
                    {user ? (<button onClick={handleLogout} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                        Logout
                    </button>) : (<div className="space-x-4" >
                        <button onClick={handleLogin} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                            Login
                        </button>
                        <button onClick={handleSignUp} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                            Signup
                        </button>
                    </div>)}

                </div>
            </nav>
        </div>
    )
}

export default Navbar
