import React from 'react';
import './item.scss'

export default function BountyItem({header, onclick, Name, Type, Difficulty, Amount}) {
  return (
    <div
      className={`bountyitem ${header && `headerClass`}`}
      role='presentation'
      onClick={onclick}
    >
      <p>{Name}</p>
      <p>{Type}</p>
      <p>{Difficulty}</p>
      <p>{Amount}</p>
    </div>
  );
}
