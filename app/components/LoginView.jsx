import React from 'react';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange(e) {
    this.setState({userName: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginNewUser(this.state.userName);
  }

  render() {
    return (<div id="login-view" className="container center">
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <h2>Pick a username:</h2>
          <input className="eight columns" value={this.state.userName} onChange={this.handleInputChange} type="text"/>
          <button>Connect</button>
        </form>

      </div>
    </div>);
  }
}

module.exports = LoginView;
