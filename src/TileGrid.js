import React, { Component, PropTypes } from 'react';

import Tile from './Tile';

import './TileGrid.css';

export default class TileGrid extends Component {
  static propTypes = {
    tiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
      }),
    ).isRequired,
    onClick: PropTypes.func.isRequired,
    onFlip: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="TileGrid">
        {this.props.tiles.map((tile, i) => {
          return (
            <Tile
              key={`Tile-${i}`}
              onClick={this.props.onClick.bind(this, tile)}
              onFlip={this.props.onFlip}
              {...tile}
            />
          );
        })}
      </div>
    );
  }
}
