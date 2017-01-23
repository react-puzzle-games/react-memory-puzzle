import React, { Component } from 'react';

import TileGrid from './TileGrid';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import tileFactory from './tile-factory';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onTileClick = this.onTileClick.bind(this);
    this.onTileFlip = this.onTileFlip.bind(this);

    this.state = tileFactory.newGame();
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <div className="App-content">
          <TileGrid
            tiles={this.state.tiles}
            onClick={this.onTileClick}
            onFlip={this.onTileFlip}
          />
        </div>
        <AppFooter />
      </div>
    );
  }

  onTileClick(tile) {
    const matchingTile = this._getMatchingTile(tile);
    if (matchingTile.temporarilyFlipped) {
      const modifiedTiles = [].concat(this.state.tiles).map(t => {
        if (t.id === tile.id || t.id === matchingTile.tile.id) {
          return {
            ...t,
            flipped: true,
          };
        }

        return t;
      });
      this.setState({
        tiles: modifiedTiles,
      });
    }
  }

  onTileFlip(tileId, isFlipped) {
    this.setState({
      temporaryFlippedTiles: Object.assign(
        {},
        this.state.temporaryFlippedTiles,
        {
          [tileId]: isFlipped,
        }
      )
    });
  }

  _getMatchingTile(tile) {
    // Search for matching tile and see if it's also flipped
    const matchingTile = this.state.tiles.find(t => {
      return (t.id !== tile.id && t.name === tile.name)
    });

    return {
      tile: matchingTile,
      temporarilyFlipped: this.state.temporaryFlippedTiles[matchingTile.id],
    };
  }
}

export default App;
