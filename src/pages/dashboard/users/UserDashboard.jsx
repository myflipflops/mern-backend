import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import Loading from '../../../components/Loading'; // Corrected import path
import { Link } from 'react-router-dom'; // Import Link

// Import icons for creative elements
import { FaUserCircle, FaBoxes, FaClipboardList, FaCalendarAlt, FaMoneyBillWave, FaBookOpen } from 'react-icons/fa';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-500 py-10">Error fetching your dashboard data. Please try again later.</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaUserCircle className="text-indigo-600 mr-3 text-3xl" />
                    Welcome to Your Dashboard, {currentUser?.displayName || 'User'}!
                </h1>
                <p className="text-gray-700 text-lg mb-8">Here's a quick overview of your recent activity:</p>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                        <FaClipboardList className="text-purple-600 mr-2 text-2xl" />
                        Your Recent Orders
                    </h2>
                    {orders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {orders.slice(0, 3).map((order) => ( // Displaying only a few recent orders for brevity
                                <div key={order._id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 transition-transform duration-200 hover:shadow-md hover:scale-[1.005]">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                                        <p className="text-lg font-medium text-gray-900 flex items-center">
                                            <span className="font-semibold mr-2">Order ID:</span>
                                            <span className="text-blue-600 break-all">{order._id.substring(0, 10)}...</span> {/* Truncate for display */}
                                        </p>
                                        <Link to="/orders" className="text-indigo-600 hover:underline text-sm font-medium">View Full Order</Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                                        <p className="flex items-center">
                                            <FaCalendarAlt className="text-green-500 mr-2" />
                                            <span className="font-semibold">Date:</span> <span className="ml-1">{new Date(order?.createdAt).toLocaleDateString()}</span>
                                        </p>
                                        <p className="flex items-center text-lg font-bold text-indigo-700">
                                            <FaMoneyBillWave className="text-teal-500 mr-2" />
                                            <span className="font-semibold">Total:</span> <span className="ml-1">₹{order.totalPrice}</span> {/* Changed $ to ₹ */}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-200">
                                        <h3 className="font-semibold text-md text-gray-800 flex items-center mb-2">
                                            <FaBookOpen className="text-yellow-600 mr-2" />
                                            Items (IDs):
                                        </h3>
                                        <ul className="list-disc list-inside pl-6 text-sm text-gray-700">
                                            {order.productIds.slice(0, 3).map((productId) => ( // Show first few product IDs
                                                <li key={productId} className="mb-1">
                                                    <Link to={`/books/${productId}`} className="text-indigo-600 hover:underline break-all">
                                                        {productId.substring(0, 15)}...
                                                    </Link>
                                                </li>
                                            ))}
                                            {order.productIds.length > 3 && (
                                                <li className="text-gray-500 text-xs mt-1">...and {order.productIds.length - 3} more items.</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            {orders.length > 3 && (
                                <div className="text-center mt-6">
                                    <Link to="/orders" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
                                        View All Orders <span aria-hidden="true" className="ml-2">&rarr;</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                            <FaBoxes className="mx-auto h-20 w-20 text-gray-400 opacity-70 mb-4 animate-bounce-slow" />
                            <p className="text-xl text-gray-600 font-medium">No orders found in your history!</p>
                            <p className="text-md text-gray-500 mt-2">Time to start building your library.</p>
                            <Link 
                                to="/" 
                                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* CSS for empty orders animation */}
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default UserDashboard;
