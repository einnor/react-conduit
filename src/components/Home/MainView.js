import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from '../ArticleList';
import agent from '../../agent';

const YourFeedTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <button
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

YourFeedTab.propTypes = {
  token: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <button
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </button>
    </li>
  );
};

GlobalFeedTab.propTypes = {
  tab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: 'CHANGE_TAB', tab, payload }),
});

const MainView = props => (
  <div className="col-md-9">
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <YourFeedTab
          token={props.token}
          tab={props.tab}
          onTabClick={props.onTabClick}
        />

        <GlobalFeedTab
          tab={props.tab}
          onTabClick={props.onTabClick}
        />
      </ul>
    </div>

    <ArticleList articles={props.articles} />
  </div>
);

MainView.propTypes = {
  token: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  articles: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
