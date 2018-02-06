import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

const Comment = (props) => {
  const { comment } = props;
  const show = props.currentUser && props.currentUser.username === comment.author.username;

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{ comment.body }</p>
      </div>
      <div className="card-footer">
        <Link
          to={`@${comment.author.username}`}
          className="comment-author"
        >
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link
          to={`@${comment.author.username}`}
          className="comment-author"
        >
          { comment.author.username }
        </Link>
        <span className="date-posted">
          { new Date(comment.createdAt).toDateString() }
        </span>
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.node.isRequired,
  currentUser: PropTypes.node.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Comment;
