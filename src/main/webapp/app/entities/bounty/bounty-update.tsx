import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getIssues } from 'app/entities/issue/issue.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bounty.reducer';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import { Stepper, Step, StepLabel, Typography, StepConnector, StepIconProps, Container, Paper, FormControl, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio, RadioProps, List, ListItem, ListItemText, Collapse, Snackbar, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { SimpleInputField, SelectInputField, InputContent } from 'app/shared/layout/components';

import ReplayIcon from '@material-ui/icons/Replay';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Alert } from '@material-ui/lab';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Button } from 'reactstrap';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const useRadioStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

function StyledRadio(props: RadioProps) {
  const classes = useRadioStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

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
  }),
);

function getSteps() {
  return ['Issue Details', 'Funding Details', 'Bounty Details'];
}

export const BountyUpdate = (props: IBountyUpdateProps) => {

  const classes = useStyles();
  const steps = getSteps();

  const categories = [Category.FRONT_END, Category.BACKEND, Category.THIS];
  const types = [Type.BUG, Type.FEATURE, Type.IMPROVEMENT, Type.EX];
  const experiences = [Experience.BEGINNER, Experience.INTERMEDIATE, Experience.ADVANCED];

  const [activeStep, setActiveStep] = React.useState(0);
  const [issueUrl, setIssueUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [mode, setMode] = React.useState('');
  const [bountyUrl, setBountyUrl] = React.useState('');
  const [category, setCategory] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [experience, setExperience] = React.useState(null);

  const [bountyOpen, setBountyOpen] = React.useState(true);
  const [issueOpen, setIssueOpen] = React.useState(true);
  const [fundingOpen, setFundingOpen] = React.useState(true);
  const [inputValidity, setInputValidity] = React.useState(true);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);

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

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  }

  const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperience(event.target.value);
  }

  const handleBountyUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBountyUrl(event.target.value);
  }

  const handleNext = () => {
    if (activeStep === 0) {
      if (issueUrl === '' || description === '') {
        setInputValidity(false)
        setSnackBarOpen(true)
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      if (amount === '' || mode === '') {
        setInputValidity(false)
        setSnackBarOpen(true)
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      if (bountyUrl === '' || category === null || type === null || experience === null) {
        setInputValidity(false)
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

  const submit = (event, errors, values) => {
    const bounty = {
      amount: Number(amount),
      category: Category.FRONT_END,
      commitment: 0,
      experience: Experience.BEGINNER,
      expires: "2020-08-11",
      fundings: [
        {
          amount: 0,
          mode: "string",
          paymentAuth: true
        }
      ],
      issue: {
        issueId: "string",
        url: issueUrl
      },
      keywords: "string",
      status: Status.OPEN,
      type: type.BUG,
      url: bountyUrl
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
    <div className={classes.root}>
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
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <Paper square elevation={0} className={classes.contentContainer}>
            <div className={classes.instructions}>
              <Container className={classes.instructions} maxWidth="sm">
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
                <Button variant="contained" color="secondary" onClick={handleClose} className={classes.button}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={submit} className={classes.button}>
                  Submit
                </Button>
              </Container>
            </div>
          </Paper>
        ) : (
          <div>
            <Paper square elevation={0} className={classes.contentContainer}>
              <div className={classes.instructions}>
                <Container maxWidth="sm">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    activeStep === 0 ? (
                      <InputContent description="Issue Details"
                        inputs={
                          <FormControl fullWidth>
                            <SimpleInputField id="issue_url" type="text" label="Issue URL" placeholder="issue url" isRequired={true}
                              value={issueUrl} handleChange={handleIssueUrlChange} isValid={inputValidity} />
                            <SimpleInputField id="issue_description" label="Description" placeholder="description" isRequired={true}
                              value={description} isValid={inputValidity} handleChange={handleDescriptionChange} multiline />
                          </FormControl>
                        }
                      />
                    ) : activeStep === 1 ? (
                      <InputContent description="Funding Details"
                        inputs={
                          <FormControl fullWidth>
                            <SimpleInputField id="amount"
                              label="Amount"
                              type="number"
                              isRequired={true}
                              placeholder="0.00"
                              isValid={inputValidity}
                              value={amount} handleChange={handleAmountChange}
                              adorment={(<InputAdornment position="start">$</InputAdornment>)}
                            />
                            <FormControl>
                              <FormLabel>Mode</FormLabel>
                              <RadioGroup aria-required aria-label="mode" name="customized-radios" value={mode} onChange={handleModeChange}>
                              <FormControlLabel value="a" control={<StyledRadio />} label="Mode A" />
                                <FormControlLabel value="b" control={<StyledRadio />} label="Mode B" />
                              </RadioGroup>
                            </FormControl>
                          </FormControl>
                        }
                      />
                    ) : activeStep === 2 ? (
                      <InputContent description="Bounty Details"
                        inputs={
                          <FormControl fullWidth>
                            <SimpleInputField id="bounty_url" type="text" label="Bounty URL" placeholder="bounty url" isRequired={true}
                              value={bountyUrl} handleChange={handleBountyUrlChange} isValid={inputValidity} />
                            <SelectInputField id="category" label="Category" items={categories} value={category}
                              handleChange={handleCategoryChange} />
                            <SelectInputField id="type" label="Type" items={types} value={type}
                              handleChange={handleTypeChange} isRequired />
                            <SelectInputField id="experience" label="Experience" items={experiences} value={experience}
                              handleChange={handleExperienceChange} isRequired />
                          </FormControl>
                        }
                      />
                    ) : (
                      "Unkown stage, How did you manage to get here?"
                    )
                  )}
                </Container>
              </div>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </Paper>
          </div>
        )}
      </div>
    </div>
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
