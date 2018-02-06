import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = props => (
  <div>
    {
        props.comments.map(comment => (
          <Comment
            comment={comment}
            currentUser={props.currentUser}
            slug={props.slug}
            key={comment.id}
          />
          ))
      }
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.node.isRequired,
  currentUser: PropTypes.node.isRequired,
  slug: PropTypes.string.isRequired,
};

export default CommentList;
