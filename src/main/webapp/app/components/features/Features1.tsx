import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import StorageIcon from '@material-ui/icons/Storage';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  iconWrapper: {
    backgroundColor: fade('#E8EAF6', .6),
  },
}));

export default function Features(props) {
  const classes = useStyles();

  const content = {
    'col1-header': 'Accessibility',
    'col1-desc': 'Ever worried that you won\'t be able to access your data in some places? Nevermore. With PiperNet your connection has no borders.',
    'col2-header': 'Secure',
    'col2-desc': 'Have you ever heard about "not putting all of your eggs in one basket"? Well, with PiperNet you can actually put all your eggs in millions of baskets.',
    ...props.content
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box mb={2} display="flex" alignItems="center">
                <Box pr={2}>
                  <Avatar className={classes.iconWrapper} variant="rounded">
                    <StorageIcon color="primary" />
                  </Avatar>
                </Box>
                <Typography variant="h6" component="h3">{content['col1-header']}</Typography>
              </Box>
              <Typography variant="body1" component="p">{content['col1-desc']}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mb={2} display="flex" alignItems="center">
                <Box pr={2}>
                  <Avatar className={classes.iconWrapper} variant="rounded">
                    <VerifiedUserIcon color="primary" />
                  </Avatar>
                </Box>
                <Typography variant="h6" component="h3">{content['col2-header']}</Typography>
              </Box>
              <Typography variant="body1" component="p">{content['col2-desc']}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}