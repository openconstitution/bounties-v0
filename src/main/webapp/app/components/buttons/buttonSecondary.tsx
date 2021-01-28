import React from 'react';
import './button.scss';

export default function ButtonSecondary({ onclick, title }) {
  return (
    <div className="buttonsecondary">
      <button onClick={onclick} className="buttonsecondary__box">{title}</button>
    </div>
  );
}
