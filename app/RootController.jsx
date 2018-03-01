import React from 'react';
import Dashboard from './pages/dashboard/components/Dashboard.jsx';
import ChatController from './pages/chat/components/ChatController.jsx';



export default class RootController extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      activeComponent: Dashboard
    };
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
    console.log('LOGOUT');
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
        <Active user={this.props.user}/>
      </div>
    </div>;
  }
}