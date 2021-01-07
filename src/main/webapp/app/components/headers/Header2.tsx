import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
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
}));

export default function Header(props) {
  const classes = useStyles();
  
  const content = {
    'badge': 'The New Internet',
    'header': 'We\'ve built a decentralized internet where information is totally free',
    'primary-action': 'Read more',
    'pattern': 'content/images/bg/pattern1.png',
    ...props.content
  };

  return (
    <section className={classes.section} style={{ backgroundImage: `url("${content['pattern']}")` }}>
      <Container maxWidth="md">
        <Box py={8} textAlign="center">
          <Typography variant="overline" component="span">{content['badge']}</Typography>
          <Typography variant="h3" component="h2">{content['header']}</Typography>
          <Box mt={4}>
            <Button color="primary" endIcon={<ArrowRightAltIcon />}>{content['primary-action']}</Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
}