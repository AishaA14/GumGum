import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSignInAlt } from 'react-icons/fa'; 

const LandingPage = () => {
  return (
    <section className="bg-cyan text-dark-gray min-h-screen flex flex-col justify-center items-center p-8">
      <h2 className="text-4xl font-bold mb-4">Stretch your limits. Stick to your goals</h2>
      <p className="mb-4">Gum Gum empowers you to seize control</p>
      <p className="mb-4">Transform your dreams into reality</p>
      <p className="mb-4">Set ambitious goals</p>
      <p className="mb-4">Cultivate powerful habits</p>
      <p className="mb-4">Stay organized with daily tasks</p>
      <p className="mb-4">No more drifting, It's time to navigate with purpose</p>
      <p className="mb-4">Ready to embark on your journey? Set sail with GumGum.</p>
      <Link to="/signup">
      <button className="bg-pink btn-pink">
        Sign up <FaArrowRight className="inline ml-2" />
      </button>       </Link>
     <p className="mt-4 text-black-300">Already part of the crew?</p>
     <Link to="/login">
     <button className="bg-purple btn-purple">
      Sign in <FaSignInAlt className="inline ml-2" />
     </button>
     </Link>
    </section>
  );
};
export default LandingPage;
