import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import MessageModal from '../../components/MessageModal'; // Import MessageModal
import { FaShoppingCart, FaUser, FaPhone, FaMapMarkerAlt, FaGlobe, FaCity, FaMailBulk } from 'react-icons/fa'; // Icons for form fields

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    // Ensure totalPrice is calculated correctly and is a number before toFixed
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice || 0), 0).toFixed(2);
    const { currentUser } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('info');

    const showMessageModal = (msg, type = 'info') => {
        setModalMessage(msg);
        setModalType(type);
        setModalVisible(true);
    };

    const hideMessageModal = () => {
        setModalVisible(false);
        setModalMessage('');
    };

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Order Confirmed!", // Creative new title
                text: "Your order has been successfully placed. Get ready to dive into your new books!", // Creative new text
                icon: "success", // Changed icon to success
                showCancelButton: false, // Removed cancel button for success
                confirmButtonColor: "#4F46E5", // Consistent primary color
                confirmButtonText: "View My Orders" // Creative new button text
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/orders"); // Navigate to orders page
                }
            });
        } catch (error) {
            console.error("Error placing an order:", error);
            showMessageModal("Failed to place your order. Please check your details and try again.", 'error'); // Using MessageModal
        }
    };

    if (isLoading) return <div>Loading....</div>; // Consider using your Loading component here
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
                <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                    <FaShoppingCart className="mx-auto h-20 w-20 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty!</h2>
                    <p className="text-gray-600 mb-6">Add some books to proceed to checkout.</p>
                    <Link to="/" className="btn-primary">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 border border-gray-200">
                    <div className="mb-8">
                        <h2 className="font-bold text-3xl text-gray-800 mb-3">Cash On Delivery</h2>
                        <div className="flex items-center text-gray-700 text-lg mb-2">
                            <span className="font-semibold mr-2">Total Price:</span>
                            <span className="text-indigo-700 font-bold text-2xl">₹{totalPrice}</span> {/* Changed $ to ₹ and added creative styling */}
                        </div>
                        <p className="text-gray-600 text-md">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 gap-y-6 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-1 text-gray-600">
                                <p className="font-medium text-xl mb-2">Personal Details</p>
                                <p className="text-gray-500">Please ensure all fields are accurately filled.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-2">
                                    <div className="md:col-span-1">
                                        <label htmlFor="full_name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register("name", { required: true })}
                                                type="text" name="name" id="name" placeholder="Your full name"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                            />
                                            {errors.name && <span className="text-red-500 text-xs mt-1">Full Name is required</span>}
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                                        <div className="relative">
                                            <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email" name="email" id="email"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 cursor-not-allowed"
                                                defaultValue={currentUser?.email}
                                                disabled
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register("phone", { required: true })}
                                                type="tel" name="phone" id="phone" placeholder="+91 12345 67890"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                            />
                                            {errors.phone && <span className="text-red-500 text-xs mt-1">Phone Number is required</span>}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address / Street</label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register("address", { required: true })}
                                                type="text" name="address" id="address" placeholder="Your street address"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                            />
                                            {errors.address && <span className="text-red-500 text-xs mt-1">Address is required</span>}
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="city" className="block text-gray-700 font-medium mb-1">City</label>
                                        <div className="relative">
                                            <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register("city", { required: true })}
                                                type="text" name="city" id="city" placeholder="City"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                            />
                                            {errors.city && <span className="text-red-500 text-xs mt-1">City is required</span>}
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="state" className="block text-gray-700 font-medium mb-1">State / Province</label>
                                        <div className="relative">
                                            <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register("state", { required: true })}
                                                type="text" name="state" id="state" placeholder="State / Province"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                            />
                                            {errors.state && <span className="text-red-500 text-xs mt-1">State is required</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="md:col-span-1">
                                        <label htmlFor="zipcode" className="block text-gray-700 font-medium mb-1">Zipcode</label>
                                        <div className="relative">
                                            <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register("zipcode", { required: true })}
                                                type="text" name="zipcode" id="zipcode" placeholder="e.g., 411001"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                            />
                                            {errors.zipcode && <span className="text-red-500 text-xs mt-1">Zipcode is required</span>}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
                                        <div className="relative">
                                            <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register("country", { required: true })}
                                                name="country" id="country" placeholder="Country"
                                                className="h-10 border border-gray-300 mt-1 rounded-lg px-10 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                            />
                                            {errors.country && <span className="text-red-500 text-xs mt-1">Country is required</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="md:col-span-full mt-4">
                                        <div className="inline-flex items-center">
                                            <input
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                type="checkbox" name="terms_agree" id="terms_agree"
                                                className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                            />
                                            <label htmlFor="terms_agree" className="ml-2 text-gray-700">
                                                I agree to the <Link to="/terms" className='underline underline-offset-2 text-indigo-600 hover:text-indigo-800'>Terms & Conditions</Link> and <Link to="/policy" className='underline underline-offset-2 text-indigo-600 hover:text-indigo-800'>Shopping Policy.</Link>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={!isChecked}
                                className="bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 text-lg"
                            >
                                Place Your Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <MessageModal message={modalMessage} type={modalType} onClose={hideMessageModal} />
        </section>
    );
};

export default CheckoutPage;
