import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Players } from '../api/players.js';

import Player from './Player.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim().toUpperCase();
    console.log(name.toUpperCase());

    Meteor.call('players.insert', name)

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderPlayers() {
     return this.props.players.map((player) => (
       <Player key={player._id} player={player} />
     ));

   }

  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
          <h1>USF Basketball ({this.props.players.length})</h1>
        </header>
        { this.props.currentUser &&
          <div className="menu">
            <ul>
              <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                 <input type="text" ref="textInput" placeholder="Player Name" />
              </form>
              {this.renderPlayers()}
            </ul>
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  players: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('players');

  return {
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  }
}, App);
