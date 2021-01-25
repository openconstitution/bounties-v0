import React from 'react';
import './auth-style.scss'

//component imports
import Input from '../../components/input/input';
import ButtonPrimary from '../../components/buttons/buttonPrimary';

export default function Login() {
  return (
    <div className="auth">
      <div className="auth__form-section"> 

        <div className="auth__form-box">
          <h2>Sign In</h2>

          <Input placeholder='Email' />
          <Input placeholder='Password' />
          <ButtonPrimary title='Sign in' onclick={() => { }} />

          <div className="auth__forgot">
            <p>Forgot Password ?</p>
          </div>
        </div>
        
        <div className="auth__sign-box">
          <p>
            Don&apos;t have an account?
          <span className="auth__sign-link">Sign up</span>
          </p>
        </div>

      </div>
      <div className="auth__image-section">
        <div className="auth__text-box">
          <h3>Welcome to Bounties</h3>
          <p>Enter valid user credentials to access the bounties platform</p>
        </div>
        <img src="../../../content/images/auth-image@2x.png" alt="bounties-auth-image" className="login__image" />
      </div>
    </div>
  );
}
