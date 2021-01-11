/* eslint-disable react/jsx-key */
import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Step, StepLabel, Stepper, Table, TableCell, TableRow, TableBody, TableHead, TextField } from '@material-ui/core';
import StripeForm from '../__forms/StripeForm';
import BountyForm from '../__forms/BountyForm';
import BountySummary from '../__summaries/BountySummary';

const useStyles = makeStyles((theme) => ({
  stepper: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: 0,
      flexDirection: 'row',
      alignItems: 'start'
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

export default function BountyStepper(props) {
	const classes = useStyles();
	
	const [activeStep, setActiveStep] = React.useState(1);
	const [bountyData, setBountyData] = React.useState(null);
	const [paymentData, setPaymentData] = React.useState(null);

  const content = {
		'ages': [{value: 10, text: 'Ten'}, {value: 20, text: 'Twenty'}, {value: 30, text: 'Thirty'}],
    'badge': 'LOREM IPSUM',
    'header-p1': 'Lorem ipsum dolor',
    'header-p2': 'sit amet consectetur.',
    'description': 'Suspendisse aliquam  tellus ante, porttitor mattis diam eleifend quis. Pellentesque pulvinar commodo eros sit amet finibus. Aenean et ornare erat.',
		'primary-action': 'Next',
		'secondary-action': 'Back',
		
    'step1': 'Bounty Details',
    'step2': 'Funding',
		'step3': 'Summary',
		'step3-action': 'Submit',
		
    ...props.content
	};

	const getStepContent = (stepIndex: number) => {
		switch (stepIndex) {
			case 0:
				return (
					<BountyForm
						primaryAction={{
							text: 'Next',
							onClick: () => setActiveStep(1),
						}}
						data={props.content.bounty}
						setData={setBountyData}
					/>
				)
			case 1:
				return (
				<Box ml={12} mr={12}>
					<StripeForm
						primaryAction={{
							text: 'Next',
							onClick: () => setActiveStep(2)
						}}
						secondaryAction={{
							text: 'Back',
							onClick: () => setActiveStep(0)
						}}
						data={props.content.bounty}
						setData={setPaymentData}
					/>
				</Box>
				);
			case 2:
				return (
					<BountySummary
						primaryAction={{
							text: 'Next',
							onClick: () => alert(JSON.stringify(paymentData))
						}}
						secondaryAction={{
							text: 'Back',
							onClick: () => setActiveStep(1)
						}}
						data={{...bountyData, ...paymentData}}
					/>
				);
			default:
				return (
					<React.Fragment>
						<Typography variant="overline" color="textSecondary">{content['badge']}</Typography>
							<Typography variant="h3" component="h2" gutterBottom={true}>
								<Typography color="primary" variant="h3" component="span">{content['header-p1']} </Typography>
								<Typography variant="h3" component="span">{content['header-p2']}</Typography>
							</Typography>
						<Typography variant="subtitle1" component="p" color="textSecondary">{content['description']}</Typography>
					</React.Fragment>
				);
		}
	}
 
  return (
    <section>
      <Container maxWidth="md">
        <Box pt={10} pb={12}>
					<Typography variant="overline" color="textSecondary">{content['badge']}</Typography>
						<Typography variant="h3" component="h2" gutterBottom={true}>
							<Typography color="primary" variant="h3" component="span">{content['header-p1']} </Typography>
							<Typography variant="h3" component="span">{content['header-p2']}</Typography>
						</Typography>
					<Typography variant="subtitle1" component="p" color="textSecondary">{content['description']}</Typography>
					
					<Box bgcolor="background.paper" className={classes.container}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
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
            <Box pl={6} pr={6} pt={3}>
							{getStepContent(activeStep)}
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
}
