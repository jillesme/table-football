import React, { Component } from 'react';
const img = require('./table.png');

export default class Table extends Component {
  render() {
    return (
      <div className="table">

      <img src={img} />

      </div>
    );
  }
}
