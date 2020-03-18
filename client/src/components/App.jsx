import React from 'react';
import ImageDetect from './ImageDetect.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>SnapLP</h1>
        <ImageDetect />
      </div>
    )
  }
}

export default App;
