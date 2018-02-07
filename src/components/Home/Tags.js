import React from 'react';
import PropTypes from 'prop-types';
import agent from '../../agent';

const Tags = (props) => {
  const { tags } = props;

  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map((tag) => {
            const handleClick = (ev) => {
              ev.preventDefault();
              props.onClickTag(tag, agent.Articles.byTag(tag));
            };

            return (
              <span
                role="button"
                onKeyPress={null}
                tabIndex={0}
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}
              >
                {tag}
              </span>
            );
          })
        }
      </div>
    );
  }

  return null;
};

Tags.propTypes = {
  tags: PropTypes.node.isRequired,
};

export default Tags;
