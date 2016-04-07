import CONSTANTS from '../constants.js';
import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let active = [];
let options = CONSTANTS.PLAYERS;

function select (name) {
  console.log('selecting name: ', name);
  active.push(name);
}

function deselect (name) {
  console.log('deselectiing name: ', name);
  active = active.filter(player => player.name !== name);
}

let PlayerListStore = assign({}, EventEmitter.prototype, {

  getPlayers: function () {
    return options.filter(player => active.indexOf(player.name) < 0);
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
      select(action.name);
      PlayerListStore.emitChange();
      break;

    case 'DESELECT':
      deselect(action.name);
      PlayerListStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = PlayerListStore;
