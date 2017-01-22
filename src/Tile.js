import React, { Component, PropTypes } from 'react';

import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.flipCard = this.flipCard.bind(this);
    this._internalFlipCard = this._internalFlipCard.bind(this);

    this.state = {
      flipped: props.flipped,
    };
  }

  render() {
    const classes = `Tile-card ${this.state.flipped ? 'flipped' : ''}`;

    return (
      <section className="Tile-container" onClick={this.flipCard}>
        <div className={classes}>
          <figure className="front">1</figure>
          <figure className="back">2</figure>
        </div>
      </section>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.flipped && nextProps.flipped === nextState.flipped);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.flipped) {
      console.debug('Flipped True incoming prop!');

      this._cancelPendingAnimation();
      this.setState({
        flipped: nextProps.flipped,
      });
    }
  }

  flipCard() {
    console.debug('Public flip card...');

    // Peek to see the image below
    this._internalFlipCard();

    // Enqueue a flip back to its original state
    // This can be canceled by an incoming flipped prop
    this._enqueuePendingAnimation();
  }

  _enqueuePendingAnimation() {
    console.debug('Enqueuing animation...');
    this.setState({
      pendingAnimationId: setTimeout(this._internalFlipCard, 5000),
    })
  }

  _internalFlipCard() {
    console.debug('Flipping internal card...');
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
}

Tile.propTypes = {
  flipped: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Tile.defaultProps = {
  flipped: false,
};

export default Tile;
