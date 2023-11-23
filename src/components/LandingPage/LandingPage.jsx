import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section>
      <h2>Stretch your limits. Stick to your goals</h2>
      <p>Gum Gum empowers you to seize control</p>
      <p>Transform your dreams into reality</p>
      <p>Set ambitious goals</p>
      <p>Cultivate powerful habits</p>
      <p>Stay organised with daily tasks</p>
      <p>No more drifting, It's time to navigate with purpose</p>
      <p>Ready to embark on your journey? Set sail with GumGum.</p>
      <Link to="/signup">
        <button className='btn-pink'>Sign up</button>
      </Link>
      <p>Already part of the crew?</p>
      <Link to="/loginin">
        <button className='btn-purple'>Sign in</button>
      </Link>
    </section>
  );
};

export default LandingPage;
