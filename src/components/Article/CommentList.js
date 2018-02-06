import Comment from './Comment';
import React from 'react';

const CommentList = props => {
  return (
    <div>
      {
        props.comments.map(comment => {
          return(
            <Comments
              comment={ comment }
              currentUser={ props.currentUser }
              slug={ props.slug }
              key={ comment.id } />
          );
        });
      }
      </div>
  ));
};

export default CommentList;
