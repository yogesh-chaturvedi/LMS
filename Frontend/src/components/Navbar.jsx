import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const naviagte = useNavigate();

    function handleLogin() {
        naviagte('/login')
    }

    function handleSignUp() {
        naviagte('/signup')
    }


    return (
        <div>
            <nav className="bg-white border-2  border-red-600  px-28 shadow-md  py-3 flex justify-between items-center">
                {/* Logo / Platform Name */}
                <h1 className="text-2xl font-bold text-blue-600">eLearning</h1>

                {/* Right Side Buttons */}
                <div className="space-x-4">
                    <button onClick={handleLogin} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                        Login
                    </button>
                    <button onClick={handleSignUp} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        Signup
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
