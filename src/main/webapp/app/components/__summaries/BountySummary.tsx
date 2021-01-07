/* eslint-disable react/jsx-key */
import React from 'react';

import { makeStyles } from '@material-ui/core';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Box from '@material-ui/core/Box';

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

export interface IBountySummary {
	primaryAction: IAction,
	secondaryAction?: IAction,
	data?: any,
	content?: any,
}

function ccyFormat(num: number) {
	return `${num.toFixed(2)}`;
}

const BountySummary = (props) => {
	const classes = useStyles();
	
  const content = {
		'currencies': [{value: 'USD', text: 'USD'}, {value: 'GBP', text: 'GBP'}, {value: 'EUR', text: 'EUR'}],
		
    ...props.content
	};

	const { primaryAction, secondaryAction } = props;

	const helperText = null;

	return (
		<React.Fragment>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell align="center" colSpan={3}>
							<b>Details</b>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>							
					
					<TableRow>
						<TableCell colSpan={1}><b>Summary</b></TableCell>
						<TableCell colSpan={2}>Value</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={1}><b>Issue Url</b></TableCell>
						<TableCell colSpan={2}>Value</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={1}><b>Type</b></TableCell>
						<TableCell colSpan={2}>Value</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={1}><b>Category</b></TableCell>
						<TableCell colSpan={2}>Value</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={1}><b>Experience</b></TableCell>
						<TableCell colSpan={2}>Value</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={1}><b>Expiry Date</b></TableCell>
						<TableCell colSpan={2}>Value</TableCell>
					</TableRow>

					<TableRow>
						<TableCell rowSpan={2} />
						<TableCell>Funds</TableCell>
						<TableCell align="right">{ccyFormat(100)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Total Bounty</TableCell>
						<TableCell align="right">{ccyFormat(150)}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Box mt={3} position='right'>
				{secondaryAction && (
				<Button
						variant="contained"
						onClick={secondaryAction.onClick}
						className={classes.secondaryAction}
					>
						{secondaryAction.text}
					</Button>
				)}
				<Button
					variant="contained"
					color="primary"
					onClick={primaryAction.onClick}
					className={classes.primaryAction}
				>
					{primaryAction.text}
				</Button>
			</Box>
		</React.Fragment>
	);
}

export default BountySummary;
