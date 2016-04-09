import React, { Component } from 'react';

import PlayerDropdownActionCreators from '../actions/PlayerDropdownActionCreators.js';
import PlayerDropdownStore from '../stores/PlayerDropdownStore.js';

export default class PlayerDropdown extends Component {
  constructor (props) {
    super(props);
    // e.g. 'team-a-player-1
    this.dropdownName = `${this.props.team}-${this.props.name}`;

    this.onStoreUpdate = this.onStoreUpdate.bind(this);
    this.onSelectPlayer = this.onSelectPlayer.bind(this);
  }
  // will be called everytime someone updates the store (e.g new player is selected)
  onStoreUpdate () {
    let dropdownState = PlayerDropdownStore.getStateForDropdown(this.dropdownName);
    // get the <option>..</option> values
    let dropdownOptions = dropdownState.options.map(playerObj => {
      return <option key={playerObj.id} value={playerObj.name}>{playerObj.name}</option>;
    });
    // set the state to cause a rerender with the (newly) selected player
    this.setState({
      selected: dropdownState.selected,
      options: dropdownOptions
    });
  }
  // will be called when someone changes the value in a dropdown
  onSelectPlayer (ev) {
    PlayerDropdownActionCreators.select(this.dropdownName, ev.target.value);
  }
  render() {
    return (
      <select value={this.state.selected} onChange={this.onSelectPlayer}>
        <option value="">Kies speler..</option>
        {this.state.options}
      </select>
    );
  }
  componentWillMount() {
    // when we mount a dropdown we register it with the store
    PlayerDropdownStore.addChangeListener(this.onStoreUpdate);
    // we can't do this in the ^ method because we need to emit a change event and that would create an infinite loop
    PlayerDropdownActionCreators.register(this.dropdownName);
  }
  componentWillUnmount() {
    // when we unmount the dropdown we unregister it from the store so we don't polute the state
    PlayerDropdownStore.removeChangeListener(this.onStoreUpdate);
    // we can't do this in the ^ method because we need to emit a change event and that would create an infinite loop
    PlayerDropdownActionCreators.unregister(this.dropdownName);
  }
}
