import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  switchOrder1: {
    [theme.breakpoints.up('md')]: {
      order: 1,
    }
  },
  switchOrder0: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
      order: 0,
    }
  },
  stepContainer: {
    marginBottom: theme.spacing(4)
  },
  media: {
    height: '256px',
  },
}));

export default function HowItWorks(props) {
  const classes = useStyles();
  
  const content = {
    '02_header': 'PiperNet Setup',
    '02_description': 'We\'ve designed a simple process for companies migrating to PiperNet. Here\'s how it works.',
    'image1': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    'step1': 'Move Data',
    'step1-desc': 'Using our Piper Assistant application, you can move your data to be stored our decentralized network with simple drag & drop.',
    'image2': 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    'step2': 'Integrate Software',
    'step2-desc': 'We want to make sure that you can keep using the software that you use to manage your business.',
    'image3': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    'step3': 'Ongoing Support',
    'step3-desc': 'As with all innovative technologies, sometimes unpredictable things will happen, and you can always count on our support to solve issues for you.',
    ...props.content
  };

  return (
    <section>
      <Container maxWidth="sm">
        <Box pt={8} textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom={true}>{content['02_header']}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{content['02_description']}</Typography>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box pt={8} pb={10}>
          <Grid container spacing={6} className={classes.stepContainer}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea href="#">
                  <CardMedia className={classes.media} image={content['image1']} />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" height="100%">
                <Box my="auto">
                  <Typography variant="h2" component="h3">01</Typography>
                  <Typography variant="h4" component="h2" gutterBottom={true}>{content['step1']}</Typography>
                  <Typography variant="body1" color="textSecondary" paragraph={true}>{content['step1-desc']}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6} className={classes.stepContainer}>
            <Grid item xs={12} md={6} className={classes.switchOrder1}>
              <Card>
                <CardActionArea href="#">
                  <CardMedia className={classes.media} image={content['image2']} />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} className={classes.switchOrder0}>
              <Box display="flex" height="100%">
                <Box my="auto">
                  <Typography variant="h2" component="h3">02</Typography>
                  <Typography variant="h4" component="h2" gutterBottom={true}>{content['step2']}</Typography>
                  <Typography variant="body1" color="textSecondary" paragraph={true}>{content['step2-desc']}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea href="#">
                  <CardMedia className={classes.media} image={content['image3']} />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" height="100%">
                <Box my="auto">
                  <Typography variant="h2" component="h3">03</Typography>
                  <Typography variant="h4" component="h2" gutterBottom={true}>{content['step3']}</Typography>
                  <Typography variant="body1" color="textSecondary" paragraph={true}>{content['step3-desc']}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}