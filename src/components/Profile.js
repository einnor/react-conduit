import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';
import agent from '../agent';
import EditProfileSettings from './EditProfileSettings';
import FollowUserButton from './FollowUserButton';

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({ type: 'FOLLOW_USER', payload: agent.Profile.follow(username) }),
  onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
  onUnfollow: username => dispatch({ type: 'UNFOLLOW_USER', payload: agent.Profile.unfollow(username) }),
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
});

class Profile extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Articles.byAuthor(this.props.match.params.username),
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`@${this.props.profile.username}`}
          >
            My Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`@${this.props.profile.username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { profile } = this.props;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
    this.props.currentUser.username === this.props.profile.username;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" alt={profile.username} />
                <h4>{ profile.username }</h4>
                <p>{ profile.bio }</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                { this.renderTabs() }
              </div>

              <ArticleList
                articles={this.props.articles}
              />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.node.isRequired,
  currentUser: PropTypes.node.isRequired,
  username: PropTypes.string.isRequired,
  match: PropTypes.node.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onUnload: PropTypes.func.isRequired,
  articles: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
