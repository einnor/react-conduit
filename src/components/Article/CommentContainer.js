import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ListErrors from '../ListErrors';

const CommentContainer = (props) => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={props.errors} />
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    );
  }
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="login">Sign In</Link> or <Link to="register">Sign Up</Link>
          &nbsp; to add comments on this platform
      </p>

      <CommentList
        comments={props.comments}
        slug={props.slug}
        currentUser={props.currentUser}
      />
    </div>
  );
};

CommentContainer.propTypes = {
  currentUser: PropTypes.node.isRequired,
  errors: PropTypes.node.isRequired,
  comments: PropTypes.node.isRequired,
  slug: PropTypes.string.isRequired,
};

export default CommentContainer;
