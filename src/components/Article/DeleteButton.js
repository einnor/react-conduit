import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) => dispatch({ type: 'DELETE_COMMENT', payload, commentId }),
});

const DeleteButton = (props) => {
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del} role="button" tabIndex={0} onKeyPress={null} />
      </span>
    );
  }

  return null;
};

DeleteButton.propTypes = {
  slug: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
