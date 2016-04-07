import Dispatcher from '../dispatcher/Dispatcher.js';

module.exports = {

  // select the current player (in a dropdown)
  select: function (player, name) {
    Dispatcher.dispatch({
      actionType: 'SELECT',
      player: player,
      name: name
    });
  },

  // register the dropdown in the state
  register: function (player) {
    Dispatcher.dispatch({
      actionType: 'REGISTER',
      player: player
    });
  },

  // unregister the dropdown in the state
  unregister: function (player) {
    Dispatcher.dispatch({
      actionType: 'UNREGISTER',
      player: player
    });
  },


};
