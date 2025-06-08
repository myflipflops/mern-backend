import React, { useState, useEffect } from 'react';
import { FaBoxes, FaDollarSign, FaShoppingCart, FaBook, FaTags } from 'react-icons/fa'; // Icons for metrics and new sections
import { GiOpenBook } from "react-icons/gi"; // Another book icon
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im"; // Quote icons

const Dashboard = () => {
    // Dummy data for demonstration. Replace with actual data from your backend.
    const metrics = [
        { id: 1, name: 'Products', value: '1,234', icon: FaBoxes, color: 'text-blue-500', bg: 'bg-blue-100' },
        { id: 2, name: 'Total Sales', value: '₹56,789', icon: FaDollarSign, color: 'text-green-500', bg: 'bg-green-100' },
        { id: 3, name: 'Total Orders', value: '987', icon: FaShoppingCart, color: 'text-purple-500', bg: 'bg-purple-100' },
    ];

    const topGenres = [
        { name: 'Fiction', count: 450 },
        { name: 'Science Fiction', count: 320 },
        { name: 'Fantasy', count: 280 },
        { name: 'Mystery', count: 210 },
        { name: 'Biography', count: 180 },
    ];

    const recentlyAddedBooks = [
        { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides' },
        { id: 2, title: 'Project Hail Mary', author: 'Andy Weir' },
        { id: 3, title: 'Where the Crawdads Sing', author: 'Delia Owens' },
        { id: 4, title: 'Dune', author: 'Frank Herbert' },
    ];

    const quotes = [
        {
            text: "A good book has no end.",
            author: "— Unknown"
        },
        {
            text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
            author: "— Dr. Seuss"
        },
        {
            text: "Books are a uniquely portable magic.",
            author: "— Stephen King"
        },
        {
            text: "So many books, so little time.",
            author: "— Frank Zappa"
        },
        {
            text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
            author: "— George R.R. Martin"
        }
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(interval);
    }, [quotes.length]); // Dependency array to re-run effect if quotes change

    return (
        <div className="space-y-8 p-4 md:p-0"> {/* Added some padding for overall content */}
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {metrics.map((metric) => (
                    <div 
                        key={metric.id} 
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
                    >
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{metric.name}</p>
                            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{metric.value}</h2>
                        </div>
                        <div className={`p-3 rounded-full ${metric.bg}`}>
                            <metric.icon className={`w-8 h-8 ${metric.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Creative Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Genres Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <FaTags className="w-5 h-5 mr-2 text-indigo-500" />
                        Top Selling Genres
                    </h3>
                    <ul>
                        {topGenres.map((genre, index) => (
                            <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                <span className="text-gray-700 font-medium">{genre.name}</span>
                                <span className="text-indigo-600 font-semibold">{genre.count} books</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recently Added Books Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-fade-in delay-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <GiOpenBook className="w-6 h-6 mr-2 text-red-500" />
                        Recently Added Books
                    </h3>
                    <div className="space-y-3">
                        {recentlyAddedBooks.map((book) => (
                            <div key={book.id} className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200">
                                <FaBook className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-800">{book.title}</p>
                                    <p className="text-sm text-gray-600">{book.author}</p> {/* Removed date */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Animated Quote Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg shadow-xl text-center flex flex-col justify-center items-center min-h-[150px] relative overflow-hidden animate-fade-in delay-200">
                <ImQuotesLeft className="absolute top-4 left-4 text-white opacity-20 text-5xl" />
                <ImQuotesRight className="absolute bottom-4 right-4 text-white opacity-20 text-5xl" />
                <blockquote key={currentQuoteIndex} className="text-2xl italic font-serif relative z-10 animate-quote-fade max-w-2xl">
                    "{quotes[currentQuoteIndex].text}"
                </blockquote>
                <p className="mt-4 text-lg font-medium relative z-10 animate-quote-fade-author">
                    {quotes[currentQuoteIndex].author}
                </p>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0; /* Start hidden */
                }

                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }

                @keyframes quote-fade {
                    0% { opacity: 0; transform: translateY(10px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }

                .animate-quote-fade {
                    animation: quote-fade 5s ease-in-out forwards; /* Matches interval */
                }
                .animate-quote-fade-author {
                    animation: quote-fade 5s ease-in-out forwards; /* Matches interval */
                    animation-delay: 0.2s; /* Slightly delayed for effect */
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
