import React, { Component } from 'react';
import RouteContext from './src/RouteContext';
const { pathToRegexp } = require('path-to-regexp');

export default class Switch extends Component {
  render() {
    return (
      <RouteContext.Consumer>
        {(state) => {
          const { pathname } = state.location;
          const children = this.props.children;
          for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let path = child.props.path || '';
            let reg = pathToRegexp(path, [], {
              end: false,
            });
            if (reg.test(pathname)) {
              return child;
            }
          }
          return null;
        }}
      </RouteContext.Consumer>
    );
  }
}
