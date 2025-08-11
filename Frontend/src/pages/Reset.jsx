import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



// toast("text copied successfully", {
//                 position: "top-center",
//                 autoClose: 1500,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });


const Reset = () => {

    const [resetData, setResetData] = useState({
        userEmail: '',
        newPassword: '',
        confirmPassword: ''
    })

    function handleChange(e) {
        setResetData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log(resetData)


    return (
        <div className='min-h-screen flex justify-center bg-slate-200 items-center'>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <div className="login border-2 border-slate-300 rounded-2xl shadow-xl bg-slate-100 w-[90vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] flex flex-col gap-5 py-5 justify-center items-center">
                <h1 className='font-bold text-2xl underline'>Reset</h1>

                <form className='flex gap-3 flex-col w-[80%]'>

                    {/* email */}
                    <div className='w-full '>
                        <label className='font-bold text-2xl' htmlFor="email">Email</label>
                        <input value={resetData.userEmail} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='userEmail' type="text" placeholder='Enter your email' />
                    </div>

                    {/* password */}
                    <div className='w-full'>
                        <label className='font-bold text-2xl' htmlFor="password">Password</label>
                        <input value={resetData.newPassword} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='newPassword' type="password" placeholder='Enter your password' />
                    </div>

                    {/* confirm password */}
                    <div className='w-full'>
                        <label className='font-bold text-2xl' htmlFor="password">Confirm Password</label>
                        <input value={resetData.confirmPassword} onChange={handleChange} className='border-2 border-black w-full rounded-3xl pl-2' name='confirmPassword' type="password" placeholder='Enter your password' />
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

export default Reset
