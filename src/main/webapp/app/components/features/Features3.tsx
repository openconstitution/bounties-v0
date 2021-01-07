import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import ApartmentIcon from '@material-ui/icons/Apartment';
import DnsIcon from '@material-ui/icons/Dns';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';

const useStyles = makeStyles((theme) => ({
  features: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(10),
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      borderColor: '#E8EAF6',
    }
  },
  primaryAction: {
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconWrapper: {
    backgroundColor: fade('#E8EAF6', .6),
  },
}));

export default function Features3(props) {
  const classes = useStyles();

  const content = {
    'badge': 'LOREM IPSUM',
    'header-p1': 'Lorem ipsum dolor',
    'header-p2': 'sit amet consectetur.',
    'description': 'Suspendisse aliquam tellus ante, porttitor mattis diam eleifend quis. Pellentesque pulvinar commodo eros sit amet finibus. Aenean et ornare erat.',
    'primary-action': 'Action',
    'col1-header': 'Lorem ipsum dolor sit amet',
    'col1-desc': 'Libero tincidunt vulputate fermentum, nisi nulla cursus turpis.',
    'col2-header': 'Lorem ipsum dolor sit amet',
    'col2-desc': 'Libero tincidunt vulputate fermentum, nisi nulla cursus turpis.',
    'col3-header': 'Lorem ipsum dolor sit amet',
    'col3-desc': 'Libero tincidunt vulputate fermentum, nisi nulla cursus turpis.',
    ...props.content
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box pt={10} pb={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <Typography variant="overline" color="textSecondary">{content['badge']}</Typography>
              <Typography variant="h3" component="h2" gutterBottom={true}>
                <Typography color="primary" variant="h3" component="span">{content['header-p1']} </Typography>
                <Typography variant="h3" component="span">{content['header-p2']}</Typography>
              </Typography>
              <Typography variant="subtitle1" component="p" color="textSecondary">{content['description']}</Typography>
              <Box mt={3}>
                <Button variant="contained" color="primary" className={classes.primaryAction}>{content['primary-action']}</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <div className={classes.features}>
                <Box display="flex" mb={5}>
                  <Box pr={5}>
                    <Avatar className={classes.iconWrapper} variant="rounded">
                      <ApartmentIcon color="primary" />
                    </Avatar>
                  </Box>
                  <div>
                    <Typography variant="h6" component="h3" gutterBottom={true}>{content['col1-header']}</Typography>
                    <Typography variant="body2" component="p" color="textSecondary">{content['col1-desc']}</Typography>
                  </div>
                </Box>
                <Box display="flex" mb={5}>
                  <Box pr={5}>
                    <Avatar className={classes.iconWrapper} variant="rounded">
                      <DnsIcon color="primary" />
                    </Avatar>
                  </Box>
                  <div>
                    <Typography variant="h6" component="h3" gutterBottom={true}>{content['col1-header']}</Typography>
                    <Typography variant="body2" component="p" color="textSecondary">{content['col1-desc']}</Typography>
                  </div>
                </Box>
                <Box display="flex">
                  <Box pr={5}>
                    <Avatar className={classes.iconWrapper} variant="rounded">
                      <TapAndPlayIcon color="primary" />
                    </Avatar>
                  </Box>
                  <div>
                    <Typography variant="h6" component="h3" gutterBottom={true}>{content['col1-header']}</Typography>
                    <Typography variant="body2" component="p" color="textSecondary">{content['col1-desc']}</Typography>
                  </div>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}