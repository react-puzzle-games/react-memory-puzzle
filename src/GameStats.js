import React, { Component, PropTypes } from 'react';

import { GAME_STARTED, GAME_WON } from './game-states';

import './GameStats.css';

class GameStats extends Component {
  render() {
    return (
      <div className="GameStats">
        <span>Moves: {this.props.moves}</span>
        {this._renderGameState()}
      </div>
    );
  }

  _renderGameState() {
    if (this.props.gameState === GAME_STARTED) {
      return null;
    }

    if (this.props.gameState === GAME_WON) {
      return (
        <span>Congrats!</span>
      );
    }
  }
}

GameStats.propTypes = {
  gameState: PropTypes.symbol.isRequired,
  moves: PropTypes.number,
};

GameStats.defaultProps = {
  moves: 0,
};

export default GameStats;
