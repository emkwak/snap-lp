import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AlbumInfo from './AlbumInfo.jsx'

const URL = "https://teachablemachine.withgoogle.com/models/UByLl9Ki/";

let model, webcam, labelContainer, maxPredictions;



class ImageDetect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      match: false,
      artist: '',
      foundAlbum: {},
      id: ''
    }

    this.init = this.init.bind(this);
    this.loop = this.loop.bind(this);
    this.predict = this.predict.bind(this);
    this.check = this.check.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:7000/albums/')
      .then(res => res.json())
      .then((result) => this.setState({
        albums: result
      }))
      .catch((err) => console.log(`Error: ${err}`))
  }

  async init() {
    const modelURL = `${URL}model.json`;
    const metadataURL = `${URL}metadata.json`;

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(this.loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async loop() {
    webcam.update();
    await this.predict();
    window.requestAnimationFrame(this.loop);
  }


  async predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      if (Math.round(prediction[i].probability * 10000) / 100 >= 97) {
        this.setState({ artist: prediction[i].className }, this.check())
      }
    }
  }

  check() {
    let albums = this.state.albums;
    albums.filter(lp => {
      let artistTitle = this.state.artist
      if (lp.title === artistTitle) {
        this.setState({ foundAlbum: lp, match: true })
      }
      else {
        artistTitle = artistTitle.split('-').join('').replace(/ +/g, '-').toLowerCase()
        this.setState({ id: artistTitle }, this.fetchData(this.state.id))
      }
    })
  }

  fetchData(id) {
    fetch(`http://localhost:7000/albums/search/${id}`, {
      method: 'POST'
    })
      .then(() => {
        console.log('Success!');
        fetch('http://localhost:7000/albums/')
          .then(res => res.json())
          .then((result) => this.setState({
            albums: result
          }))
      })
      .catch((err) => {
        console.error('Error:', err);
      })
  }

  render() {
    const match = this.state.match
    return (
      <div>
        <Grid style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div id="webcam-container"></div>
          <Button variant="contained" onClick={this.init} style={{ color: '#fff', backgroundColor: '#8A2BE2', margin: '10px 0 10px 0' }} disableElevation>
            Scan
    </Button>
        </Grid>
        {match ? <AlbumInfo album={this.state.foundAlbum} /> : null}
      </div>
    )
  }
}

export default ImageDetect;
