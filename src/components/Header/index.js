import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="header">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />

        </div>
      </nav>
    );
  }
}

export default Header;
