import React, { Component } from 'react';

export default class Score extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="score">
        <input type="number" defaultValue="0" min="0" max="10" />
      </div>
    );
  }
}
