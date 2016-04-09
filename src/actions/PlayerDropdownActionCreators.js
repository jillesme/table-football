import Dispatcher from '../dispatcher/Dispatcher.js';
import CONSTANTS from '../constants/AppConstants.js';

const { ACTION_TYPES } = CONSTANTS;
const PlayerDropdownActionCreators = {

  // select the current player (in a dropdown)
  select: function (dropdown, name) {
    Dispatcher.dispatch({
      actionType: ACTION_TYPES.SELECT_PLAYER,
      dropdown: dropdown,
      name: name
    });
  },

  // register new dropdown (for 1vs1 / 2vs2)
  register: function (dropdown) {
    Dispatcher.dispatch({
      actionType: ACTION_TYPES.REGISTER_DROPDOWN,
      dropdown: dropdown
    });
  },

  // unregister new dropdown (for 1vs1 / 2vs2)
  unregister: function (dropdown) {
    Dispatcher.dispatch({
      actionType: ACTION_TYPES.UNREGISTER_DROPDOWN,
      dropdown: dropdown
    });
  }

};

export default PlayerDropdownActionCreators;
