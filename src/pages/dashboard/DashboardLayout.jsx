import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { HiOutlineCog, HiOutlineBell, HiOutlineLogout } from "react-icons/hi"; // Added new icons
import { RiDashboardLine } from "react-icons/ri"; // Dashboard icon
import { LuLaptop } from "react-icons/lu"; // Creative icon for the brand

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    };

    return (
        <section className="flex min-h-screen bg-gray-50 font-sans antialiased">
            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-20 sm:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-gray-400 transform transition-transform duration-300 ease-in-out z-30
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                sm:relative sm:translate-x-0 sm:flex sm:flex-col`}
            >
                {/* Logo/Brand Section - Updated */}
                <Link to="/" className="flex items-center justify-center h-20 bg-gray-900 text-white text-2xl font-bold border-b border-gray-700">
                    <LuLaptop className="h-7 w-7 mr-2 text-indigo-400 animate-pulse-slow" /> {/* Creative Icon */}
                    Admin Dashboard
                </Link>

                {/* Navigation Links */}
                <div className="flex-grow flex flex-col justify-between">
                    <nav className="flex flex-col p-4 space-y-2">
                        {/* Removed the old "Folders" icon and link */}
                        
                        {/* Dashboard Link */}
                        <Link 
                            to="/dashboard" 
                            className="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
                            onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                        >
                            <RiDashboardLine className="h-6 w-6 mr-3" /> {/* Modern dashboard icon */}
                            <span>Dashboard</span>
                        </Link>
                        
                        {/* Add New Book Link */}
                        <Link 
                            to="/dashboard/add-new-book" 
                            className="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <HiViewGridAdd className="h-6 w-6 mr-3" />
                            <span>Add New Book</span>
                        </Link>
                        
                        {/* Manage Books Link */}
                        <Link 
                            to="/dashboard/manage-books" 
                            className="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <MdOutlineManageHistory className="h-6 w-6 mr-3" />
                            <span>Manage Books</span>
                        </Link>
                    </nav>

                    {/* Settings/Logout at bottom */}
                    <div className="p-4 border-t border-gray-700">
                        <button className="flex items-center w-full p-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200">
                            <HiOutlineCog className="h-6 w-6 mr-3" />
                            <span>Settings</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full p-3 text-red-400 rounded-lg hover:bg-gray-700 hover:text-red-300 mt-2 transition-colors duration-200"
                        >
                            <HiOutlineLogout className="h-6 w-6 mr-3" />
                            <span>Log out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content area */}
            <div className="flex-grow flex flex-col">
                <header className="flex items-center justify-between h-20 px-6 bg-white shadow-md">
                    {/* Mobile menu button */}
                    <button 
                        className="block sm:hidden relative p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-full transition-colors duration-200"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <span className="sr-only">Menu</span>
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>

                    {/* Search bar */}
                    <div className="relative flex-grow max-w-md mx-4"> {/* Added mx-4 to give some space */}
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input 
                            type="text" 
                            role="search" 
                            placeholder="Search..." 
                            className="py-2 pl-10 pr-4 w-full border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg transition-colors duration-200" 
                        />
                    </div>

                    {/* Profile & Notifications */}
                    <div className="flex items-center ml-auto space-x-4">
                        {/* User Profile */}
                        <button className="inline-flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight mr-2">
                                <span className="font-semibold text-gray-800">Parag Chaudhary</span>
                                <span className="text-sm text-gray-600">Software Engineer</span>
                            </div>
                            <span className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden border-2 border-indigo-500 flex-shrink-0"> {/* Styled avatar */}
                                <img src="/Parag_Image.jpg" alt="user profile photo" className="h-full w-full object-cover"/>
                            </span>
                        </button>
                        
                        {/* Notification Icon */}
                        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                            <span className="sr-only">Notifications</span>
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span> {/* Enhanced notification dot */}
                            <HiOutlineBell className="h-6 w-6" /> {/* Icon from react-icons */}
                        </button>
                    </div>
                </header>
                
                {/* Main content outlet */}
                <main className="flex-grow p-6 sm:p-10 bg-gray-100"> {/* Light gray background for content */}
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between mb-8"> {/* Added mb-8 for spacing */}
                        <div className="mr-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Dashboard</h1> {/* Stronger heading */}
                            <p className="text-lg text-gray-600">Book Store Inventory Management</p> {/* Changed h2 to p and styled */}
                        </div>
                        <div className="flex flex-col md:flex-row items-start justify-end gap-3"> {/* Used gap for spacing */}
                            <Link to="/dashboard/manage-books" className="inline-flex items-center px-5 py-2.5 text-indigo-600 hover:text-indigo-700 bg-white border border-indigo-500 rounded-lg shadow-sm transition-colors duration-200"> {/* Styled button */}
                                <MdOutlineManageHistory className="flex-shrink-0 h-5 w-5 mr-2" />
                                Manage Books
                            </Link>
                            <Link to="/dashboard/add-new-book" className="inline-flex items-center px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-colors duration-200"> {/* Styled button */}
                                <HiViewGridAdd className="flex-shrink-0 h-6 w-6 mr-2" />
                                Add New Book
                            </Link>
                        </div>
                    </div>
                    <Outlet/>
                </main>
            </div>
        </section>
    );
};

export default DashboardLayout;
