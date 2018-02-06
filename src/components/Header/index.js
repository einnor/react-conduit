import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';


const Header = props => (
  <nav className="navbar navbar-light">
    <div className="header">

      <Link
        to="/"
        className="navbar-brand"
      >
        {props.appName.toLowerCase()}
      </Link>

      <LoggedOutView currentUser={props.currentUser} />
      <LoggedInView currentUser={props.currentUser} />

    </div>
  </nav>
);

Header.propTypes = {
  appName: PropTypes.string.isRequired,
  currentUser: PropTypes.node.isRequired,
};

export default Header;
