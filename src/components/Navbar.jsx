import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

import avatarImg from "../assets/avatar.png" // Ensure this path is correct

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logout } = useAuth(); // currentUser will be null if only admin login is used
    const adminToken = localStorage.getItem('token'); // Check for admin token

    const handleLogOut = () => {
        logout(); // Logs out the Firebase user (if any, though we're moving away from user logins)
        localStorage.removeItem('token'); // Crucially, clear the admin token
        setIsDropdownOpen(false); // Close dropdown after logout
    };

    // Dynamically define navigation items for the dropdown
    const getNavigationItems = () => {
        const items = [];
        // As requested, always show "Admin Login" and link to /admin
        // This will mean a logged-in admin will also see "Admin Login"
        // and clicking it will take them to the login page.
        items.push({ name: "Admin Login", href: "/admin" });
        return items;
    };

    const navigationItems = getNavigationItems();

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6 bg-white shadow-sm rounded-lg my-4">
            <nav className="flex justify-between items-center">
                {/* Left side - BookVerse brand and personal touch */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center">
                        <span className="text-3xl font-extrabold text-indigo-700 hover:text-indigo-900 transition-colors duration-200 mr-2">
                            BookVerse
                        </span>
                        {/* Creative personal touch */}
                        <span className="text-sm font-light text-gray-500 italic hidden sm:block">
                            by Parag Chaudhary
                        </span>
                    </Link>
                    <p className="hidden md:block text-gray-500 italic text-sm">"Unlock worlds with every page."</p>
                </div>

                {/* Right side - User/Admin menu and Cart */}
                <div className="relative flex items-center space-x-4">
                    <div>
                        {/* Button to toggle the dropdown for admin login/dashboard/logout */}
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full">
                            {adminToken ? ( // If admin is logged in, show avatar
                                <img src={avatarImg} alt="Admin Avatar" className="size-8 rounded-full object-cover ring-2 ring-indigo-500" />
                            ) : ( // Otherwise, show a generic user icon
                                <HiOutlineUser className="size-8 text-gray-600 hover:text-indigo-600 transition-colors duration-200" />
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg z-40 py-1 border border-gray-200">
                                <ul className="py-1">
                                    {navigationItems.map((item) => (
                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                            <Link
                                                to={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 rounded-md mx-2"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                    {adminToken && ( // Only show logout if an admin is actually logged in
                                        <li>
                                            <button
                                                onClick={handleLogOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 rounded-md mx-2 mt-1 border-t border-gray-100 pt-2"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Cart link remains separate for public browsing */}
                    <Link to="/cart" className="bg-indigo-600 text-white px-3 py-2 sm:px-6 flex items-center rounded-md font-medium shadow-md hover:bg-indigo-700 transition-colors duration-200">
                        <HiOutlineShoppingCart className='size-5' />
                        {cartItems.length > 0 ? (
                            <span className="text-sm font-semibold ml-1">{cartItems.length}</span>
                        ) : (
                            <span className="text-sm font-semibold ml-1">0</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
