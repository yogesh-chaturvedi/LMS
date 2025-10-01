import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const AddInstructor = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const [instructorData, setInstructorData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        expertise: '',
        experience: '',
    })

    const [file, setFile] = useState(null)

    // set data
    function handleChange(e) {
        setInstructorData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    // console.log(instructorData)

    // to send data and create admin 
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/user/instructor`,
                data: formData,
                withCredentials: true
            })
            const { message, success } = response.data;
            if (success) {
                console.log(message)

                setInstructorData({ name: '', email: '', password: '', phone: '', expertise: '', experience: '', profileImage: '' })

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
        catch (error) {
            console.log("there is na error", error)
            const message = error?.response?.data?.message;

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

    function handleFileChange(e) {
        setFile(e.target.files[0])
    }

    const formData = new FormData();
    formData.append('name', instructorData.name)
    formData.append('email', instructorData.email)
    formData.append('password', instructorData.password)
    formData.append('phone', instructorData.phone)
    formData.append('expertise', instructorData.expertise)
    formData.append('experience', instructorData.experience)
    if (file) formData.append('profileImage', file)


    return (
        <div>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <Navbar />
            <div className='flex  bg-gray-50'>

                <Sidebar />

                {/* right */}
                <div className='flex flex-1 py-4 px-5 lg:px-28 min-h-screen'>
                    <div className="p-6 max-w-lg mx-auto bg-gray-500 h-[552px] border-2 shadow-2xl rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Add Instructor</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Name */}
                            <input value={instructorData.name} onChange={handleChange} type="text" name="name" placeholder="Full Name" className="w-full border p-2 rounded-lg" required />

                            {/* Email */}
                            <input value={instructorData.email} onChange={handleChange} type="email" name="email" placeholder="Email Address" className="w-full border p-2 rounded-lg" required />

                            {/* password */}
                            <input value={instructorData.password} onChange={handleChange} type="password" name="password" placeholder="Pasword" className="w-full border p-2 rounded-lg" required />

                            {/* Phone */}
                            <input value={instructorData.phone} onChange={handleChange} type="text" name="phone" placeholder="Phone Number" className="w-full border p-2 rounded-lg" />

                            {/* Expertise */}
                            <input value={instructorData.expertise} onChange={handleChange} type="text" name="expertise" placeholder="Expertise / Subject" className="w-full border p-2 rounded-lg" required />

                            {/* Experience */}
                            <input value={instructorData.experience} onChange={handleChange} type="number" name="experience" placeholder="Experience (in years)" className="w-full border p-2 rounded-lg" required />

                            {/* Profile Image */}
                            {/* <input value={instructorData.profileImage} onChange={handleChange} type="text" name="profileImage" placeholder="Profile Image URL" className="w-full border p-2 rounded-lg" /> */}

                            <input onChange={handleFileChange} type="file" accept='image/*' name="profileImage" />

                            {/* Submit */}
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" >
                                Add Instructor
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default AddInstructor
