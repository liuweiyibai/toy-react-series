/**
 * 创建 store
 * @param {*} reducer
 * @param {*} enhancer
 */
export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState = undefined;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 监听函数是一个数组，那就循环吧
    currentListeners.map((listener) => listener());
  }

  // 订阅，可以多次订阅
  function subscribe(listener) {
    // 每次订阅，把回调放入回调数组
    currentListeners.push(listener);
  }

  // 默认触发一次 dispatch ，让 reducer 中走 default 逻辑，返回初始值
  dispatch({ type: '@INIT/REDUX-KKB' });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

/**
 * 将所有的中间件合并分别执行，并且将增强后的参数返回到参数给下一个函数
 * 此处参数指的是 dispatch
 * @param  {...any} middlewares
 */
export function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const middleApi = {
      getState: store.getState,
      dispatch,
    };
    // 给middleware参数，比如说dispatch
    const middlewaresChain = middlewares.map((middleware) =>
      middleware(middleApi)
    );
    dispatch = compose(...middlewaresChain)(dispatch);
    return {
      ...store,
      // 覆盖上面 store 里的 dispatch
      dispatch,
    };
  };
}

/**
 * 合并函数，将函数分别执行，上一个函数的返回值是下一个函数的参数
 * @param  {...any} funcs
 */
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
