import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="login" className="nav-link">
            Sign In
          </Link>
        </li>

        <li className="nav-item">
          <Link to="register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

LoggedOutView.propTypes = {
  currentUser: PropTypes.node.isRequired,
};

export default LoggedOutView;
