import React, {useState} from 'react';
import './bounty.scss';
import {bountyData} from '../../data';

// component imports
import BountyItem from '../../components/itemRow/bountyItem';
import Search from '../../components/input/search';

// material imports
import Popover from '@material-ui/core/Popover';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function Bounty() {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const filters = [
    'All', 'Latest bounties', 'Highest amount',
    'Lowest amount', 'Intermediate', 'Expert',
    'Beginner', 'FrontEnd', 'BackEnd', 'DevOps',
    'Design', 'Documentation'
  ]

  return (
    <div className="bountypage">

      <div className="bountypage__header">
        <div className="bountypage__filter">
          <button aria-describedby={id} className="btn btn__filter" onClick={handleClick}>
            Filter
            <ArrowDropDownIcon />
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className="bountypage__filters-box">
              {
                filters.map((filter, i) => {
                  return (
                    <button
                      key={i}
                      className="btn btn__outline bountypage__filter"
                    >
                      {filter}
                    </button>
                  )
                })
              }
            </div>
          </Popover>
        </div>
        <Search placeholder="search..." />
      </div>

      <div className="bountypage__table">
        {bountyData.map((bounty, i) => (
          <BountyItem
            key={i}
            header={bounty.header}
            Name={bounty.name}
            Type={bounty.type}
            Difficulty={bounty.Difficulty}
            Amount={bounty.amount}
            onclick={() => { }}
          />
        ))}
      </div>
    </div>
  );
}
