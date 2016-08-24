import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
  Meteor.publish('players', function playerPublication() {
    return Players.find();
  });
}

Meteor.methods({
  'players.insert'(name) {
    check(name, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Players.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    })
  },

  'players.remove'(playerId) {
    check(playerId, String);

    const player = Players.findOne(playerId);
    // let nah = alet("nahhhhhhhh buh - can't do that");
    if (player.owner !== this.userId) {
      throw new Meteor.Error('sorry dawg');
    }

    Players.remove(playerId);
  }
})
