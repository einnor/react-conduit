import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { Profile, mapStateToProps } from './Profile';

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({ type: 'FOLLOW_USER', payload: agent.Profile.follow(username) }),
  onUnfollow: username => dispatch({ type: 'UNFOLLOW_USER', payload: agent.Profile.unfollow(username) }),
  onLoad: payload => dispatch({ type: 'PROFILE_FAVORITES_PAGE_LOADED', payload }),
  onUnload: () => dispatch({ type: 'PROFILE_FAVORITES_PAGE_UNLOADED' }),
});

class ProfileFavorites extends Component {
  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
