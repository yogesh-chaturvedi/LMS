import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Trash, UserPen } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const AllUsers = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const BASE_URL2 = import.meta.env.VITE_API_URL2;
    const { allUsers, setAllUsers, getAllUser } = useContext(UserContext)


    // to remove users account
    async function handleRemove(userId) {
        try {
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}user/remove`,
                data: { userId },
                withCredentials: true
            })
            const { message, success, users } = response.data;
            if (success) {
                console.log(message)
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
            // setAllUsers(users);
            getAllUser()
        }
        catch (error) {
            console.log("there ia an error", error)
        }
    }

    return (
        <div>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />


            {/*className='flex bg-gray-50' ,,, min-h-screen lg:max-h-screen */}
            
                <h2 className='text-2xl font-bold px-1 pb-2 text-gray-700 hover:text-gray-800 '>All Users</h2>
                {/* right */}
                <div className="flex-1 lg:pr-28 overflow-auto py-3 h-[60vh] ">

                    <div className="min-w-[550px] rounded-lg overflow-hidden">
                        {/* Heading Row */}
                        <div className="flex justify-between bg-gray-100 px-4 py-3 font-bold text-lg">
                            <p className="w-1/6">Image</p>
                            <p className="w-2/6 text-center">Name</p>
                            <p className="w-1/6 text-center">Role</p>
                            <p className="w-2/6 text-center">Action</p>
                        </div>

                        {/* .filter((courses, index) => courses._id === user.id) */}
                        {/* Data Rows */}
                        <div className="divide-y">
                            {allUsers.filter((user) => user.role !== "admin")
                                .map((user, index) => {
                                    return (<div key={index} className="flex justify-between items-center px-4 py-3">

                                        {/* profileImage */}
                                        <div className='w-1/6'>
                                            <img src={user?.profileImage?.url ? `${BASE_URL2}${user.profileImage.url}` : ''} alt="user-Image" className='border-black  border w-12 h-12 rounded-full object-contain bg-gray-200 ' />
                                        </div>

                                        {/* Name */}
                                        <p className="w-2/6 flex justify-center hover:underline cursor-pointer font-medium truncate">{user.name}</p>

                                        {/* Role */}
                                        <p className="w-1/6 text-center font-semibold">{user.role}</p>

                                        {/* Action */}
                                        <div onClick={() => handleRemove(user._id)} className="w-2/6 text-center flex items-center justify-center gap-1 text-blue-600 cursor-pointer ">
                                            <Trash color='black' fill='black' size={18} />
                                            <span className='font-semibold text-black'>Remove</span>
                                        </div>

                                    </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default AllUsers
