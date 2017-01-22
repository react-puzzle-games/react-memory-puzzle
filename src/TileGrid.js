import React, { Component } from 'react';

import Tile from './Tile';

import './TileGrid.css';

class TileGrid extends Component {
  constructor(props) {
    super(props);

    this.onTileClick = this.onTileClick.bind(this);
  }

  render() {
    return (
      <div className="TileGrid">
        {this._renderTiles()}
      </div>
    );
  }

  _renderTiles() {
    let tiles = [];
    for (let i = 0; i < 30; i++) {
      tiles.push(<Tile onClick={this.onTileClick} key={`Tile-${i}`} />);
    }

    return tiles;
  }

  onTileClick(e) {
    e.preventDefault();

    console.log('Click');
  }
}

export default TileGrid;
