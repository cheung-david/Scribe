import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
    handleFormSubmit(formProps) {
        // Call action creator to sign up the user
        this.props.signupUser(formProps);
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
        
    render() {
        const { handleSubmit, fields: { email, name, password, passwordConfirm }} = this.props;
        
        return (
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
                <label>Email:</label>
                <input {...email} className="form-control" type="email" />
                {email.touched && email.error && <div className="error">{email.error}</div>}
            </fieldset>
            <fieldset className="form-group">
                <label>Full Name:</label>
                <input {...name} className="form-control" type="text" />
                {name.touched && name.error && <div className="error">{name.error}</div>}
            </fieldset>
            <fieldset className="form-group">
                <label>Password:</label>
                <input {...password} className="form-control" type="password" />
                {password.touched && password.error && <div className="error">{password.error}</div>}
            </fieldset> 
            <fieldset className="form-group">
                <label>Confirm Password:</label>
                <input {...passwordConfirm} className="form-control" type="password" />
                {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
            </fieldset>       
            {this.renderAlert()}          
            <button action="submit" className="btn btn-primary">Sign Up!</button>        
          </form>  
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

function validate(formProps) {
    const errors = {};
    if(formProps.password && formProps.password.length < 6 ) {
        errors.password = 'Please enter a password with atleast 6 characters!';
    }
    
    if(formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Your passwords do not match';
    }
    if(!formProps.email) {
        errors.email = 'Please enter an email';
    }
    if(!formProps.name) {
        errors.name = 'Please enter your name';
    }
    if(!formProps.password) {
        errors.password = 'Please enter a password';
    }
    if(!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }        
    return errors;    
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'name', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(SignUp);