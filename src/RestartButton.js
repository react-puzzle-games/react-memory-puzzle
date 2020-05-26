import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RestartButton.css';

class RestartButton extends Component {
  render() {
    return (
      <div className="Game-Restart">
        <button onClick={this.props.onClick}>
          Play again
        </button>
      </div>
    );
  }
}

RestartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RestartButton;
