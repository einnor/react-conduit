import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import agent from '../agent';
import ListErrors from './ListErrors';

const mapStateToProps = state => ({
  ...state.editor,
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({ type: 'ADD_TAG' }),
  onLoad: payload => dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onRemoveTag: tag => dispatch({ type: 'REMOVE_TAG', tag }),
  onSubmit: payload => dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
  onUnload: () => dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) => dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value }),
});

class Editor extends Component {
  constructor() {
    super();

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = (ev) => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagLists: this.props.tagList,
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);

      this.props.onSubmit(promise);
    };
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    return this.props.onLoad(null);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      return this.props.onLoad(null);
    }
    return this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return null;
  }
}

Editor.propTypes = {
  onAddTag: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUnload: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tagList: PropTypes.node.isRequired,
  articleSlug: PropTypes.string.isRequired,
  match: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
