import React from 'react';
import './auth-style.scss'

// component imports
import Input from '../../components/input/input';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="auth">
      <div className="auth__form-section">

        <div className="auth__form-box">
          <h2>Sign Up</h2>

          <Input placeholder='Email' />
          <Input placeholder='Username' />
          <Input placeholder='Password' />
          <button className="btn btn__primary">
            Sign up
          </button>
          
          <div className="auth__forgot">
            <p>Forgot Password ?</p>
          </div>
        </div>

        <div className="auth__sign-box">
          <p>
            Already have an account?
          <Link to="/sign-in" className="auth__sign-link">Sign in</Link>
          </p>
        </div>

      </div>
      <hr className="auth__section-separator" />
      <div className="auth__image-section">
        <div className="auth__text-box">
          <h3>Welcome to Bounties</h3>
          <p>Enter valid user credentials to access the bounties platform</p>
        </div>
        <img src="../../../content/images/auth-image@2x.png" alt="bounties-auth-image" className="login__image"/>
      </div>
    </div>
  );
}
