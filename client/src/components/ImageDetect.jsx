import React from 'react';

const URL = "https://teachablemachine.withgoogle.com/models/UByLl9Ki/";

let model, webcam, labelContainer, maxPredictions;



class ImageDetect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }

    this.init = this.init.bind(this);
    this.loop = this.loop.bind(this);
    this.predict = this.predict.bind(this);
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
        console.log(prediction[i].className)
      }
    }
    // if the prediction is greater than 97%
    // check to see if state title in album matches artist-title
    // if it doesn't match
    // make a post request with data lowercase artist-title
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div id="webcam-container"></div>
        <div id="label-container"></div>
        <button type="button" onClick={this.init} >Scan</button >
      </div>
    )
  }
}

export default ImageDetect;
