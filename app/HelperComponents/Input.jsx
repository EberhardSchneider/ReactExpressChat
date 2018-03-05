import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.inputvalue
    };
  }

  handleInputChange(e) {
    this.setState({
      inputvalue: e.target.value
    });
  }

  submit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.inputValue);
  }

  render() {
    return (
      <form onSubmit={this.submitvalue}>
        <input type="text"
          value={this.state.inputvalue}
          onChange={this.handleInputChange}
          {...this.props} />
      </form>
    );
  }
}

Input.propTypes = {
  inputvalue: PropTypes.string,
  submitvalue: PropTypes.func.isRequired
};