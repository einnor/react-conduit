import React, { Component} from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="header">
          <a className="navbar-brand">
            { this.props.appName.toLowerCase() }
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
