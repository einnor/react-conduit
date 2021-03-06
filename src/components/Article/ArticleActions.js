import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: 'DELETE_ARTICLE', payload }),
});

const ArticleActions = (props) => {
  const { article } = props;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug));
  };

  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    );
  }

  return (
    <span />
  );
};

ArticleActions.propTypes = {
  article: PropTypes.node.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  canModify: PropTypes.func.isRequired,
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
