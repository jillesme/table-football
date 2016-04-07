import Dispatcher from '../dispatcher/Dispatcher.js';

module.exports = {

  select: function (name) {
    Dispatcher.dispatch({
      actionType: 'SELECT',
      name: name
    });
  },

  deselect: function (name) {
    Dispatcher.dispatch({
      actionType: 'DESELECT',
      name: name
    });
  }
};
