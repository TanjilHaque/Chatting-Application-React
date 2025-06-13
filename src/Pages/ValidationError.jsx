// components/Error404.jsx
//ValidationError.jsx

import React from 'react';


const ValidationError = () => {
    const handleGoToMail = ()=>{
        window.open("https://mail.google.com/mail/u/0/", "_blank")
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl mt-4 text-gray-600">Oops! Page not found.</p>
      <p className="text-md text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <div
        onClick={handleGoToMail}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
      >
        Verify your Email
      </div>
    </div>
  );
};

export default ValidationError;
