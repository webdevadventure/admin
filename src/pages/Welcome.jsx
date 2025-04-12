import { useState, useEffect } from "react";
export default function Welcome() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Logo */}
      <div className="mb-12">
        <span className="text-gray-400 text-2xl font-semibold">
          <i className="fas fa-shapes mr-2"></i>
          NOW
        </span>
      </div>

      {/* Countdown */}
      <div className="flex space-x-8 mb-8">
        <div>
          <div className="text-8xl text-gray-300">
            {hours}
            <span className="text-2xl">h</span>
          </div>
        </div>
        <div>
          <div className="text-8xl text-gray-300">
            {minutes}
            <span className="text-2xl">m</span>
          </div>
        </div>
        <div>
          <div className="text-8xl text-gray-300">
            {seconds}
            <span className="text-2xl">m</span>
          </div>
        </div>
      </div>

      {/* Coming Soon Text */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-red-400">We are</h1>
        <h1 className="text-5xl font-bold text-red-400">Coming Soon.</h1>
      </div>

      {/* Copyright */}
      <div className="text-gray-500">
        © Copyrights CodingForIntership teams | All Rights Reserved
      </div>
    </div>
  );
}
