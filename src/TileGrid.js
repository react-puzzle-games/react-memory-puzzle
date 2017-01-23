import React, { Component, PropTypes } from 'react';

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
              onClick={this.props.onClick.bind(tile.name)}
              name={tile.name}
              logo={tile.logo}
            />
          );
        })}
      </div>
    );
  }
}

TileGrid.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TileGrid;
