import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';
import { RiShoppingCartLine, RiDeleteBinLine, RiBookOpenLine } from 'react-icons/ri'; // Added icons for flair

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    // Calculate total price, ensure it's a number for calculations before toFixed
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice || 0), 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                        <RiShoppingCartLine className="text-indigo-600 mr-3 text-3xl" />
                        Your Shopping Cart
                    </h2>
                    {cartItems.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClearCart}
                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-all duration-200 shadow-md"
                        >
                            <RiDeleteBinLine className="mr-2" />
                            Clear Cart
                        </button>
                    )}
                </div>

                {cartItems.length > 0 ? (
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((product) => (
                                <li key={product?._id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                                        <img
                                            alt={product?.title}
                                            src={`${getImgUrl(product?.coverImage)}`}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to={`/books/${product?._id}`} className="hover:text-indigo-600 transition-colors duration-200">{product?.title}</Link>
                                                </h3>
                                                <p className="ml-4 text-xl font-bold text-indigo-700">₹{product?.newPrice}</p> {/* Changed $ to ₹ */}
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 capitalize">
                                                <strong>Category: </strong>{product?.category}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                            <p className="text-gray-600 font-medium">Qty: 1</p> {/* Made Qty more prominent */}

                                            <div className="flex">
                                                <button
                                                    onClick={() => handleRemoveFromCart(product)}
                                                    type="button"
                                                    className="font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <RiBookOpenLine className="mx-auto h-20 w-20 text-gray-400 opacity-70 mb-4 animate-bounce-slow" />
                        <p className="text-xl text-gray-600 font-medium">Your cart is feeling a bit empty!</p>
                        <p className="text-md text-gray-500 mt-2">Start exploring our collection to find your next great read.</p>
                        <Link 
                            to="/" 
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-8">
                        <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
                            <p>Subtotal</p>
                            <p className="text-indigo-700">₹{totalPrice}</p> {/* Changed $ to ₹ and added indigo color */}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6 flex justify-center">
                            <Link
                                to="/checkout"
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 transition-colors duration-200 w-full md:w-auto"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                                or Continue Shopping <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS for empty cart animation */}
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

export default CartPage;
