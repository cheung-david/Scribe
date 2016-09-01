import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignIn extends Component {
    static contextTypes = {
        router: React.PropTypes.object //React.PropTypes.func.isRequired //
    };
                
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }
    
    handleFormSubmit({ email, password }) {
        // TODO log user in
        this.props.signinUser({ email, password }, this.context.router);
    }
    
    handleFacebookAuth() {
        this.props.signinUserFB(); 
    }
    
    handleTwitterAuth() {
        this.props.signinUserTW(); 
    }
    
    renderAlert() {
        if(this.props.errorMessage) {
            return (<div className="alert alert-danger">
                <strong>Oops!</strong> {this.props.errorMessage}
            </div>);
        }
    }
    
            
    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '631454020338241',
                cookie     : true,  // enable cookies to allow the server to access
                                    // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.1' // use version 2.1
            });

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.
           /* FB.getLoginStatus(function(response) {
                this.statusChangeCallback(response);
            }.bind(this)); */
        }.bind(this);

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    successAPI() {
        // Image retrieval http://graph.facebook.com/userid_here/picture?type=large
        console.log('Welcome!  Fetching your information.... ');
        var self = this;
        FB.api('/me', function(response) {
            //console.log(response);
            console.log('Successful login for: ' + response.name    );
            document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
            self.context.router.push('/myfeed');
        });

    }

    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        //console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            this.props.signinUserFB(response.authResponse.accessToken, this.context.router);
            // Logged into your app and Facebook.
            this.successAPI();
        } else if (response.status === 'not_authorized'  || response.status=='unknown') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Something went wrong. Please click ' +
            'the Facebook button to try again.';
            this.setState({ error: true });
            //FB.login(this.getLoginStatus, { scope: 'email, public_profile, user_friends' });
            // FB.login(function(responseLogin) {
            //         FB.api('/me', function(responseMe) {
            //             if (!responseMe.id){ 
            //                 return false;
            //             } else {
            //                 this.props.signinUserFB(response.authResponse.accessToken, this.context.router);
            //                 // Logged into your app and Facebook.
            //                 this.successAPI();
            //             }
            //         });
            // });
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Something went wrong. Please click ' +
            'the Facebook button to try again.';
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    checkLoginState() {
        FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    handleClick() {
        FB.login(this.checkLoginState(), { scope: 'email, public_profile, user_friends' });
    }

    render() {
        const { handleSubmit, fields: { email, password }} = this.props;
        return (
            <div className="">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <input {...email} className="form-control" type="email" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input {...password} className="form-control" type="password" />
                    </fieldset>    
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign in</button>        
                </form>  
                <div id="status" className={this.state.error ? "alert alert-warning" : ""}>
                </div>
                <div className="loginButton">
                    <a href="#" onClick={this.handleClick.bind(this)}>
                        <img id="loginBtnImg" src="../../style/img/fbLoginBtn.png" alt="Sign-In with Facebook" />
                    </a>
                </div>    
            </div>      
        );
    }
}

// For twitter authentication in the future
// <a href="#" onClick={this.handleTwitterAuth}>
//     <img id="loginBtnImg" src="../../style/img/twLoginBtn.png" alt="Sign-In with Twitter" />
// </a>

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn);