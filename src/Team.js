import React, { Component } from 'react';
import PlayerSelector from './PlayerSelector.js';

export default class Team extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="team">

        <PlayerSelector team={this.props.name} name="player-1" />
        <PlayerSelector team={this.props.name} name="player-2" />

      </div>
    );
  }
}
