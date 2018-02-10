import guid from 'guid';

class Dispatcher {
  constructor() {
    // array of subscribers
    this.listeners = [];
  }

  register(callback) {
    if (typeof callback !== 'function') {
      throw 'Dispatcher: argument for register() must be function';
    }
    const id = guid.raw();
    this.listeners[id] = id;
  }

  dispatch(payload) {
    for (const listener in this.listeners) {
      listener(payload);
    }
  }
}

module.exports = Dispatcher;