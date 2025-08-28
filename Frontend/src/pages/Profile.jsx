import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'


const Profile = () => {

    const courses = [
        {
            id: 1,
            title: "Web Development",
            image: assets.mern,
            price: 300,
            instructor: 'Yash Chaturvedi'
        },
        {
            id: 2,
            title: "Data Science",
            image: assets.mern2,
            price: 500,
            instructor: 'Yogesh Chaturvedi'
        },
        {
            id: 3,
            title: "UI/UX Design",
            image: assets.node,
            price: 900,
            instructor: 'Allen Mamgain'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
    ];


    const BASE_URL = import.meta.env.VITE_API_URL;
    const { user, setUser, loading, setLoading, fetchUser } = useContext(AuthContext);

    // to toggle edit btn
    const [editMode, setEditMode] = useState(false)
    console.log(editMode)

    // to store new or edited data by the user
    const [newData, setnewData] = useState({
        name: '',
        email: '',
        imageUrl: '',
    })


    function handleChange(e) {
        setnewData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(newData)




    async function handleEdit(userId) {

        if (newData.name === "" || newData.email === "") {
            console.log("fields are empty")
            return;
        }


        try {
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}user/edit/${userId}`,
                data: { newData },
                withCredentials: true
            })
            const { message, success, user } = response.data;
            if (success) {
                console.log(message);
                setnewData({ name: '', email: '', imageUrl: '' });
                setEditMode(false);
                fetchUser()
            }
        }
        catch (error) {
            console.log("there is an erroe", error)
        }
    }

    return (
        <div>
            <Navbar />

            <div className=' border-2 border-red-700 bg-black px-28 flex flex-col gap-3 justify-center'>

                {/* user info */}
                <div className="p-6">
                    {/* Heading */}
                    <h1 className="text-2xl text-white font-bold mb-3">Profile</h1>

                    {/* Profile Card */}
                    <div className="flex bg-gray-900 items-center gap-6 p-6 shadow-md rounded-2xl">
                        {/* User Image */}
                        <img src={assets.node} alt="User" className="w-24 h-24 rounded-full border border-gray-300 object-cover" />

                        {/* User Info */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                            <p className="text-gray-400">{user.email}</p>
                            <p className="text-sm text-gray-200 mt-1">Role: {user.role}</p>
                        </div>





                        {/* Popup Modal */}
                        {editMode && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-gray-950 rounded-2xl shadow-lg p-6 w-96 relative">
                                    <h2 className="text-xl text-white font-bold mb-4">Edit Profile</h2>

                                    {/* Example form (you can customize fields later) */}
                                    {/* name */}
                                    <input value={newData.name} onChange={handleChange} name='name' type="text" placeholder="Enter name" className="w-full rounded-md border p-2  mb-3" />
                                    {/* email */}
                                    <input value={newData.email} onChange={handleChange} name='email' type="email" placeholder="Enter email" className="w-full border p-2 rounded-md mb-3" />
                                    {/* role */}
                                    <input value={newData.imageUrl} onChange={handleChange} name='imageUrl' type="url" placeholder="Enter image url" className="w-full border p-2 rounded-md mb-3" />

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-4">

                                        <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>

                                        <button onClick={() => handleEdit(user.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >Done</button>

                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Edit Profile Button */}
                        <button onClick={() => setEditMode(true)} className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Edit Profile</button>
                    </div>
                </div>

                {/* cards */}
                <div className='p-6'>
                    <h1 className="text-2xl text-white font-bold mb-3">Courses you are enrolled in</h1>

                    <div className="grid py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {courses.map((course, index) => (
                            <div key={index} className="bg-white w-[270px] rounded-2xl border-2 border-gray-700 shadow-md overflow-hidden hover:shadow-lg transition" >
                                <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />

                                <div className="px-4 py-3">
                                    <h3 className="text-lg font-semibold">{course.title}</h3>

                                    <div className='mb-2 flex justify-between items-center'>
                                        <span className='instructor-name font-bold'>{course.instructor}</span>
                                        <span className='course-level bg-blue-500 px-2 rounded-lg font-bold'>Advance</span>
                                    </div>

                                    <div className=' flex justify-between items-center'>
                                        <span className='price font-bold'>Rs.{course.price}</span>
                                        <Link to={`/course-details/${course.id}`} state={course} className='bg-green-500 px-2 rounded-lg font-bold'>View Course</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Profile
