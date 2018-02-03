import Header from './Header';
import Home from './Home';
import Login from './Login';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const mapStateToProps = state => ({
  appName: state.common.appName
});

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header appName={ this.props.appName } />

          <Route exact path="/" component={ Home } />
          <Route path="/login" component={ Login } />
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, () => ({})) (App);
