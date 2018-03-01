import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Show User Dashboard</h1>
        <UsersOnline/>
      </div>
    );
  }
}

module.exports = Dashboard;