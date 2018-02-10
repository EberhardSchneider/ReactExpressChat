import React from 'react';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (<div id="login-view" className="container center">
      <form action="/Auth/signIn" method="post">
        <div className="row">
          <label htmlFor="username">Username:</label>
          <input className="four columns"
            name="username"
            id="username"
            type="text"
            autoFocus={true}/>
        </div>
        <div className="row">
          <label htmlFor="password">Password:</label>
          <input className="four columns"
            name="password"
            id="password"
            type="password"/>
        </div>
        <button>Send</button>
      </form>
    </div>);
  }
}

module.exports = LoginView;