import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading'; // Assuming this path is correct
import { Link } from 'react-router-dom'; // Import Link if not already

// Import icons for creative elements
import { FaBoxes, FaUser, FaEnvelope, FaPhone, FaMoneyBillWave, FaMapMarkerAlt, FaBookOpen, FaClipboardList } from 'react-icons/fa';

const OrderPage = () => {
    const { currentUser } = useAuth();

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-500 py-10">Error fetching your orders. Please try again later.</div>;

    return (
        <div className='container mx-auto py-8 px-4'>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h2 className='text-3xl font-bold text-gray-800 mb-6 flex items-center'>
                    <FaClipboardList className="text-indigo-600 mr-3 text-3xl" />
                    Your Order History
                </h2>

                {orders.length === 0 ? (
                    <div className="text-center py-10">
                        <FaBoxes className="mx-auto h-20 w-20 text-gray-400 opacity-70 mb-4 animate-bounce-slow" />
                        <p className="text-xl text-gray-600 font-medium">It looks like you haven't placed any orders yet!</p>
                        <p className="text-md text-gray-500 mt-2">Start building your library with our amazing collection.</p>
                        <Link 
                            to="/" 
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {orders.map((order, index) => (
                            <div key={order._id} className="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200 transition-transform duration-200 hover:shadow-lg hover:scale-[1.005]">
                                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                                    <p className='px-3 py-1 bg-indigo-600 text-white font-semibold rounded-full text-sm shadow-sm'>Order # {index + 1}</p>
                                    <span className="text-sm text-gray-500">Order Placed: {new Date(order?.createdAt).toLocaleDateString()}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                    <p className="flex items-center text-md">
                                        <FaClipboardList className="text-blue-500 mr-2 flex-shrink-0" />
                                        <span className="font-semibold">Order ID:</span> <span className="ml-2 break-all">{order._id}</span>
                                    </p>
                                    <p className="flex items-center text-md">
                                        <FaUser className="text-green-500 mr-2 flex-shrink-0" />
                                        <span className="font-semibold">Name:</span> <span className="ml-2">{order.name}</span>
                                    </p>
                                    <p className="flex items-center text-md">
                                        <FaEnvelope className="text-purple-500 mr-2 flex-shrink-0" />
                                        <span className="font-semibold">Email:</span> <span className="ml-2 break-all">{order.email}</span>
                                    </p>
                                    <p className="flex items-center text-md">
                                        <FaPhone className="text-orange-500 mr-2 flex-shrink-0" />
                                        <span className="font-semibold">Phone:</span> <span className="ml-2">{order.phone}</span>
                                    </p>
                                    <p className="flex items-center text-lg font-bold text-indigo-700 md:col-span-2">
                                        <FaMoneyBillWave className="text-teal-500 mr-2 flex-shrink-0" />
                                        <span className="font-semibold">Total Price:</span> <span className="ml-2">₹{order.totalPrice}</span> {/* Changed $ to ₹ */}
                                    </p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h3 className="font-bold text-lg text-gray-800 flex items-center mb-2">
                                        <FaMapMarkerAlt className="text-red-500 mr-2" />
                                        Delivery Address:
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed pl-6">
                                        {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                                    </p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h3 className="font-bold text-lg text-gray-800 flex items-center mb-2">
                                        <FaBookOpen className="text-yellow-600 mr-2" />
                                        Products in this Order:
                                    </h3>
                                    <ul className="list-disc list-inside pl-6 text-gray-700">
                                        {order.productIds.map((productId) => (
                                            <li key={productId} className="mb-1">
                                                <Link to={`/books/${productId}`} className="text-indigo-600 hover:underline">
                                                    Product ID: {productId}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CSS for empty cart animation (reused from CartPage) */}
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

export default OrderPage;
