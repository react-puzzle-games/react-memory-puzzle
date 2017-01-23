import React, { Component } from 'react';

import TileGrid from './TileGrid';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import tileFactory from './tile-factory';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = tileFactory.newGame();
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <div className="App-content">
          <TileGrid tiles={this.state.tiles} onClick={this.onTileClick} />
        </div>
        <AppFooter />
      </div>
    );
  }

  onTileClick(name) {
    console.log(name);
  }
}

export default App;
