export default class Store {

  constructor(data) {
    this.data = data;

    this.listeners = {};
    this.id = 0;
    this.data = {};
  }

  setData(newData) {
    const mergedData = {
      ...this.data,
      ...newData
    };
    this.data = mergedData;
    this.triggerListeners();
  }

  subscribe(callback) {
    this.id++;
    this.listeners[this.id] = callback;
    return this.id;
  }

  unsubscribe(id) {
    if (this.listeners[id]) {
      delete this.listeners[id];
    }
  }

  triggerListeners() {
    Object.values(this.listeners)
      .map((callback) => {
        callback(this.data);
      });
  }
}