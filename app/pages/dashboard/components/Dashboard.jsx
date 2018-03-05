import React from 'react';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    const localUser = this.props.store.getData().localUser;
    this.state = {
      localUser,
      showSubmit: false
    };
  }

  handleChatnameChange = (e) => {
    let {
      localUser
    } = this.state;
    localUser.chatname = e.target.value;
    this.setState({
      localUser,
      showSubmit: true
    });
  }

  handleBioChange = (e) => {
    let {
      localUser
    } = this.state;
    localUser.bio = e.target.value;
    this.setState({
      localUser,
      showSubmit: true
    });
  }

  submitChanges = () => {
    let user = this.state.localUser;
    this.props.store.updateUser(user);
    this.setState({
      showSubmit: false
    });
  }

  render() {
    return (

      <div>
        <h2>Dashboard {this.state.localUser.chatname}</h2>
        <div className="row">
          <label htmlFor="chatname">Chatname</label>
          <input
            type="text"
            id="chatname"
            value={this.state.localUser.chatname}
            onChange={this.handleChatnameChange}
          />
        </div>
        <div className="row">
          <label htmlFor="bio">Biography</label>
          <textarea
            id="bio"
            placeholder="Describe yourself..."
            rows="12"
            cols="40"
            style={{resize: 'none'}}
            value={this.state.localUser.bio}
            onChange={this.handleBioChange}
          />
        </div>
        {
          this.state.showSubmit ?
            <button
              className="button-primary u-full-width"
              onClick={this.submitChanges}>
              Submit changes
            </button> : null
        }

      </div>
    );
  }
}

module.exports = Dashboard;