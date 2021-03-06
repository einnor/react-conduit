import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SettingsForm extends Component {
  constructor() {
    super();

    // State is not kept in sync with redux
    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    };

    // Function that updates the state based on an event
    this.updateState = field => (ev) => {
      const { state } = this;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image,
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email,
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="URL of profile picture"
            value={this.state.image}
            onChange={this.updateState('image')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.updateState('username')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Short bio about you"
            value={this.state.bio}
            onChange={this.updateState('bio')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.updateState('email')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.updateState('password')}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={this.props.inProgress}
        >
          Update Settings
        </button>

      </form>
    );
  }
}

SettingsForm.propTypes = {
  currentUser: PropTypes.node.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default SettingsForm;
