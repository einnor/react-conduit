import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';

const ArticleList = (props) => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">No articles are here...yet.</div>
    );
  }

  return (
    <div>
      {
        props.articles.map(article => (
          <ArticlePreview article={article} key={article.slug} />
          ))
      }

      <ListPagination
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
        onSetPage={props.onSetPage}
      />
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.node.isRequired,
  articlesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onSetPage: PropTypes.func.isRequired,
};

export default ArticleList;
