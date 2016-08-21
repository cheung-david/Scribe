import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class SignOut extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() {
        this.props.signoutUser();
    }
    
    componentDidMount() {
        var self = this;
        setTimeout(function(){ self.context.router.push('/'); }, 2000);
    }
    
    render() {
        return (<div className="container">
                    <h2> Logging out </h2>
                    <h3>See you again next time!</h3>
                </div>);
    }
}

export default connect(null, actions)(SignOut);