import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';

export interface IInputContentProps {
  description?: string;
  inputs?: any
}

export const InputContent = (props: IInputContentProps) => {
  return (
    <Grid
        container
        justify="center"
        alignItems="center"
        spacing={3}>
      <Grid
          container
          justify="center"
          item xs={3}>
        <div>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </div>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid
          container
          justify="space-evenly"
          item xs={6}>
        {props.inputs}
      </Grid>
    </Grid>
  );
}
