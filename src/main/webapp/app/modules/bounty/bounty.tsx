import React from 'react';
import './bounty.scss';

export default function Bounty() {
  return (
    <div className="bounty">

      <div className="bounty__container">
        <div className="bounty__header">
          <p>#KGB204</p>
          <p>Keegeb Inc</p>
          <p>10 days ago</p>
        </div>

        <div className="bounty__body">
          <h3>Bounty Description</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Aliquam nobis unde laboriosam, aliquid accusamus eos 
            id doloremque in ullam omnis reprehenderit, impedit 
            tempore eligendi illo? Eligendi enim laudantium 
            cupiditate deleniti! Lorem ipsum dolor sit amet 
            consectetur adipisicing elit. 
            Aliquam nobis unde laboriosam, aliquid accusamus eos 
            id doloremque in ullam omnis reprehenderit, impedit 
            tempore eligendi illo? Eligendi enim laudantium 
            cupiditate deleniti!
          </p>
        </div>

        <div className="bounty__footer">
          <p>
            <span>Job Type</span>
            Front-end
          </p>
          <p>
            <span>Bounty Difficulty</span>
            Intermediate
          </p>
          <p>
            <span>Bounty Amount</span>
            200$
          </p>
          <p>
            <span>Bounty Duration</span>
            Approx. 1 week
          </p>
          <p>
            <span>payment Method</span>
            Stable coin
          </p>
          <p>
            <span>payment Method</span>
            Stable coin
          </p>
        </div>
      </div>

    </div>
  );
}
