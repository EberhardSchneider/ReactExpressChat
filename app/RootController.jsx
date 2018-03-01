import React from 'react';
import Dashboard from './pages/dashboard/components/Dashboard.jsx';
import ChatController from './pages/chat/components/ChatController.jsx';
import Store from './store/store';
import dataApi from './store/data-api';




export default class RootController extends React.PureComponent {

  constructor(props) {
    super(props);

    const store = new Store({
      users: {},
      rooms: {},
      messages: [],
      localUser: this.props.user
    });

    this.state = {
      activeComponent: Dashboard,
      store: store
    };

    this.storeId = this.state.store.subscribe(this.onStoreChange.bind(this));

    dataApi.getAndPushToStore('/rooms', this.state.store);
    this.state.store.addSocketEvents(this.props.user);
  }

  onStoreChange(data) {
    this.setState(data);
    this.forceUpdate();
  }

  chatClick = () => {
    this.setState(() => ({
      activeComponent: ChatController
    }));
  }

  dashboardClick = () => {
    this.setState(() => ({
      activeComponent: Dashboard
    }));
  }

  logoutClick = () => {
    this.state.store.logout();
  }

  render() {
    const Active = this.state.activeComponent;
    return <div>
      <div className="row">
        <button onClick={this.dashboardClick}>DASHBOARD</button>
        <button onClick={this.chatClick}>CHAT</button>
        <button onClick={this.logoutClick}>LOGOUT</button>
      </div>
      <div className="content">
        <Active
          user={this.props.user}
          store={this.state.store}/>
      </div>
    </div>;
  }
}