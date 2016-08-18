import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Players } from '../api/players.js';

import Player from './Player.jsx';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim().toUpperCase();
    console.log(name.toUpperCase());

    Players.insert({
      name, //name variable from above
      createdAt: new Date(), // current time
    });

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
          <h1>Test</h1>
        </header>
        <div className="menu">
          <ul>
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
               <input type="text" ref="textInput" placeholder="Player Name" />
            </form>
            {this.renderPlayers()}
          </ul>
      </div>
      </div>
    );
  }
}

App.propTypes = {
  players: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
  }
}, App);
