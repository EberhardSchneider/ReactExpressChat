import React from 'react';
import DashboardController from './pages/dashboard/components/DashboardController.jsx';
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
      activeComponent: DashboardController,
      store: store
    };



    dataApi.getAndPushToStore('/rooms', this.state.store);
    this.state.store.addSocketEvents(this.props.user);
  }



  chatClick = () => {
    this.setState(() => ({
      activeComponent: ChatController
    }));
  }

  dashboardClick = () => {
    this.setState(() => ({
      activeComponent: DashboardController
    }));
  }

  logoutClick = () => {
    window.location.href = '/logout';
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