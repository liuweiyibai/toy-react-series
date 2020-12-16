import React, { Component } from 'react';
import RouteContext from './RouteContext';

export default class Redirect extends Component {
  render() {
    return (
      <RouteContext.Consumer>
        {(state) => {
          state.history.push(this.props.to);
          return null;
        }}
      </RouteContext.Consumer>
    );
  }
}
