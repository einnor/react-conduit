import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ArticleActions from './ArticleActions';

const ArticleMeta = (props) => {
  const { article } = props;

  return (
    <div className="article-meta">
      <Link to={`@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>

        <ArticleActions canModify={props.canModify} article={article} />
      </div>
    </div>
  );
};

ArticleMeta.propTypes = {
  article: PropTypes.node.isRequired,
  canModify: PropTypes.bool.isRequired,
};

export default ArticleMeta;
