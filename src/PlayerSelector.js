import React, { Component } from 'react';

import PlayerListActionCreators from './actions/PlayerListActionCreators.js';
import PlayerListStore from './stores/PlayerListStore.js';

export default class Team extends Component {
  constructor (props) {
    super(props);
    this.dropdownName = this.props.team + this.props.name;

    this.onSelectPlayer = this.onSelectPlayer.bind(this);
    this.onStoreUpdate = this.onStoreUpdate.bind(this);
  }
  onStoreUpdate () {
    let dropdownState = PlayerListStore.getStateForPlayer(this.dropdownName);
    let dropdownOptions = dropdownState.options.map(playerObj => {
      return <option key={playerObj.id} value={playerObj.name}>{playerObj.name}</option>;
    });
    this.setState({
      selected: dropdownState.selected,
      options: dropdownOptions
    });
  }
  onSelectPlayer (ev) {
    PlayerListActionCreators.select(this.dropdownName, ev.target.value);
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
    PlayerListStore.addChangeListener(this.onStoreUpdate);
    PlayerListActionCreators.register(this.dropdownName);
  }
  componentWillUnmount() {
    PlayerListStore.removeChangeListener(this.onStoreUpdate);
    PlayerListActionCreators.unregister(this.dropdownName);
  }
}
