import { Link } from 'react-router-dom';
import React, { Component} from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="header">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="login" className="nav-link">
                Sign in
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    );
  }
}

export default Header;
