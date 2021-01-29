import React, {useState} from 'react';
import './bounty.scss'

// component imports
import BountyItem from '../../components/itemRow/bountyItem';
import Search from '../../components/input/search';

// material imports
import Popover from '@material-ui/core/Popover';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function Bounty() {

  const bountyData = [
    {
      header: true,
      name: "NAME",
      type: "TYPE",
      Difficulty: "DIFFICULTY",
      amount: "AMOUNT",
    },
    {
      header: false,
      name: "KGB#110",
      type: "FE",
      Difficulty: "Expert",
      amount: "$90",
    },
    {
      header: false,
      name: "KGB#111",
      type: "FE",
      Difficulty: "Intermediate",
      amount: "$40",
    },
    {
      header: false,
      name: "WKM#187",
      type: "BE",
      Difficulty: "Intermediate",
      amount: "$200",
    },
    {
      header: false,
      name: "WKM#188",
      type: "BE",
      Difficulty: "Expert",
      amount: "$250",
    },
    {
      header: false,
      name: "WKM#387",
      type: "BE",
      Difficulty: "Expert",
      amount: "$300",
    },
  ]

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
            <div>This is where the filter will go</div>
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
