import React, { Component, PropTypes } from 'react';

import { Players } from '../api/players.js';

// Task component - represents a single todo item
export default class Player extends Component {
  deletePlayer() {
    Players.remove(this.props.player._id);
  }

  render() {
    return (
      <div className="hello">
        <li>{this.props.player.name}</li>
        <button className="delete" onClick={this.deletePlayer.bind(this)}>&times;</button>
      </div>
  );
  }
}

Player.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  player: PropTypes.object.isRequired,
};
