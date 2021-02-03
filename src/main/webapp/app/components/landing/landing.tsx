import React from 'react';
import './landing.scss'

// component imports 
import NavBar from '../navbar/NavBar';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing__nav-container">
        <NavBar />
      </div>
      <div className="landing__main">
        <div className="landing__text">
          <h2>Welcome to Bounties</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Modi aut vitae eos iure 
            esse quidem recusandae quas.
          </p>

          <button className="btn btn__round btn__landing">
            Explore Bounties
          </button>
          
        </div>

        <div className="landing__image-box">
          <img
            src="../../../content/images/Hero-image.png"
            alt="Hero Image"
            className="landing__image"
          />
        </div>
        
      </div>
    </div>
  );
}
