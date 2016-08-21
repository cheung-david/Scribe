import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {

        }    
    }
    
    componentWillMount() {
        this.props.clearUpdateUser()
    }

    readImage(input) {
        var uploadFile = input.refs.file;
        if (uploadFile && uploadFile.files[0]) {
            console.log("reading image");
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#profilepic').attr('src', e.target.result);
            }

            reader.readAsDataURL(uploadFile.files[0]);
        }
    }


    componentDidMount() {
        $('.centered.card .image').dimmer({
            on: 'hover'
        });
        $("#imgInput").change(() => {
            console.log("file upload changed");
            this.readImage(this);
        });
    }
    
    
    handleFormSubmit(formProps) {
        console.log(formProps);
        this.props.updateUser(formProps);
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
        if(this.props.updatedUser) {
            return (
              <div className="alert alert-success">
                <strong>Your profile has been updated! Refresh the page to see the changes.</strong>
              </div>  
            );            
        }    
    }   
     
     renderProfilePicSuccess() {
        if(this.props.updatedPic) {
            return (
              <div className="alert alert-success">
                <strong>Your profile picture has been updated! Refresh the page to see the changes.</strong>
              </div>  
            );            
        }    
     }
     
    handleSubmit(e) {
        e.preventDefault();
        var host = 'http://52.39.6.195';
        var uploadURL = host + '/api/feed'; 
        var uploadFile = this.refs.file;
        //console.log(uploadFile);
        if(uploadFile.value !== '') {
            var form = new FormData();
            form.append("upload", uploadFile.files[0]);
            this.props.uploadProfilePic(form);
            uploadFile.value = '';
        }       
    }
         
        
    renderProfilePicture() {
        if(this.props.currentUser){
            return this.props.currentUser.profilePic || "style/img/unknown_user.png";
        } else {
            return "";
        }
    }
    
    renderForm() {
        if(this.props.currentUser) {
            const { fields: { email, name, description }} = this.props;          
             return (
                    <span>
                        <fieldset className="form-group">
                            <label>Email:</label>
                            <input {...email} className="form-control" type="email" defaultValue={this.props.currentUser.email || ''} value={this.props.value} />
                            {email.touched && email.error && <div className="error">{email.error}</div>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Full Name:</label>
                            <input {...name} className="form-control" type="text" defaultValue={this.props.currentUser.fullName || ''} value={this.props.value} />
                            {name.touched && name.error && <div className="error">{name.error}</div>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Bio:</label>
                            <textarea {...description} rows="3" cols="50" className="form-control" defaultValue={this.props.currentUser.description || ''} value={this.props.value}>
                            </textarea>
                        </fieldset>
                    </span>);     
        } else {
            return <p> Error loading page, please refresh the page or try again later. Sorry for the inconvenience! </p>
        }
    }
        
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="ui centered card">
                        <div className="blurring dimmable image">
                            <div className="ui dimmer">
                                <div className="content">
                                    <div className="center">
                                        <div className="form-group">
                                            <label>Edit Profile Picture</label>
                                            <input id="imgInput" ref="file" type="file" name="uploadPic" className="uploadPic form-control" />
                                            <br/>
                                            <button className="ui inverted button" onClick={this.handleSubmit.bind(this)}>  Save Changes </button>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                            <img id="profilepic" src={this.renderProfilePicture()} />
                        </div>
                        <div className="content">
                            <span className="header">Edit profile picture</span>
                        </div>
                    </div>
                    {this.renderProfilePicSuccess()}
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
        updatedUser: state.feed.updated,
        updatedPic: state.feed.updatedPic
    };
}

function validate(formProps) {
    const errors = {};
    if(!formProps.email) {
        errors.email = 'Please enter an email';
    }
    if(!formProps.name) {
        errors.name = 'Please enter your name';
    }     
    return errors;    
}

export default reduxForm({
    form: 'editProfile',
    fields: ['email', 'name', 'description'],
    validate
}, mapStateToProps, actions)(EditProfile);      

