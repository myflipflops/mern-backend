import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl'; // Corrected: Added 'from' keyword
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import Loading from '../../components/Loading'; // Ensure Loading component is imported

// Import additional icons for creative elements
import { FaUserEdit, FaCalendarAlt, FaLayerGroup, FaMoneyBillWave } from 'react-icons/fa';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <Loading />; // Use the Loading component
    if (isError) return <div className="text-center text-red-500 py-10">Error loading book information. Please try again.</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex flex-row-reverse items-center p-8 border border-gray-100">
                {/* Book Cover Section (Right side on desktop, top on mobile) */}
                <div className="md:w-1/2 flex justify-center items-center p-4 relative">
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="max-w-xs md:max-w-sm lg:max-w-md w-full h-auto rounded-lg shadow-2xl transform transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-2 relative z-10"
                    />
                    {/* Creative pulsating effect for the image background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-blue-100 rounded-lg animate-pulse-slow blur-xl opacity-30 z-0"></div>
                </div>

                {/* Book Details Section (Left side on desktop, bottom on mobile) */}
                <div className="md:w-1/2 p-4 md:pl-8 mt-8 md:mt-0">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{book.title}</h1>
                    
                    {/* Price Section */}
                    <div className="flex items-baseline space-x-3 mb-6">
                        <p className="text-4xl font-bold text-indigo-700">₹{book?.newPrice}</p>
                        {book?.oldPrice && (
                            <p className="text-xl text-gray-500 line-through">₹{book?.oldPrice}</p>
                        )}
                    </div>

                    {/* Quick Facts Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-md shadow-sm">
                            <FaUserEdit className="text-indigo-500 mr-3 text-xl" />
                            <span className="font-semibold">Author:</span> <span className="ml-2">{book.author || 'Admin'}</span>
                        </div>
                        <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-md shadow-sm">
                            <FaCalendarAlt className="text-green-500 mr-3 text-xl" />
                            <span className="font-semibold">Published:</span> <span className="ml-2">{new Date(book?.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-md shadow-sm">
                            <FaLayerGroup className="text-purple-500 mr-3 text-xl" />
                            <span className="font-semibold">Category:</span> <span className="ml-2 capitalize">{book?.category}</span>
                        </div>
                        {book.trending && (
                            <div className="flex items-center text-gray-700 bg-yellow-50 p-3 rounded-md shadow-sm">
                                <FaMoneyBillWave className="text-yellow-700 mr-3 text-xl" />
                                <span className="font-semibold">Status:</span> <span className="ml-2">Trending!</span>
                            </div>
                        )}
                    </div>

                    {/* Description Section */}
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{book.description}</p>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn-primary flex items-center justify-center gap-2 w-full py-3 text-xl"
                    >
                        <FiShoppingCart className="text-2xl" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            {/* You can add a "Related Books" or "Customer Reviews" section here later */}
            {/* Example:
            <div className="mt-12 text-center text-gray-500 italic">
                <p>Explore more from this category or leave a review!</p>
            </div>
            */}

            {/* Custom CSS for the pulsating animation */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.05); opacity: 0.6; }
                    100% { transform: scale(1); opacity: 0.3; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default SingleBook;
