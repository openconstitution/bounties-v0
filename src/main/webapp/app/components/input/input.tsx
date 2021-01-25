import React from 'react';
import './input.scss';

export default function Input({ placeholder }) {
  return (
    <div className="input">
      <input type="text" placeholder={placeholder} className="input__box"/>
    </div>
  );
}
