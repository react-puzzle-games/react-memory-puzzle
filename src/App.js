import React, { Component } from 'react';

import TileGrid from './TileGrid';
import AppHeader from './AppHeader';
import Footer from './Footer';
import GameStats from './GameStats';
import tileFactory from './tile-factory';
import { GAME_WON, GAME_STARTED } from './game-states';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onTileClick = this.onTileClick.bind(this);
    this.onTileFlip = this.onTileFlip.bind(this);
    this.onRestartGame = this.onRestartGame.bind(this);

    this.state = tileFactory.newGame();
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <div className="App-content">
          <GameStats
            moves={this.state.moves}
            gameState={this.state.gameState}
            onRestart={this.onRestartGame}
          />
          <TileGrid
            tiles={this.state.tiles}
            onClick={this.onTileClick}
            onFlip={this.onTileFlip}
          />
        </div>
        <Footer />
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

      // Check if game has been won
      const gameWon = modifiedTiles.reduce(
        (result, tile) => {
          return result && tile.flipped;
        },
        true,
      );

      this.setState({
        tiles: modifiedTiles,
        gameState: gameWon ? GAME_WON : GAME_STARTED,
      });
    }

    // Increment number of game moves
    this.setState((prevState, props) => ({
      moves: prevState.moves + 1,
    }));
  }

  onTileFlip(tileId, isFlipped) {
    const temporaryFlippedTiles = Object.assign(
      {},
      this.state.temporaryFlippedTiles,
      {
        [tileId]: isFlipped,
      },
    );

    this.setState({
      temporaryFlippedTiles,
    });
  }

  onRestartGame() {
    this.setState(tileFactory.newGame());
  }

  _getMatchingTile(tile) {
    // Search for matching tile and see if it's also flipped
    const matchingTile = this.state.tiles.find(t => {
      return t.id !== tile.id && t.name === tile.name;
    });

    return {
      tile: matchingTile,
      temporarilyFlipped: this.state.temporaryFlippedTiles[matchingTile.id],
    };
  }
}

export default App;
