import React from 'react';
import ImageDetect from './ImageDetect.jsx'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Lobster, cursive',
    fontSize: 50,
    textAlign: 'center'
  },
  container: {
    margin: '0 auto',
    border: '4px #8A2BE2 solid',
    borderRadius: 7,
    padding: '20px 20px 60px 20px',
    position: 'relative',
    top: 50
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid md={4} className={classes.container}>
        <h1 className={classes.title}> Snap-LP</h1>
        <ImageDetect />
      </Grid>
    </div>
  )

}

export default App;
