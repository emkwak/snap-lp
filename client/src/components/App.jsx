import React from 'react';
import ImageDetect from './ImageDetect.jsx'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Lobster, cursive',
    fontSize: 50
  },
  container: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid className={classes.container}>
          <h1 className={classes.title}> SnapLP</h1>
          <ImageDetect />
        </Grid>
      </Container>
    </div>
  )

}

export default App;
