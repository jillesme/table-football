import React, { Component } from 'react';
import Score from './Score.js';
const img = require('../images/table.png');

export default class Table extends Component {
  render() {
    return (
      <div className="table center">

        <Score for="Team-A" />

        <img src={img} />

        <Score for="Team-B" />

      </div>
    );
  }
}
