import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import MessageModal from '../../../components/MessageModal'; // Corrected import path for MessageModal

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, { isLoading, isError }] = useAddBookMutation();
    const [imageFileName, setimageFileName] = useState('');

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
        const newBookData = {
            ...data,
            coverImage: imageFileName
        };
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book Successfully Cataloged!", // Creative new title
                text: "Your literary masterpiece has been added to the collection. Ready for readers!", // Creative new text
                icon: "success",
                showCancelButton: false, // Often not needed for a success message
                confirmButtonColor: "#4F46E5", // Using a primary color from our theme (indigo)
                cancelButtonColor: "#d33", // Keep default red for cancel if used
                confirmButtonText: "View Dashboard" // Creative new button text
            }).then((result) => {
                if (result.isConfirmed) {
                    // Optional: navigate to dashboard or manage books page
                    // navigate("/dashboard/manage-books"); // Uncomment if you want to navigate
                }
            });
            reset();
            setimageFileName('');
            setimageFile(null);
        } catch (error) {
            console.error("Failed to add book:", error);
            // Replaced alert with MessageModal
            showMessageModal("Failed to add book. Please check your input and try again.", 'error');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    };

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

            {/* Form starts here */}
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                {/* Reusable Input Field for Title */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                {/* Reusable Textarea for Description */}
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                {/* Reusable Select Field for Category */}
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                        // Add more options as needed
                    ]}
                    register={register}
                />

                {/* Trending Checkbox */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                {/* Old Price */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                {/* New Price */}
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                {/* Cover Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                    {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {
                        isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
                    }
                </button>
            </form>

            {/* Message Modal for errors */}
            <MessageModal message={modalMessage} type={modalType} onClose={hideMessageModal} />
        </div>
    );
};

export default AddBook;
