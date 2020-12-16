import React, { Component } from 'react';
import RouteContext from './RouteContext';

export default class Link extends Component {
  render() {
    return (
      <RouteContext.Consumer>
        {(state) => {
          return (
            <a onClick={() => state.history.push(this.props.to)}>
              {this.props.children}
            </a>
          );
        }}
      </RouteContext.Consumer>
    );
  }
}
