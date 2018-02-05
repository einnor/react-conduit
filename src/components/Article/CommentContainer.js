import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ListErrors from '../ListErrors';

const CommentContainer = props => {
  if(props.currentUser) {
    return(
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={ props.errors } />
          <CommentInput slug={ props.slug } currentUser={ props.currentUser } />
        </div>

        <CommentList
            comments={ props.comments }
            slug={ props.slug }
            currentUser={ props.currentUser } />
      </div>
    );
  }
  else {
    return(
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="login">Sign In</Link> or <Link to="register">Sign Up</Link>
          &nbsp; to add comments on this platform
        </p>

        <CommentList
            comments={ props.comments }
            slug={ props.slug }
            currentUser={ props.currentUser } />
      </div>
    );
  }
};

export default CommentContainer;
