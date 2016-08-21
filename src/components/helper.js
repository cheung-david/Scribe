import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import EditProfile from './editProfile';
import PasswordChange from './passwordChange';

// Helper used as a wrapper to initialize redux form when retrieving this.props
class Helper extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Set local states if required
        }    
    }

    componentWillMount() {
        this.props.fetchUser();
    }    
        
    render() {
        var myInitialValues;
        if(this.props.currentUser){
            myInitialValues = {
                initialValues: {
                    name: this.props.currentUser.fullName,
                    email: this.props.currentUser.email,
                    description: this.props.currentUser.description
                }
            }
            return (
                <div className="container">
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Edit Profile</a></li>
                        <li role="presentation"><a href="#password" aria-controls="password" role="tab" data-toggle="tab">Change Password</a></li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="profile"> <EditProfile {...myInitialValues} currentUser={this.props.currentUser} /> </div>
                        <div role="tabpanel" className="tab-pane" id="password"> <PasswordChange currentUser={this.props.currentUser} /> </div>
                    </div>         
                </div>                                
            );
        } else {
            return <p> Error loading page, please refresh the page or try again later. Sorry for the inconvenience! </p>;
        }
    }
}

function mapStateToProps(state) {
    return { currentUser: state.feed.currentUser };
}

export default connect(mapStateToProps, actions)(Helper);