import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoggedInView = (props) => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="editor" className="nav-link">
            <i className="ion-compose" /> New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="settings" className="nav-link">
            <i className="ion-gear-a" /> Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`@${props.currentUser.username}`}
            className="nav-link"
          >
            <img
              src={props.currentUser.image}
              className="user-pic"
              alt={props.currentUser.username}
            />
            { props.currentUser.username }
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

LoggedInView.propTypes = {
  currentUser: PropTypes.node.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default LoggedInView;
