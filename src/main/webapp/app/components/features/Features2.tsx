import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import StorageIcon from '@material-ui/icons/Storage';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ShutterSpeedIcon from '@material-ui/icons/ShutterSpeed';
import { Avatar, fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginBottom: theme.spacing(1),
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
    'col3-header': 'Speed',
    'col3-desc': '"Loading data" will soon be forgotten same way as floppy discs. With PiperNet algorithm, every data could travel faster than it was ever imaginable.',
    ...props.content
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box pr={2}>
                <Avatar className={classes.iconWrapper} variant="rounded">
                  <StorageIcon color="primary" />
                </Avatar>
              </Box>
              <Typography variant="h6" component="h3" gutterBottom={true}>{content['col1-header']}</Typography>
              <Typography variant="body1" component="p">{content['col1-desc']}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box pr={2}>
                <Avatar className={classes.iconWrapper} variant="rounded">
                  <VerifiedUserIcon color="primary" />
                </Avatar>
              </Box>
              <Typography variant="h6" component="h3" gutterBottom={true}>{content['col2-header']}</Typography>
              <Typography variant="body1" component="p">{content['col2-desc']}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box pr={2}>
                <Avatar className={classes.iconWrapper} variant="rounded">
                  <ShutterSpeedIcon color="primary" />
                </Avatar>
              </Box>
              <Typography variant="h6" component="h3" gutterBottom={true}>{content['col3-header']}</Typography>
              <Typography variant="body1" component="p">{content['col3-desc']}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}