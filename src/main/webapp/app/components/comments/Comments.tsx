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
import { TextField, List, ListItem, ListItemAvatar, Divider, ListItemText } from '@material-ui/core';

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
	root: {
		width: '100%',
		// maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
}));

export default function Comments(props) {
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
        <Box pt={5} pb={5}>
					
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
							<Typography variant="subtitle1" color="textSecondary" paragraph={true}>No comments yet</Typography>
							<List className={classes.root}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText
										primary={
											<React.Fragment>
												<Typography
													component="span"
													variant="h6"
													className={classes.inline}
													color="textPrimary"
												>
													Ali Connors
												</Typography>
												<Typography variant="caption">{" — Date"}</Typography>
											</React.Fragment>
										}
										secondary="My very good comment"
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
									</ListItemAvatar>
									<ListItemText
										primary={
											<React.Fragment>
												<Typography
													component="span"
													variant="h6"
													className={classes.inline}
													color="textPrimary"
												>
													Scott
												</Typography>
												<Typography variant="caption">{" — Date"}</Typography>
											</React.Fragment>
										}
										secondary="My very good comment"
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
									</ListItemAvatar>
									<ListItemText
										primary={
											<React.Fragment>
												<Typography
													component="span"
													variant="h6"
													className={classes.inline}
													color="textPrimary"
												>
													Sandra Adams
												</Typography>
												<Typography variant="caption">{" — Date"}</Typography>
											</React.Fragment>
										}
										secondary="My very good comment"
									/>
								</ListItem>
							</List>

							<TextField
								id="bounty-description"
								label="Comment"
								name='description'
								placeholder="Drop your comment here"
								variant="outlined"
								margin="dense"
								multiline
								rows={4}
								fullWidth
							/>

							<Box mt={1}>
								<Button
									variant="contained"
									color="primary"
									type="submit"
									// className={classes.primaryAction}
								>
									{content['primary-action']}
								</Button>
							</Box>
            </Grid>
            
          </Grid>
        </Box>
      </Container>
    </section>
  );
}