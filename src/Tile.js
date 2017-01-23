import React, { Component, PropTypes } from 'react';

import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: props.flipped,
    };
  }

  render() {
    const classes = `Tile-card ${this.state.flipped ? 'flipped' : ''}`;

    return (
      <section className="Tile-container" onClick={this.flipCard.bind(this)}>
        <div className={classes}>
          <figure className="front">
            <div style={this._getCardStyles()}></div>
          </figure>
          <figure className="back">
            <div style={this._getCardStyles(this.props.logo)}></div>
          </figure>
        </div>
      </section>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.flipped !== this.state.flipped) {
      this.props.onFlip(this.props.id, this.state.flipped);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.flipped && !this.props.flipped) {
      console.debug('Flipped True incoming prop!');

      this._cancelPendingAnimation();
      this.setState({
        flipped: nextProps.flipped,
      });
    }
  }

  flipCard() {
    console.debug('Public flip card...');

    this._internalFlipCard();

    // Enqueue a flip back to its original state
    // This can be canceled by an incoming flipped prop
    this._enqueuePendingAnimation();

    // Call public callback
    this.props.onClick({
      name: this.props.name,
      id: this.props.id,
    });
  }

  _enqueuePendingAnimation() {
    if (!this.props.flipped) {
      console.debug('Enqueuing animation...');

      this.setState({
        pendingAnimationId: setTimeout(this._internalFlipCard.bind(this), 5000),
      });
    }
  }

  _internalFlipCard() {
    console.debug(`Flipping internal card... Old State flipped: ${this.state.flipped}`);

    this.setState((prevState, props) => {
      if (!props.flipped) {
        return {
          flipped: !prevState.flipped,
        };
      } else {
        // If props.flipped is True then this card cannot be flipped again
        return {
          flipped: true,
        };
      }
    });
  }

  _cancelPendingAnimation() {
    console.debug('Cancelling animation...');

    if (this.state.pendingAnimationId) {
      clearTimeout(this.state.pendingAnimationId);
    }
  }

  _getCardStyles(logo = 'default.png') {
    return {
      backgroundImage: `url('assets/${logo || 'default.png'}')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundOrigin: 'border-box',
      backgroundSize: 40,
      width: 50,
      height: 50,
    }
  }
}

Tile.propTypes = {
  onClick: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  flipped: PropTypes.bool,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

Tile.defaultProps = {
  flipped: false,
};

export default Tile;
