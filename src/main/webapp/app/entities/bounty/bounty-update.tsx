import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getIssues } from 'app/entities/issue/issue.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bounty.reducer';
import clsx from 'clsx';
import { Stepper, Step, StepLabel, Typography, Paper, FormControl, InputAdornment, FormLabel, RadioGroup, FormControlLabel, RadioProps, List, ListItem, ListItemText, Collapse, Snackbar, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SimpleInputField, SelectInputField, InputContent } from 'app/shared/layout/components';

import ReplayIcon from '@material-ui/icons/Replay';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Alert } from '@material-ui/lab';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Type } from 'app/shared/model/enumerations/type.model';
// import { Button } from 'reactstrap';
import { Button, Icon, Form, TextArea, Select, Input, Container, Radio, Label, FormTextArea, FormInput, Grid, Segment, Divider, Message } from 'semantic-ui-react'
import { Status } from 'app/shared/model/enumerations/status.model';
import { BRadio } from 'app/shared/layout/components/radio';
import { BToggleRadio } from 'app/shared/layout/components/toggle-radio';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(5),
    },
    contentContainer: {
      padding: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    nested: {
      paddingLeft: theme.spacing(8),
    },
    subNested: {
      paddingLeft: theme.spacing(15),
    },
    error: {
      backgroundColor: "red"
    },
  }),
);

function getSteps() {
  return ['Issue Details', 'Funding Details', 'Bounty Details'];
}

const fundingFields = (fields: number) => {

}

export const BountyUpdate = (props: IBountyUpdateProps) => {

  const classes = useStyles();
  const steps = getSteps();

  const categories = [
    { key: 'F', text: 'Frontend', value: Category.FRONT_END },
    { key: 'B', text: 'Backend', value: Category.BACKEND },
    { key: 'T', text: 'This', value: Category.THIS }
  ];
  const types = [
    { key: 'B', text: 'Bug', value: Type.BUG },
    { key: 'F', text: 'Feature', value: Type.FEATURE },
    { key: 'I', text: 'Improvement', value: Type.IMPROVEMENT },
    { key: 'E', text: 'Ex', value: Type.EX }
  ];
  const experiences = [
    { key: 'B', text: 'Beginner', value: Experience.BEGINNER },
    { key: 'I', text: 'Intermediate', value: Experience.INTERMEDIATE },
    { key: 'A', text: 'Experience', value: Experience.ADVANCED }
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [issueUrl, setIssueUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [mode, setMode] = React.useState('');
  const [bountyUrl, setBountyUrl] = React.useState('');
  const [category, setCategory] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [experience, setExperience] = React.useState(null);
  const [expiryDate, setExpiryDate] = React.useState('');
  const [permission, setPermission] = React.useState('');

  const [bountyOpen, setBountyOpen] = React.useState(true);
  const [issueOpen, setIssueOpen] = React.useState(true);
  const [fundingOpen, setFundingOpen] = React.useState(true);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);

  const [isEmpty, setIsEmpty] = React.useState(false)

  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const { bountyEntity, loading, updating } = props;

  const handleBountyClick = () => {
    setBountyOpen(!bountyOpen);
  };

  const handleIssueClick = () => {
    setIssueOpen(!issueOpen);
  };

  const handleFundingClick = () => {
    setFundingOpen(!fundingOpen);
  };

  const handleIssueUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssueUrl(event.target.value);
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value);
  }

  const handleTypeChange = (e, { value }) => {
    setType(value);
  }

  const handleCategoryChange = (e, { value }) => {
    setCategory(value);
  }

  const handleExperienceChange = (e, { value }) => {
    setExperience(value);
  }

  const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(event.target.value);
  }

  const handlePermisssionChange = (event, { value }) => {
    setPermission(value);
  }

  const handleNext = () => {
    if (activeStep === 0) {
      if (issueUrl === '') {
        setIsEmpty(true)
        setSnackBarOpen(true)
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      if (amount === '' || mode === '') {
        setIsEmpty(true)
        setSnackBarOpen(true)
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      if (category === null || type === null || experience === null) {
        setIsEmpty(true)
        setSnackBarOpen(true)
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClose = () => {
    props.history.push('/bounty');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getIssues();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const submit = () => {
    const bounty = {
      amount: Number(amount),
      category,
      commitment: 0,
      experience,
      expires: expiryDate,
      fundings: [
        {
          amount: Number(amount),
          mode,
          paymentAuth: true
        }
      ],
      issue: {
        issueId: "string",
        url: issueUrl,
        description
      },
      keywords: "string",
      status: Status.OPEN,
      type,
      permission: permission === 'true',
      url: issueUrl
    }

    const entity = {
      ...bountyEntity,
      ...bounty,
    };

    alert(JSON.stringify(entity));

    if (isNew) {
      props.createEntity(entity);
    } else {
      props.updateEntity(entity);
    }
  };

  const handleSnackBarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <Paper square elevation={0} className={classes.contentContainer}>
      <div className={classes.instructions}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="error">
            Please fill in the fields with an asterisk(*)!
          </Alert>
        </Snackbar>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
                <Container text>
                  <Typography variant="h3">
                    <IconButton onClick={handleReset} className={classes.button}>
                      <ReplayIcon />
                    </IconButton>
                    Bounty Summary
                  </Typography>
                  <List
                    disablePadding
                    component="nav"
                    className={classes.instructions}
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItem onClick={handleBountyClick}>
                      <ListItemText primary="Bounty Details" />
                      {bountyOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={bountyOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Bounty URL: ".concat(bountyUrl)} />
                        </ListItem>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Type: ".concat(
                            (type.toLowerCase().replace('_', ' ')).charAt(0).toUpperCase() + (type.toLowerCase().replace('_', ' ')).slice(1)
                          )} />
                        </ListItem>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Category: ".concat(
                            (category.toLowerCase().replace('_', ' ')).charAt(0).toUpperCase() + (category.toLowerCase().replace('_', ' ')).slice(1)
                          )} />
                        </ListItem>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Experience: ".concat(
                            (experience.toLowerCase().replace('_', ' ')).charAt(0).toUpperCase() + (experience.toLowerCase().replace('_', ' ')).slice(1)
                          )} />
                        </ListItem>

                        <ListItem className={classes.nested} onClick={handleIssueClick}>
                          <ListItemText primary="Issue Details" />
                          {issueOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={issueOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Issue url: ".concat(issueUrl)} />
                            </ListItem>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Description: ".concat(description)} />
                            </ListItem>
                          </List>
                        </Collapse>
                        <ListItem className={classes.nested} onClick={handleFundingClick}>
                          <ListItemText primary="Fundind Details" />
                          {fundingOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={fundingOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Amount: ".concat(amount)} />
                            </ListItem>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Mode: ".concat(mode)} />
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>
                    </Collapse>
                  </List>
                  <Button variant="contained" secondary onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" primary onClick={submit}>
                    Submit
                  </Button>
                </Container>
          ) : (
            <div>
              <Container text>
                {activeStep === 0 ? (
                  <Segment basic>
                    <Grid columns={2} divided relaxed='very'>
                      <Grid.Column verticalAlign='middle'>
                        <p>Issue Details</p>
                      </Grid.Column>
                      <Grid.Column textAlign='left' verticalAlign='middle'>
                        <Form>
                          <Form.Field
                            required
                            control={Input}
                            name='url'
                            label='Issue Url'
                            value={issueUrl}
                            placeholder='Issue url'
                            onChange={handleIssueUrlChange}
                            error={isEmpty ? "Please enter a value" : false}
                          />
                          <Form.Field
                            control={TextArea}
                            name='description'
                            label='Description'
                            value={description}
                            placeholder='Tell us more about this issue...'
                            onChange={handleDescriptionChange}
                          />
                        </Form>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                ) : activeStep === 1 ? (
                  <Segment basic>
                    <Grid columns={2} divided relaxed='very'>
                      <Grid.Column verticalAlign='middle'>
                        <p>Funding Details</p>
                      </Grid.Column>
                      <Grid.Column textAlign='left' verticalAlign='middle'>
                        <Form>
                          <Form.Field
                            required
                            control={Input}
                            type="number"
                            icon='dollar'
                            iconPosition='left'
                            name='amount'
                            label='Amount'
                            value={amount}
                            placeholder='amount'
                            onChange={handleAmountChange}
                            error={isEmpty ? "Please enter a value" : false}
                          />
                          <Form.Group inline>
                            <label>Mode</label>
                            <Form.Field
                              control={BRadio}
                              label='One'
                              value='1'
                              checked={mode === '1'}
                              onChange={handleModeChange}
                            />
                            <Form.Field
                              control={BRadio}
                              label='Two'
                              value='2'
                              checked={mode === '2'}
                              onChange={handleModeChange}
                            />
                            <Form.Field
                              control={BRadio}
                              label='Three'
                              value='3'
                              checked={mode === '3'}
                              onChange={handleModeChange}
                            />
                          </Form.Group>
                        </Form>
                        <br/>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                ) : activeStep === 2 ? (
                  <Segment basic>
                    <Grid columns={2} divided relaxed='very'>
                      <Grid.Column verticalAlign='middle'>
                        <p>Bounty Details</p>
                      </Grid.Column>
                      <Grid.Column textAlign='left' verticalAlign='middle'>
                        <Form>
                          <Form.Select
                            fluid
                            required
                            name='category'
                            label='Category'
                            value={category}
                            options={categories}
                            placeholder='Category'
                            onChange={handleCategoryChange}
                            error={isEmpty ? "Please choose a value" : false}
                          />
                          <Form.Select
                            fluid
                            required
                            name='type'
                            label='Type'
                            value={type}
                            options={types}
                            placeholder='Type'
                            onChange={handleTypeChange}
                            error={isEmpty ? "Please choose a value" : false}
                          />
                          <Form.Select
                            fluid
                            required
                            name='experience'
                            label='Experience'
                            value={experience}
                            options={experiences}
                            placeholder='Experience'
                            onChange={handleExperienceChange}
                            error={isEmpty ? "Please choose a value" : false}
                          />
                          <Form.Radio
                            required
                            toggle
                            type='radio'
                            label='Permission'
                            name='permission'
                            value={permission === 'true' ? 'false' : 'true'}
                            checked={permission === 'true'}
                            onChange={handlePermisssionChange}
                          />
                          <Form.Field
                            required
                            control={Input}
                            type='date'
                            name='expires'
                            label='Expiry Date'
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            error={isEmpty ? "Please pick a date" : false}
                          />
                        </Form>
                        <br/>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                ) : (
                  "Unkown stage, How did you manage to get here?"
                )}
              </Container>
              <br/>
              <div>
                <Button disabled={activeStep === 0} animated onClick={handleBack}>
                  <Button.Content visible>Back</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow left' />
                  </Button.Content>
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button primary onClick={handleNext} content='Finish' />
                ) : (
                  <Button primary animated onClick={handleNext}>
                    <Button.Content visible>Next</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  bountyEntity: storeState.bounty.entity,
  loading: storeState.bounty.loading,
  updating: storeState.bounty.updating,
  updateSuccess: storeState.bounty.updateSuccess,
});

const mapDispatchToProps = {
  getIssues,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyUpdate);
