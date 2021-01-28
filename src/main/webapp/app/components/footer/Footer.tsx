import React from 'react';
import './footer.scss'
import { Copyright } from '@material-ui/icons';

export default function Footer() {

  return (
    <div className="footer">
      <p>
        Copyright <Copyright /> Bounties 2021.
      </p>
    </div>
  );
}