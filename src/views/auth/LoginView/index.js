import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockIcon from '@material-ui/icons/Lock';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80
  },
  backButton: {
    marginLeft: theme.spacing(2)
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  icon: {
    backgroundColor: colors.green[500],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = (f) => {
    const email = localStorage.getItem('email');
    console.log(email);
    const fields = email.split('@');
    const user = fields[1].includes('.');
    if (!user) {
      if (fields[1] === 'txaas') {
        localStorage.setItem('user', false);
        localStorage.setItem('admin', false);
        localStorage.setItem('superadmin', true);
      } else {
        localStorage.setItem('user', false);
        localStorage.setItem('admin', true);
        localStorage.setItem('superadmin', false);
      }
    } else {
      localStorage.setItem('email', fields[0]);
      localStorage.setItem('user', true);
      localStorage.setItem('admin', false);
      localStorage.setItem('superadmin', false);
    }
    history.push('/app');
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container maxWidth="md">
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h2"
              color="textPrimary"
            >
              Sign in
            </Typography>
            <Box mt={3}>
              <LoginForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>

          </CardContent>
          <CardMedia
            className={classes.media}
            image="/static/images/auth.png"
            title="Cover"
          />


        </Card>
      </Container>
    </Page>
  );
}

export default LoginView;
