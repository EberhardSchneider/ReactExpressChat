import React from 'react';

class ChatInputMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.socket.emit('new message', {message: this.state.message});
    this.setState({message: ''});
  }

  handleInputChange(e) {
    this.setState({message: e.target.value});
  }
  render() {
    return (<form onSubmit={this.handleSubmit} className="row">
      <input onChange={this.handleInputChange} value={this.state.message} className="ten columns columns" type="text"/>
      <button className="button-primary two columns">SEND</button>
    </form>);
  }
}

module.exports = ChatInputMessage;
