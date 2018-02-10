import React from 'react';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (<div id="login-view" className="container center">
      <div className="six columns u-pull-left">
        <h2>LOGIN</h2>
        <form action="/Auth/signIn" method="post">
          <div className="row">
            <label htmlFor="username">Username:</label>
            <input className="u-full-width"
              name="username"
              id="username"
              type="text"
              autoFocus={true}/>
          </div>

          <div className="row">
            <label htmlFor="password">Password:</label>
            <input className="u-full-width"
              name="password"
              id="password"
              type="password"/>
          </div>
          <button>Send</button>
        </form>
      </div>
      <div className="six columns">
        <h2>REGISTER</h2>
        <form action="/Auth/signUp" method="post">
          <div className="row">
            <label htmlFor="username">Username</label>
            <input className="u-full-width"
              name="username"
              id="username"
              type="text"
              autoFocus={true}/>
          </div>

          <div className="row">
            <label htmlFor="password">Password</label>
            <input className="u-full-width"
              name="password"
              id="password"
              type="password"/>
          </div>

          <div className="row">
            <label htmlFor="passwordVerify">Repeat Password</label>
            <input className="u-full-width"
              name="passwordVerify"
              id="passwordVerify"
              type="password"/>
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>);
  }
}

module.exports = LoginView;