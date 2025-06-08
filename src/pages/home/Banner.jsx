import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import bannerImg from "../../assets/banner.png";
import { Link } from 'react-router-dom'; // Keep Link in case you decide to add other links later, though not used for a button here

const Banner = () => {
  const taglines = [
    "Dive into epic stories.",
    "Uncover hidden gems.",
    "Expand your horizons.",
    "Discover new worlds.",
    "Your next chapter begins here."
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000); // Change tagline every 3 seconds

    return () => clearInterval(interval); // Clean up the interval
  }, [taglines.length]);

  return (
    // Changed background to a gradient and added more vertical padding
    <div className='flex flex-col md:flex-row-reverse py-20 justify-between items-center gap-12 px-4 md:px-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg'>
      {/* Right side (Image) */}
      <div className='md:w-1/2 w-full flex items-center md:justify-end'>
        <img 
          src={bannerImg} 
          alt="Book Banner" 
          // Added subtle animation and enhanced shadow for the image
          className="max-w-full h-auto rounded-lg shadow-2xl transform transition-transform duration-500 ease-in-out hover:scale-105" 
        /> 
      </div>
      
      {/* Left side (Text content) */}
      <div className='md:w-1/2 w-full text-center md:text-left'> {/* Centered text on small screens */}
        <h1 className='text-gray-900 md:text-6xl text-4xl font-extrabold mb-6 leading-tight'> {/* Enhanced heading style */}
          New Releases This Week
        </h1>
        <p className='text-gray-700 text-lg mb-8 max-w-lg mx-auto md:mx-0'> {/* Styled paragraph */}
          It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
        </p>

        {/* Removed button and added dynamic text */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4"> {/* Layout for new elements */}
          <p className="text-xl font-semibold text-indigo-700"> {/* Styled for emphasis */}
            {taglines[currentTaglineIndex]}
          </p>
          <p className="text-sm text-gray-500 italic animate-pulse"> {/* Small animated text */}
            Your next adventure awaits!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
