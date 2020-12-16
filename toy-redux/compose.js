function reducerUser(
  initState = {
    name: 'a',
    age: '2',
  }
) {
  return { ...initState };
}

function reducerUser1(
  initState = {
    token: 'a',
    timeout: '2',
  }
) {
  return { ...initState };
}

function reducerUser2(
  initState = {
    a: 'a',
    b: '2',
  }
) {
  return { ...initState };
}

function compose(...args) {
  if (args.length === 0) {
    return () => {};
  }
  if (args.length === 1) {
    return args[0];
  }

  return args.reduce((a, b) => (...args) => a(b(...args)));
}

const res = compose(reducerUser, reducerUser1, reducerUser2);
console.dir(res());
