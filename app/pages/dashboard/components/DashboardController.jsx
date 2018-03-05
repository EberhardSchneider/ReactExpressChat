import React from 'react';
import Dashboard from './Dashboard.jsx';

class DashboardController extends React.Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.state = this.store.getData();

    this.storeId = this.store.subscribe(this.onStoreChange);
  }

  onStoreChange = (data) => {
    this.setState(data);
  }

  updateUser = () => {
    console.log('update user');
  }

  render() {
    return (<Dashboard
      store={this.props.store}/>);
  }
}

module.exports = DashboardController;