import React from 'react';
import './auth-style.scss'

// component imports
import Input from '../../components/input/input';
import ButtonPrimary from '../../components/buttons/buttonPrimary';

export default function VerifyPassword() {
  return (
    <div className="auth">
      <div className="auth__form-section">

        <div className="auth__form-box">
          <h2>Verify Password</h2>

          <Input placeholder='Email' />
          <button className="btn btn__primary">
            verify
          </button>
        </div>

      </div>
      <div className="auth__image-section">
        <img src="../../../content/images/forgot-logo.png" alt="bounties-auth-image" className="auth__image-forgot" />
      </div>
    </div>
  );
}
