import React, { Component } from 'react';
import Team from './components/Team.js';
import Table from './components/Table.js';

export default class App extends Component {
  render() {
    return (
      <div className="ui">

        <Team name="Team-A" />

        <Table />

        <Team name="Team-B" />

      </div>
    );
  }
}
