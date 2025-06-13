
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#03014c] text-white flex items-center justify-center p-6">
      <div className="max-w-3xl text-center bg-[#5f35f5] p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChatApp</h1>
        <p className="text-lg leading-relaxed">
          ChatApp is a seamless and secure chatting application that connects people worldwide.
          Whether you want to stay in touch with friends, collaborate with colleagues, or meet new
          people, ChatSphere provides an intuitive and user-friendly experience.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white text-[#03014c] p-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg">Real-Time Messaging</h2>
            <p className="text-sm">Instant, lag-free conversations with end-to-end encryption.</p>
          </div>
          <div className="bg-white text-[#03014c] p-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg">User-Friendly UI</h2>
            <p className="text-sm">Minimalistic and intuitive design for effortless chatting.</p>
          </div>
          <div className="bg-white text-[#03014c] p-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg">Secure & Private</h2>
            <p className="text-sm">Advanced security features to keep your chats safe.</p>
          </div>
          <div className="bg-white text-[#03014c] p-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg">Cross-Platform</h2>
            <p className="text-sm">Access your messages from any device, anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;