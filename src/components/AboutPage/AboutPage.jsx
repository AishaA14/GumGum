import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-purple min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
      <div className="max-w-2xl p-6 bg-white shadow-md rounded-md text-gray-800">
      <div className="max-w-2xl p-6 bg-white shadow-md rounded-md text-gray-800">
        <h1 className="text-blue1 text-2xl font-bold text-purple-500 mb-4">Transform Big Dreams into Daily Victories</h1>
        <p className="text-gray-600 mb-8">
          Welcome to GumGum, where we believe that every colossal achievement begins with small, intentional actions.
          Inspired by the philosophy of "Atomic Habits" by James Clear, our app empowers you to turn ambitious dreams into tangible, daily victories.
        </p>
        </div>
        <div className="max-w-2xl p-6 bg-white shadow-md rounded-md text-gray-800">
        <h2 className="text-2xl font-bold text-purple-500 mb-4">The GumGum Difference</h2>
        <p className="text-gray-600 mb-8">
          <span className="text-pink-500">Micro Habits, Macro Results:</span> GumGum is not just another goal-setting app; it's a transformative journey. We understand that grand ambitions can be overwhelming. That's why we focus on the magic of micro habits – those tiny, consistent actions that, when compounded, lead to monumental success.
        </p>
        </div>
        <div className="max-w-2xl p-6 bg-white shadow-md rounded-md text-gray-800">
        <p className="text-gray-600 mb-8">
          <span className="text-pink-500">Break It Down, Build It Up:</span> Gone are the days of staring at lofty goals from a distance. With GumGum, we encourage you to break down your aspirations into bite-sized, achievable habits. These micro habits serve as the building blocks for your dreams, making progress tangible and sustainable.
        </p>
        </div>
        <div className="max-w-2xl p-6 bg-white shadow-md rounded-md text-gray-800">
        <p className="text-gray-600 mb-8">
          <span className="text-pink-500">Inspired by "Atomic Habits":</span> Our approach is deeply influenced by the wisdom of James Clear, author of "Atomic Habits." Just as atoms are the fundamental units of matter, micro habits are the building blocks of personal transformation. Clear's philosophy resonates at the core of GumGum, shaping a path to success that is both practical and profound.
        </p>
        </div>

        <div className="max-w-2xl p-6 bg-white shadow-md rounded-md text-gray-800">
        <p className="text-gray-600 mb-8">
          <span className="text-pink-500">Visualization of Success:</span> Witness your progress come to life with our intuitive visualization tools. Track completed tasks, visualize your habit streaks, and watch as your micro efforts accumulate into a remarkable journey. GumGum provides a visual roadmap to your success.
        </p>
        </div>
        <div className="max-w-2xl p-6 bg-white shadow-md rounded-md text-gray-800">
        <p className="text-gray-600 mt-8">
          Ready to embark on your micro habit journey?{' '}
          <a href="/login" className="text-cc90ff hover:underline">
            <span className='text-blue1'>Login to begin</span>
          </a>{' '}
          today and transform your dreams into daily triumphs.
        </p>
        </div>
      </div>
    </div>
  );
};


