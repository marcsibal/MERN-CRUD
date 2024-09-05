import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.png'; 

function Home() {
  const calculateTimeRemaining = () => {
    const targetDate = new Date('2024-12-31T23:59:59'); //Target Date
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <div 
      className="bg-customYellow w-full h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
          <p className="text-lg text-gray-600 mb-8">We're working hard to bring you something amazing. Stay tuned!</p>
          <div className="flex justify-center gap-4">
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <span className="text-3xl font-bold text-gray-800 block">{timeRemaining.days}</span>
              <span className="text-sm text-gray-600">Days</span>
            </div>
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <span className="text-3xl font-bold text-gray-800 block">{timeRemaining.hours}</span>
              <span className="text-sm text-gray-600">Hours</span>
            </div>
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <span className="text-3xl font-bold text-gray-800 block">{timeRemaining.minutes}</span>
              <span className="text-sm text-gray-600">Minutes</span>
            </div>
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <span className="text-3xl font-bold text-gray-800 block">{timeRemaining.seconds}</span>
              <span className="text-sm text-gray-600">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
