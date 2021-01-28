import React from 'react';
import './button.scss';

export default function ButtonOutline({ onclick, title }) {
  return (
    <div className="buttonOutline">
      <button onClick={onclick} className="buttonOutline__box">{title}</button>
    </div>
  );
}
