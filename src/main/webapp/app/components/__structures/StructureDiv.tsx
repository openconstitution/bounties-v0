/* eslint-disable react/jsx-key */
import React from 'react';

export default function Structure(props) {
  const buckets = {
    '1': (Array.isArray(props.bucket1) ? props.bucket1 : [])
  }

  return (
    <div>
      {buckets['1'].map(component => <React.Fragment>{component}</React.Fragment>)} 
    </div>
  );
}