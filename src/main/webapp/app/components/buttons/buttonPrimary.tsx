import React from 'react';
import './button.scss';

export default function ButtonPrimary({ onclick, title }) {
  return (
    <div className="buttonprimary">
      <button onClick={onclick} className="buttonprimary__box">{title}</button>
    </div>
  );
}
