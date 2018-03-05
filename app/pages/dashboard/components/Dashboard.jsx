import React from 'react';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.store.getData().localUser;
  }

  handleChatnameChange = (e) => {
    this.setState({
      chatname: e.target.value
    });
  }

  handleBioChange = (e) => {
    this.setState({
      bio: e.target.value
    });
  }

  submitChanges = () => {
    let user = this.state;
    user.chatname = this.state.chatname;
    user.bio = this.state.bio;
    this.props.store.updateUser(user);
  }

  render() {
    return (

      <div>
        <h2>Dashboard {this.state.chatname}</h2>
        <div className="row">
          <label htmlFor="chatname">Chatname</label>
          <input
            type="text"
            id="chatname"
            value={this.state.chatname}
            onChange={this.handleChatnameChange}
          />
        </div>
        <div className="row">
          <label htmlFor="bio">Biography</label>
          <input
            type="text"
            id="bio"
            value={this.state.bio}
            onChange={this.handleBioChange}
          />
        </div>
        <button
          className="button-primary u-full-width"
          onClick={this.submitChanges}>
          Submit changes
        </button>




      </div>
    );
  }
}

module.exports = Dashboard;