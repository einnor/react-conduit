import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListErrors from './ListErrors';
import agent from '../agent';
import SettingsForm from './SettingsForm';

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: 'LOGOUT' }),
  onSubmitForm: user => dispatch({ type: 'SETTINGS_SAVED', payload: agent.Auth.save(user) }),
});

const Settings = props => (
  <div className="auth-page">
    <div className="container page">
      <div className="row">

        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Your Settings</h1>
          <p className="text-xs-center">
            <Link to="register">
                Need an account?
            </Link>
          </p>

          <ListErrors errors={props.errors} />

          <SettingsForm
            currentUser={props.currentUser}
            onSubmitForm={props.onSubmitForm}
          />

          <hr />

          <button
            className="btn btn-outline-danger"
            onClick={props.onClickLogout}
          >
              Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
);

Settings.propTypes = {
  errors: PropTypes.node.isRequired,
  currentUser: PropTypes.node.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
