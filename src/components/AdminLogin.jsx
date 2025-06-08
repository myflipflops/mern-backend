import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';
import MessageModal from '../components/MessageModal'; // Import the new MessageModal

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('info'); // 'info', 'success', 'error', 'warning'

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const showModal = (msg, type = 'info') => {
        setMessage(msg);
        setModalType(type);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setMessage("");
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                // Token expiration logic (replace alert with modal)
                setTimeout(() => {
                    localStorage.removeItem('token');
                    showModal('Your session has expired. Please log in again.', 'warning');
                    navigate("/");
                }, 3600 * 1000); // 1 hour token validity simulation
            }

            showModal("Admin Login successful!", 'success'); // Use modal instead of alert
            navigate("/dashboard");

        } catch (error) {
            showModal("Invalid credentials. Please try again.", 'error'); // Use modal instead of alert
            setMessage("Invalid credentials. Please try again."); // Keep for local message display if needed
            console.error("Admin login error:", error);
        }
    };

    return (
        <div className='relative h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-indigo-700 to-purple-900'>
            {/* Creative Background Elements (Animated Circles) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-purple-600 opacity-20 rounded-full animate-float-one blur-xl"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-indigo-500 opacity-20 rounded-full animate-float-two blur-xl"></div>
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-400 opacity-15 rounded-full animate-float-three blur-xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-pink-500 opacity-10 rounded-full animate-float-four blur-xl"></div>
            </div>

            {/* Login Form Container */}
            <div className='relative z-10 w-full max-w-sm mx-auto bg-white p-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-5'>
                        <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text" name="username" id="username" placeholder='Enter username'
                            className='shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200'
                        />
                        {errors.username && <p className='text-red-500 text-xs mt-1'>Username is required.</p>}
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password" name="password" id="password" placeholder='Enter password'
                            className='shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200'
                        />
                        {errors.password && <p className='text-red-500 text-xs mt-1'>Password is required.</p>}
                    </div>
                    {
                        message && !modalVisible && <p className='text-red-600 text-sm italic mb-4 text-center'>{message}</p>
                    }
                    <div className='w-full'>
                        <button
                            type="submit"
                            className='bg-indigo-600 w-full hover:bg-indigo-700 text-white font-bold py-2.5 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 shadow-md'
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className='mt-8 text-center text-gray-500 text-sm'>©2025 Book Store. All rights reserved.</p>
            </div>

            {/* Message Modal */}
            <MessageModal message={message} type={modalType} onClose={hideModal} />

            {/* CSS for animations (Ideally in a global CSS file or specific component CSS) */}
            <style jsx>{`
                @keyframes float-one {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(20px, 30px); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes float-two {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(-30px, -20px); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes float-three {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(25px, -15px); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes float-four {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(-15px, 25px); }
                    100% { transform: translate(0, 0); }
                }

                .animate-float-one { animation: float-one 15s ease-in-out infinite; }
                .animate-float-two { animation: float-two 18s ease-in-out infinite; }
                .animate-float-three { animation: float-three 12s ease-in-out infinite; }
                .animate-float-four { animation: float-four 20s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default AdminLogin;
