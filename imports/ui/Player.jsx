import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data'

import { Players } from '../api/players.js';

// Task component - represents a single todo item
export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false
    };
  }

  deletePlayer() {
    Meteor.call('players.remove', this.props.player._id);
  }

  updateName() {
    this.setState({
      editable: true
    })
  }

  resubmitName(e) {
    e.preventDefault();

    let playerId = this.props.player._id;
    let editedName = this.refs.newNameInput.value;

    Meteor.call('players.update', playerId, editedName);

    this.setState({
      editable: false
    })
  }

  render() {
    return (
      <div className="player">
        {/* if the user id mataches the creater id then make name editable/deletable */
        /* if not then just render the names in a ul */}
        { this.props.currentUser._id == this.props.player.owner ?

         !(this.state.editable) ?
           <div className="form-wrapper">
              <ul>
              {this.props.player.name}
              </ul>
              <button onClick={this.updateName.bind(this)}>Edit Name</button>
              <button className="delete" onClick={this.deletePlayer.bind(this)}>&times;</button>
           </div> :

            <form onSubmit={this.resubmitName.bind(this)}>
              <input
                type="text"
                ref="newNameInput"
                defaultValue={this.props.player.name}
              />
            </form> :

            <ul>
              {this.props.player.name}
            </ul>
        }
      </div>
    );
  }
}

Player.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  player: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, Player);
