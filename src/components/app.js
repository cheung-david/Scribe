import React, { Component } from 'react';
import Header from './header';


export default class App extends Component {
  generateNav() {
    if(this.props.location.pathname !== '/' && this.props.location.pathname !== '/Scribe/') {
      return <Header socket={this.props.route.socket} location={this.props.location} />;
    }
  }        
  render() {
    return (
      <div>
        {this.generateNav()}
        {this.props.children}
      </div>
    );
  }
}
