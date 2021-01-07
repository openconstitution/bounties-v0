import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  stepper: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: 0,
      flexDirection: 'column',
      alignItems: 'start'
    }
  },
  primaryAction: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    }
  },
  step: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    }
  },
  container: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2)
    }
  },
  media: {
    height: '256px',
  }
}));

export const HowItWorks = (props) => {
  const classes = useStyles();

  const content = {
    'header': 'PiperNet Setup',
    'step1': 'Move Data',
    'step2': 'Integrate Software',
    'step3': 'Ongoing Support',
    'subheader': 'Let\'s get you connected!',
    'description': 'We\'ve designed a simple process for companies migrating to PiperNet. Here\'s how it works.',
    'image': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
    'primary-action': 'Start Setup!',
    ...props.content
  };

  return (
    <section>
      <Box pt={8} pb={10}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={5}>
            <Typography variant="h4" component="h2" gutterBottom={true}>{content['header']}</Typography>
          </Box>
          <Box bgcolor="background.paper" className={classes.container}>
            <Stepper activeStep={0} className={classes.stepper}>
              <Step key={content['step1']} className={classes.step}>
                <StepLabel>{content['step1']}</StepLabel>
              </Step>
              <Step key={content['step12']} className={classes.step}>
                <StepLabel>{content['step2']}</StepLabel>
              </Step>
              <Step key={content['step3']}>
                <StepLabel>{content['step3']}</StepLabel>
              </Step>
            </Stepper>
            <Box p={4}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box display="flex" height="100%">
                    <Box my="auto">
                      <Typography variant="h4" component="h2" gutterBottom={true}>{content['subheader']}</Typography>
                      <Typography variant="body1" color="textSecondary" paragraph={true}>{content['description']}</Typography>
                      <Button variant="contained" color="primary" className={classes.primaryAction}>{content['primary-action']}</Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardActionArea href="#">
                      <CardMedia className={classes.media} image={content['image']} />
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </section>
  );
}

export default HowItWorks;
