import CONSTANTS from '../constants.js';
import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

// Turn into { player1: {}, player2: .. }
let state = {};

function select (player, name) {
  // loop over each registered player
  Object.keys(state).forEach(playerKey => {
    let playerState = state[playerKey];

    // ignore the player on other dropdowns
    if (player !== playerKey) {
      playerState.ignore.push(name);
    } else {
      // remove old player from current selected dropdowns first
      _unselect(playerState.selected)
      // select the current player for this dropdown
      playerState.selected = name;
    }

  });
}

function register (player) {
  state[player] = {
    selected: '',
    ignore: []
  };
}

function unregister (player) {
  delete state[player];
}

function _unselect (name) {
  Object.keys(state).forEach(playerKey => {
    let playerState = state[playerKey];
    playerState.ignore = playerState.ignore.filter(playerName => playerName !== name);
  });
}


let PlayerListStore = assign({}, EventEmitter.prototype, {

  getStateForPlayer: function (player) {
    return {
      selected: state[player].selected,
      options: CONSTANTS.PLAYERS.filter(playerObj => state[player].ignore.indexOf(playerObj.name) === -1)
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function (action) {

  switch(action.actionType) {

    case 'SELECT':
      select(action.player, action.name);
      PlayerListStore.emitChange();
      break;

    case 'REGISTER':
      register(action.player);
      PlayerListStore.emitChange();
      break;

    case 'UNREGISTER':
      register(action.player);
      PlayerListStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = PlayerListStore;
