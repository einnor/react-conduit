import agent from './agent';

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const promiseMiddleware = store => next => (action) => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });

    action.payload.then(
      (res) => {
        const act = action;
        act.payload = res;
        store.dispatch(act);
      },
      (error) => {
        const act = action;
        act.error = true;
        act.payload = error.response.body;
        store.dispatch(act);
      },
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = () => next => (action) => {
  if (action.type === 'REGISTER' || action.type === 'LOGIN') {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export {
  localStorageMiddleware,
  promiseMiddleware,
};
