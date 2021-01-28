import React from 'react';
import './card.scss';

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PaymentIcon from '@material-ui/icons/Payment';
import GroupWorkIcon from '@material-ui/icons/GroupWork';


export default function AboutCard() {

  return (
    <div className="aboutCard">
      <div className="aboutCard__image-box">
        <LibraryBooksIcon />
      </div>
      <h2>Lorem Ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Provident amet consectetur fugit accusamus 
        tempore voluptatum consequatur. 
      </p>
    </div>
  );
}
