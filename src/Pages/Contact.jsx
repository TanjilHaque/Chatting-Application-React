import React from 'react'

const Contact = () => {
  return (
    <div className="bg-[#03014c] text-white min-h-screen flex justify-center items-center">
      <div className="bg-white text-black rounded-lg shadow-xl p-8 m-6 max-w-md w-full">
        <div className="text-[#5f35f5] text-center mb-6">
          <h2 className="text-3xl font-bold">Contact ChatApp Support</h2>
          <p className="text-md mt-2 text-gray-700">We're here to help!</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-800">
            Having trouble with ChatApp? Our support team is ready to assist you. Please reach out to us through the following channels. We aim to respond to all inquiries within 24-48 hours.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#5f35f5] mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.077 1.989L15 12.867M13.5 15.12l-1.578-1.578a2.25 2.25 0 01-.632-.632l-1.14-1.14a2.25 2.25 0 01-.358-.358l-1.177-1.177c-.16-.16-.367-.225-.53-.152L2.25 6.75l2.728.909l3.75-.75m6.378-1.32l1.14-.38a2.25 2.25 0 01.632-.087l.598.2a2.25 2.25 0 011.424.983l.027.027m-4.758 3.45l.225.225a2.25 2.25 0 01.632.632l.573.573a2.25 2.25 0 01.358.358l.142.142a2.25 2.25 0 01.087.087m-2.728-3.45l1.177.392a2.25 2.25 0 01.53.152l.173.058a2.25 2.25 0 01.358.358l.58.58a2.25 2.25 0 01.632.632l.142.142m-4.758 9.15l.358.358a2.25 2.25 0 01.632.632l.573.573a2.25 2.25 0 01.358.358l.142.142a2.25 2.25 0 01.087.087m-2.728-3.45l.177.059a2.25 2.25 0 01.53.152l.173.058a2.25 2.25 0 01.358.358l.58.58a2.25 2.25 0 01.632.632l.142.142" />
            </svg>
            <span className="font-semibold text-gray-800">Email Us</span>
          </div>
          <p className="text-gray-600">
            For general inquiries or technical support, please email us at:
            <a href="mailto:support@chatapp.com" className="text-[#5f35f5] hover:underline"> support@chatapp.com</a>
          </p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#5f35f5] mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 10.5-7.5 10.5S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>

            <span className="font-semibold text-gray-800">Visit Our Help Center</span>
          </div>
          <p className="text-gray-600">
            Find answers to frequently asked questions and explore troubleshooting guides in our comprehensive help center:
            <a href="#" className="text-[#5f35f5] hover:underline"> help.chatapp.com</a> (Coming Soon)
          </p>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">
            ChatApp - Connecting you, wherever you are.
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} ChatApp Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact