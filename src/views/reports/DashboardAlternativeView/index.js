import React, {useState} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import EarningsSegmentation from './EarningsSegmentation';
import FinancialStats from './FinancialStats';
import Header from './Header';
import Overview from './Overview';
import TableTest from "./LatestOrders";

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

function DashboardAlternativeView() {
  const classes = useStyles();
  const [time, setTime] = useState("Last 30 days");


  const handleTimeChange = (f) => {
    setTime(f);
  };

  console.log(time);
  return (
    <Page
      className={classes.root}
      title="Dashboard Alternative"
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
          >
            <FinancialStats timeFrame={time}/>
          </Grid>
          <Grid
            item
            lg={12}
            xs={12}
          >
            <TableTest/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
