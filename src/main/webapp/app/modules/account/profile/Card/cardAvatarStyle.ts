import { createStyles } from '@material-ui/core';

const blackColor = '#000';

const hexToRgb = input => {
  input = input + '';
  input = input.replace('#', '');
  const hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  if (input.length === 3) {
    const first = input[0];
    const second = input[1];
    const last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  const first = input[0] + input[1];
  const second = input[2] + input[3];
  const last = input[4] + input[5];
  return parseInt(first, 16) + ', ' + parseInt(second, 16) + ', ' + parseInt(last, 16);
};

const cardAvatarStyle = createStyles({
  cardAvatar: {
    '&$cardAvatarProfile img': {
      width: '100%',
      height: 'auto',
    },
  },
  cardAvatarProfile: {
    maxWidth: '130px',
    maxHeight: '130px',
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: '0',
    boxShadow:
      '0 16px 38px -12px rgba(' +
      hexToRgb(blackColor) +
      ', 0.56), 0 4px 25px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.12), 0 8px 10px -5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.2)',
    '&$cardAvatarPlain': {
      marginTop: '0',
    },
  },
  cardAvatarPlain: {},
});

export default cardAvatarStyle;
