import React, { Component } from 'react';

import RouteContext from './RouteContext';

/**
 * hash 类型路由组件
 */
export default class HashRouter extends Component {
  constructor(props) {
    super(props);
    // 组件内部值
    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/',
      },
    };
  }

  componentDidMount() {
    // 组将将要挂载
    // 获取hash值并且添加hash事件监听
    window.location.hash = window.location.hash || '/';
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
    // 包装 props 通过 Provider 传递给后代组件
    const props = {
      location: this.state.location,
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
