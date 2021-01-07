/* eslint-disable react/jsx-key */
import { Box, Grid, MenuItem, TextField, Button, Select } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ReactHookFormSelect from '../__select/ReactHookFormSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		minWidth: '100%',
	},
  primaryAction: {
		margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  secondaryAction: {
		margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
}));

export interface IAction {
	text: string,
	onClick?: Function,
}

export interface IBountyUpdateForm {
	primaryAction: IAction,
	secondaryAction?: IAction,
	setData?: any,
	content?: any,
	event?: Function,
}

interface IBountyFormInput {
	summary: string;
	description: string;
  issueUrl: string;
  category: string;
  type: string;
  experience: string;
  expiryDate: Date;
  mode: string;
}

const bountyFormSchema = yup.object().shape({
  summary: yup.string().required("Please enter a brief summary of your bounty"),
  issueUrl: yup.string().url("Field must be a url").required("Please enter the issue url"),
  type: yup.string().required("Please select a type").nullable(),
  category: yup.string().required("Please select a category").nullable(),
  experience: yup.string().required("Please select an experience level").nullable(),
  mode: yup.string().required("Please select a mode").nullable(),
  expiryDate: yup.date().min(new Date()).required("Please pick an expiry date"),
});

const BountyForm = (props) => {
	const classes = useStyles();
	
  const content = {
		'ages': [{value: 10, text: 'Ten'}, {value: 20, text: 'Twenty'}, {value: 30, text: 'Thirty'}],
    'primary-action': 'Next',
		'secondary-action': 'Back',
	
    ...props.content
	};

	const { primaryAction, secondaryAction, event, setData } = props;

  const { control, errors, handleSubmit } = useForm<IBountyFormInput>({
    resolver: yupResolver(bountyFormSchema)
  });

  const onSubmit = (data: IBountyFormInput) => {
		alert(JSON.stringify(data));
		setData(data);
		primaryAction.onClick();
	}

	const secondarySubmit = () => {
		secondaryAction.onClick();
	}

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Box display="flex" height="100%">
							<Box my="auto">
								<Controller
									as={TextField}
									control={control}
									id="bounty-summary"
									label="Summary *"
									name="summary"
									placeholder="Short summary of your bounty"
									helperText={errors.summary?.message ? errors.summary?.message : "Brief summary of your bounty"}
									error={errors.summary?.message ? true : false}
									margin="dense"
									variant="outlined"
									fullWidth
								/>

								<Controller
									as={TextField}
									control={control}
									id="bounty-description"
									label="Description (Optional)"
									name='description'
									placeholder="Tell us more about your bounty"
									variant="outlined"
									margin="dense"
									multiline
									rows={4}
									fullWidth
								/>

								<Controller
									as={TextField}
									control={control}
									id="bounty-issue-url"
									label="Issue Url *"
									name='issueUrl'
									placeholder="Bounty issue url"
									error={errors.issueUrl?.message ? true : false}
									helperText={errors.issueUrl?.message ? errors.issueUrl?.message : "Bounty github or Jira issue url"}
									margin="dense"
									variant="outlined"
									fullWidth
								/>
								
								<Controller
									as={TextField}
									control={control}
									id="bounty-expiry-date"
									label="Expiry Date *"
									name='expiryDate'
									type="datetime-local"
									error={errors.expiryDate?.message ? true : false}
									helperText={errors.expiryDate?.message ? errors.expiryDate?.message : "Deadline for your bounty"}
									variant="outlined"
									margin="dense"
									fullWidth
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box display="flex" height="100%">
							<Box>
								<ReactHookFormSelect
									id='bounty-type'
									label='Type *'
									name='type'
									defaultValue={null}
									control={control}
									error={errors.type?.message ? true : false}
									helperText={errors.type?.message && errors.type?.message}
								>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{content['ages'].map(component => <MenuItem value={component.value}>{component.text}</MenuItem>)}
								</ReactHookFormSelect>

								<ReactHookFormSelect
									id='bounty-category'
									label='Category *'
									name='category'
									defaultValue={null}
									control={control}
									error={errors.category?.message ? true : false}
									helperText={errors.category?.message && errors.category?.message}
								>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{content['ages'].map(component => <MenuItem value={component.value}>{component.text}</MenuItem>)}
								</ReactHookFormSelect>

								<ReactHookFormSelect
									id='bounty-experience'
									label='Experience *'
									name='experience'
									helperText={errors.experience?.message ? errors.experience?.message : 'Select difficulty level of bounty'}
									defaultValue={null}
									control={control}
									error={errors.experience?.message ? true : false}
								>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{content['ages'].map(component => <MenuItem value={component.value}>{component.text}</MenuItem>)}
								</ReactHookFormSelect>

								<ReactHookFormSelect
									id='bounty-mode'
									label='Mode *'
									name='mode'
									defaultValue={null}
									helperText={errors.mode?.message ? errors.mode?.message : 'Select payment mode, either crypto or credit card'}
									control={control}
									error={errors.mode?.message ? true : false}
								>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{content['ages'].map(component => <MenuItem value={component.value}>{component.text}</MenuItem>)}
								</ReactHookFormSelect>
							</Box>
						</Box>
					</Grid>
				</Grid>
				{secondaryAction && (
					<Button
						variant="contained"
						onClick={secondarySubmit}
						className={classes.secondaryAction}
					>
						{secondaryAction.text}
					</Button>
				)}
				<Box mt={3}>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						className={classes.primaryAction}
					>
						{primaryAction.text}
					</Button>
				</Box>
			</form>
		</React.Fragment>
	);
}

export default BountyForm;
