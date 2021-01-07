import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PaymentIcon from '@material-ui/icons/Payment';
import EditIcon from '@material-ui/icons/Edit';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StripeForm from '../__forms/StripeForm';
import SlideDown from '../__transitions/Transitions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { Card, CardHeader, CardContent, CardActions, Divider, ListItemAvatar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  features: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(5),
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
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  section: {
    backgroundColor: fade('#536DFE', .6),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    }
  },
  small: {
    height: theme.spacing(2),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '100%', height: '100%', backgroundColor: fade('#536DFE', .6), },
};

export default function BountyDetails(props) {
  const classes = useStyles();
  const [checkoutDialogOpen, setCheckoutDialogOpen] = React.useState(false);
  const [sponsorListDialogOpen, setSponsorListDialogOpen] = React.useState(false);

  const handleClickCheckoutDialogOpen = () => {
    setCheckoutDialogOpen(true);
  };

  const handleCheckoutDialogClose = () => {
    setCheckoutDialogOpen(false);
  };

  const handleClickSponsorListDialogOpen = () => {
    setSponsorListDialogOpen(true);
  };

  const handleSponsorListDialogClose = () => {
    setSponsorListDialogOpen(false);
  };

  const content = {
    'badge': 'Benefactor',
    'badge2': 'Expires on ',
    'fake-date': '10-09-2021',
    'header-p1': 'Lorem ipsum dolor',
    'header-p2': 'sit amet consectetur.',
    'bounty': '100',
    'bounty-tag': 'Bounty',
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

  const tier = {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  };

  const checkoutDialog = (
    <Dialog
      keepMounted
      open={checkoutDialogOpen}
      onClose={handleCheckoutDialogClose}
      TransitionComponent={SlideDown}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <StripeForm
            primaryAction={{
              text: 'Checkout',
              fullWidth: true,
            }}
          />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );

  const sponsorListDialog = (
    <Dialog
      keepMounted
      open={sponsorListDialogOpen}
      onClose={handleSponsorListDialogClose}
      TransitionComponent={SlideDown}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
      <DialogContent>
        <DialogContentText>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Ali Connors"
              secondary="Funds: $5"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Ali Connors"
              secondary="Funds: $5"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Ali Connors"
              secondary="Funds: $5"
            />
          </ListItem>
        </List>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );

  return (
        <section>
          {checkoutDialog}
          {sponsorListDialog}
          <Container maxWidth="lg">
            <Box pt={10} pb={6}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={7}>
                  <Card raised>
                    <CardHeader
                      title={
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(content['bounty']).concat(" " + content['bounty-tag'] + " ")
                      }
                      subheader={
                        <Box justifyContent="center" mt={1}>
                          <Typography variant="overline" component="div" align="center">
                            <Typography variant="overline" color="primary" component="span">Benefactor: </Typography>
                            <Typography variant="overline" component="span">{content['header-p2']}</Typography>
                          </Typography>
                          <Typography variant="subtitle1" component="p">{
                              content['badge2'].concat(
                                new Intl.DateTimeFormat("en-GB", {
                                  year: "numeric",
                                  month: "long",
                                  day: "2-digit"
                                }).format(new Date(content['fake-date']))
                              )}
                          </Typography>
                        </Box>
                      }
                      titleTypographyProps={{ align: 'center', variant: 'h4' }}
                      subheaderTypographyProps={{ align: 'center' }}
                      action={tier.title === 'Pro' ? <EditIcon /> : null}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div className={classes.cardPricing}>
                        <Box>
                          <Typography variant="h3" component="span">{content['header-p2']}</Typography>
                          <Typography variant="subtitle1" component="p" color="textSecondary">{content['description']}</Typography>
                        </Box>
                      </div>
                      <Typography variant="overline" color="textSecondary" align="right">{content['badge']}</Typography>
                      <ul>
                        <Typography variant="subtitle1" component="li" align="left" gutterBottom={true}>
                          <Typography color="primary" component="span">Type: </Typography>
                          <Typography component="span">{content['header-p2']}</Typography>
                        </Typography>
                        <Typography variant="subtitle1" component="li" align="left" gutterBottom={true}>
                          <Typography color="primary" component="span">Category: </Typography>
                          <Typography component="span">{content['header-p2']}</Typography>
                        </Typography>
                        <Typography variant="subtitle1" component="li" align="left" gutterBottom={true}>
                          <Typography color="primary" component="span">Difficulty: </Typography>
                          <Typography component="span"><Rating name="read-only" value={3} readOnly size="small" /></Typography>
                        </Typography>
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant='contained' color="primary" className={classes.primaryAction}>
                        {content['primary-action']}
                      </Button>
                    </CardActions>
                  </Card>
                  
                </Grid>

                <Grid item xs={12} md={5}>  
                  <div className={classes.features}>
                    <Box display="flex" justifyContent="center">
                      <Box borderRadius={16} {...defaultProps}>
                        <Box py={1} textAlign="center">
                          <Typography variant="overline" component="span">{content['badge']}</Typography>
                          <Typography variant="subtitle1">{content['header-p1']}</Typography>
                          <Box mt={1}>
                            <Button color="primary" variant="contained" onClick={handleClickCheckoutDialogOpen} endIcon={<PaymentIcon />}>Fund</Button>                            
                          </Box>
                                
                          <Box display="flex" justifyContent="center" mt={3} mb={4}>
                            <Link
                              component="button"
                              variant="h6"
                              underline="none"
                              onClick={handleClickSponsorListDialogOpen}
                            >
                              <Typography color="primary" variant="h6" component="span">Sponsors</Typography>
                              <Typography color="primary" variant="h6" component="span">&nbsp;</Typography>
                              <AvatarGroup max={4} className={classes.small}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                              </AvatarGroup>
                            </Link>
                            
                          </Box>

                        </Box>
                      </Box>
                    </Box>
                    
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </section>
  );
}