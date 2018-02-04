import Header from './Header';
import Home from './Home';
import Login from './Login';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import agent from '../agent';
import history from '../history';

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token }),
  onRedirect: () => dispatch({ type: 'REDIRECT' })
});

class App extends Component {

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if(token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.redirectTo) {
      history.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <Router history={ history }>
        <div>
          <Header
            appName={ this.props.appName }
            currentUser={ this.props.currentUser} />

          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={ Login } />
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
