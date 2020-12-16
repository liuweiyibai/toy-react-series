import React from 'react';
import { createHashHistory } from 'history';

import RouteContext from './RouterContext';

class HashRouter extends React.Component {
  constructor() {
    this.hash = createHashHistory();

    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/',
      },
    };
  }

  componentDidMount() {
    window.location.hash = window.location.hash || '/';

    // 监听事件，触发 setState 更新视图
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || '/',
        },
      });
    });
  }

  render() {
    const props = {
      ...this.state,
      history: {
        push(to) {
          window.location.hash = to;
        },
      },
    };

    return (
      <RouteContext.Provider value={props}>
        {this.props.children}
      </RouteContext.Provider>
    );
  }
}
