import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {

        }    
    }
    
    componentWillMount() {
        this.props.clearUpdatePass();
    }
    
    
    handleFormSubmit(formProps) {
        console.log(formProps);
        this.props.changePassword(formProps);
    }
    
    renderAlert() {
        if(this.props.errorMessage) {
            return (
              <div className="alert alert-danger">
                <strong>Oops!</strong> {this.props.errorMessage}
              </div>  
            );
        }
    }
        
    renderSuccess() {
        if(this.props.updatedPassword) {
            return (
              <div className="alert alert-success">
                <strong>Your password has been updated! </strong>
              </div>  
            );            
        }    
    }   
    
    renderForm() {
        if(this.props.currentUser) {
            if(this.props.currentUser.socialMedia) {
                return <p> You registered under external social media. Your password is synced there. </p>
            } else {
                const { fields: { oldPassword, passwordConfirm, password } } = this.props;          
                return (
                        <span>
                            <fieldset className="form-group">
                                <label>Current Password:</label>
                                <input {...oldPassword} className="form-control" type="password" />
                                {oldPassword.touched && oldPassword.error && <div className="error">{oldPassword.error}</div>}
                            </fieldset>
                            <fieldset className="form-group">
                                <label>New Password:</label>
                                <input {...password} className="form-control" type="password" />
                                {password.touched && password.error && <div className="error">{password.error}</div>}
                            </fieldset> 
                            <fieldset className="form-group">
                                <label>Confirm New Password:</label>
                                <input {...passwordConfirm} className="form-control" type="password" />
                                {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                            </fieldset>                           
                        </span>);  
            }   
        } else {
            return <p> Error loading page, please refresh the page or try again later. Sorry for the inconvenience! </p>
        }
    }
        
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderForm()}
                    {this.renderAlert()}   
                    {this.renderSuccess()}       
                    <button action="submit" className="btn btn-primary">Save!</button>        
                </form>
          </div> 
        );
    }  
}


function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error, 
        updatedPassword: state.feed.updatedPass,
    };
}

function validate(formProps) {
    const errors = {};
    if(formProps.password && formProps.password.length < 6 ) {
        errors.password = 'Please enter a password with atleast 6 characters!';
    }
    
    if(formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Your passwords do not match';
    }
    if(!formProps.password) {
        errors.password = 'Please enter a password';
    }
    if(!formProps.oldPassword) {
        errors.oldPassword = 'Please enter a password';
    }
    if(!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }   
    return errors;    
}

export default reduxForm({
    form: 'changePassword',
    fields: ['oldPassword', 'passwordConfirm', 'password'],
    validate
}, mapStateToProps, actions)(ChangePassword);      

