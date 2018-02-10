import React from 'react';
import axios from 'axios';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (<div id="login-view" className="container center">
      <div className="row">
        <form action="/Auth/signIn" method="post">
          <h2>Username:</h2>
          <input className="eight columns"
            name="username"
            type="text"
            autoFocus={true}/>
          <h2>Password:</h2>
          <input className="eight columns"
            name="password"
            type="password"/>
          <button>Send</button>
        </form>
      </div>
    </div>);
  }
}

module.exports = LoginView;