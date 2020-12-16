import React, { Component } from 'react';
import RouteContext from './RouteContext';
const { pathToRegexp } = require('path-to-regexp');

export default class Route extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { path, exact, component: Component } = this.props;

    return (
      <RouteContext.Consumer>
        {(state) => {
          const { pathname } = state.location;
          let keys = [];
          const pathReg = pathToRegexp(path, keys, { end: !!exact });
          keys = keys.map((t) => t.name);

          const result = pathname.match(pathReg);
          let [url, ...values] = result || [];
          const props = {
            location: state.location,
            history: state.history,
            match: {
              params: keys.reduce((obj, current, index) => {
                obj[current] = values[index];
                return obj;
              }, {}),
            },
          };
          if (result) {
            return <Component {...props} />;
          }
          return null;
        }}
      </RouteContext.Consumer>
    );
  }
}
