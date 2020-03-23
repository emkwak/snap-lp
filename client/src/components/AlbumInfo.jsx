import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 345,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    display: 'flex',
    flexDirection: 'column'
  },
  space: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const AlbumInfo = ({ album }) => {
  console.log(album)
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={album.cover_image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {album.title}
        </Typography>
        <Grid className={classes.row}>
          <Typography >
            Style:
          </Typography>
          {album.style.map(style => {
            return <Typography color="textSecondary" component="p">{style}</Typography>
          })}
        </Grid>
        <Grid className={classes.row}>
          <Typography>
            Genre:
          </Typography>
          {album.genre.map(genre => {
            return <Typography color="textSecondary" component="p">{genre}</Typography>
          })}
        </Grid>
        <Grid className={classes.row}>
          <Typography>
            Year:
          </Typography>
          <Typography gutterBottom color="textSecondary" component="p">{album.year}</Typography>
        </Grid>
        <Typography gutterBottom variant="h6" component="h2">
          Tracklist:
        </Typography>
        <Grid className={classes.col}>
          {album.tracklist.map(track => {
            return <>
              <Grid className={classes.space}>
                <Typography color="textSecondary" component="p">{track.title}</Typography>
                <Typography color="textSecondary" component="p">{track.duration}</Typography>
              </Grid>
            </>
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AlbumInfo;
