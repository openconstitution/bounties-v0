/* eslint-disable react/jsx-key */
import React from 'react';
import Container from '@material-ui/core/Container';

export default function Structure(props) {
  const buckets = {
    '1': (Array.isArray(props.bucket1) ? props.bucket1 : [])
  }

  return (
    <Container>
      {buckets['1'].map(component => <React.Fragment>{component}</React.Fragment>)} 
    </Container>
  );
}