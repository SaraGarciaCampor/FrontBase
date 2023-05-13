import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function UserView() {
  const classes = useStyles();
  const [time, setTime] = useState('Last 30 days');


  const handleTimeChange = (f) => {
    setTime(f);
  };

  console.log(time);
  return (
    <Page
      className={classes.root}
      title="User View"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header onTimeChange={handleTimeChange} />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            xs={12}
          />
          <Grid
            item
            lg={12}
            xs={12}
          />
        </Grid>
      </Container>
    </Page>
  );
}

export default UserView;
