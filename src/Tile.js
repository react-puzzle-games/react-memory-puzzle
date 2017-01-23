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
      this._cancelPendingAnimation();
      this.setState({
        flipped: nextProps.flipped,
      });
    }
  }

  flipCard() {
    this._internalFlipCard();

    // Enqueue a flip back to its original state
    // only if we don't already have a pending one, otherwise
    // cancel it.
    // The animation only works if the card hasn't already
    // been flipped via props.
    if (!this.state.pendingAnimationId) {
      if (!this.props.flipped) {
        this._enqueuePendingAnimation();
      }
    } else {
      this._cancelPendingAnimation();
    }

    // Call public callback
    this.props.onClick();
  }

  _enqueuePendingAnimation() {
    this.setState({
      pendingAnimationId: setTimeout(this._internalFlipCard.bind(this), 2500),
    });
  }

  _internalFlipCard() {
    this.setState((prevState, props) => {
      if (!props.flipped) {
        return {
          flipped: !prevState.flipped,
          pendingAnimationId: 0,
        };
      } else {
        // If props.flipped is True then this card cannot be flipped again
        return {
          flipped: true,
          pendingAnimationId: 0,
        };
      }
    });
  }

  _cancelPendingAnimation() {
    if (this.state.pendingAnimationId) {
      clearTimeout(this.state.pendingAnimationId);
      this.setState({
        pendingAnimationId: 0,
      });
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
