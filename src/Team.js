import React, { Component } from 'react';
import PlayerListActionCreators from './actions/PlayerListActionCreators.js';
import PlayerListStore from './stores/PlayerListStore.js';
import CONSTANTS from './constants.js';

export default class Team extends Component {
  constructor (props) {
    super(props);
    this.state = {
      players: PlayerListStore.getPlayers()
    };
    this.listUpdated = this.listUpdated.bind(this);
    this.getCurrentPlayers = this.getCurrentPlayers.bind(this);
    this.select = this.select.bind(this);
  }
  select(ev) {
    PlayerListActionCreators.select(ev.target.value);
  }
  listUpdated() {
    this.setState({
      players: PlayerListStore.getPlayers()
    });
  }
  getCurrentPlayers() {
    var players = this.state.players.map((player, i) => <option key={player.id} value={player.name}>{player.name}</option>);
    players.unshift(<option key="0" value="">Speler..</option>);
    return players;
  }
  render() {
    return (
      <div className="team">

      <select onChange={this.select}>{this.getCurrentPlayers()}</select>
      <select onChange={this.select}>{this.getCurrentPlayers()}</select>

      </div>
    );
  }
  componentDidMount () {
    PlayerListStore.addChangeListener(this.listUpdated);
  }
  componentWillUnmount () {
    PlayerListStore.removeChangeListener(this.listUpdated);
  }
}
