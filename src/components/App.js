import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Settings from './Settings';
import Article from './Article';
import Profile from './Profile';
import Editor from './Editor';
import agent from '../agent';
import history from '../history';

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token }),
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
});

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      history.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />

          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/articles/:id" component={Article} />
          <Route exact path="/@:username" component={Profile} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/editor/:slug" component={Editor} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  appName: PropTypes.string.isRequired,
  currentUser: PropTypes.node.isRequired,
  onLoad: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  onRedirect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
