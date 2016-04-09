import CONSTANTS from '../constants/AppConstants.js';
import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';
const { PLAYERS, ACTION_TYPES } = CONSTANTS;

// Actions turn this into { dropdown1: {}, dropdown2: .. }
let state = {};

function select (dropdown, name) {
  // loop over each registered dropdown
  Object.keys(state).forEach(dropdownKey => {
    let dropdownState = state[dropdownKey];

    // ignore the selected name on other dropdowns
    if (dropdown !== dropdownKey) {
      dropdownState.ignore.push(name);
    } else {
      // remove old selected player from current selected dropdowns first
      _unselect(dropdownState.selected)
      // select the current player for this dropdown
      dropdownState.selected = name;
    }

  });
}

// registers a new dropdown (for 1vs1 / 2vs2)
function register (dropdown) {
  state[dropdown] = {
    selected: '',
    ignore: []
  };
}

// deletes a dropdown from the store (when switching from 2vs2 to 1vs1)
function unregister (dropdown) {
  delete state[dropdown];
}

// unselect a player, when you select another player from the dropdown unignore the previous selected player
// - private method -
function _unselect (name) {
  Object.keys(state).forEach(dropdownKey => {
    let dropdownState = state[dropdownKey];
    dropdownState.ignore = dropdownState.ignore.filter(dropdownName => dropdownName !== name);
  });
}


let PlayerDropdownStore = assign({}, EventEmitter.prototype, {

  getStateForDropdown: function (dropdown) {
    return {
      // currently selected player, by default: ''
      selected: state[dropdown].selected,
      // options in the dropdown with the [] ignored filtered out
      options: PLAYERS.filter(dropdownObj => state[dropdown].ignore.indexOf(dropdownObj.name) === -1)
    }
  },

  // let the component(s) know the store has updated
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  // register the store in a component
  addChangeListener: function(callback, dropdown) {
    this.on(CHANGE_EVENT, callback);
  },

  // unregister the store in a component
  removeChangeListener: function(callback, dropdown) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Dispatcher will wait on the following actions after registering
Dispatcher.register(function (action) {

  switch(action.actionType) {

    case ACTION_TYPES.SELECT_PLAYER:
      select(action.dropdown, action.name);
      PlayerDropdownStore.emitChange();
      break;

    case ACTION_TYPES.REGISTER_DROPDOWN:
      register(action.dropdown);
      PlayerDropdownStore.emitChange();
      break;

    case ACTION_TYPES.UNREGISTER_DROPDOWN:
      unregister(action.dropdown);
      PlayerDropdownStore.emitChange();
      break;

    default:
      // no op
  }
});

export default PlayerDropdownStore;
