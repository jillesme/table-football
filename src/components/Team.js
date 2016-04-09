import React, { Component } from 'react';
import PlayerDropdown from './PlayerDropdown.js';

export default class Team extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="team">
        <PlayerDropdown team={this.props.name} name="player-1" />
        <PlayerDropdown team={this.props.name} name="player-2" />
      </div>
    );
  }
}
