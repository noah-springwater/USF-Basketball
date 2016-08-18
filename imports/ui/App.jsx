import React, { Component } from 'react';

import Player from './Player.jsx'

export default class App extends Component {
  getPlayers() {
    return [
      { _id: 1, name: 'Noah' },
      { _id: 2, name: 'John' },
      { _id: 3, name: 'Deshawn' },
    ];
  }

  renderPlayers() {
     return this.getPlayers().map((player) => (
       <Player key={player._id} player={player} />
     ));
   }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderPlayers()}
        </ul>
      </div>
    );
  }
}
