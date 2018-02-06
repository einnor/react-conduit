import React from 'react';
import PropTypes from 'prop-types';

const FollowUserButton = (props) => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (props.following) {
      props.unFollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}
    >
      <i className="ion-plus-round" />
      &nbsp;
      { props.user.following ? 'Unfollow' : 'Follow' } { props.user.username }
    </button>
  );
};

FollowUserButton.propTypes = {
  isUser: PropTypes.bool.isRequired,
  following: PropTypes.bool.isRequired,
  user: PropTypes.node.isRequired,
  username: PropTypes.string.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
};

export default FollowUserButton;
