import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { UserPen } from 'lucide-react'

const AllUsers = () => {

    const { allUsers, setAllUsers, getAllUser } = useContext(UserContext)
    return (
        <div>

            <Navbar />

            <div className='border-2 border-red-600 flex '>

                {/* left  */}
                <Sidebar />

                {/* right */}
                <div className="flex-1 pl-2 pr-28 overflow-auto h-[90vh] py-8">

                    <div className="border rounded-lg overflow-hidden">
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
                                            <img src={user.profileImage} alt="user-Imge" className='border-black  w-12 h-12 rounded-full' />
                                        </div>

                                        {/* Name */}
                                        <p className="w-2/6 flex justify-center hover:underline cursor-pointer font-medium truncate">{user.name}</p>

                                        {/* Role */}
                                        <p className="w-1/6 text-center font-semibold">{user.role}</p>



                                        {/* Action */}
                                        <div className="w-2/6 text-center flex items-center justify-center gap-2 text-blue-600 cursor-pointer ">
                                            <UserPen size={18} color='black' />
                                            <span className='font-semibold text-black'>Edit</span>
                                        </div>

                                    </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default AllUsers
