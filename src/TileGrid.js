import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from './Tile';

import './TileGrid.css';

class TileGrid extends Component {
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

TileGrid.propTypes = {
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

export default TileGrid;
