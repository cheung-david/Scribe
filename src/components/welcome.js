import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SignUp from './auth/signup';
import SignIn from './auth/signin';

class Feature extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    handleGuest() {
        // TODO log user in
        this.props.signinUser({ email: "feebas300@gmail.com", password: "temppassword" }, this.context.router);
    }
    componentWillMount() {
        if(this.props.authenticated){
            this.context.router.push('/myfeed');
       
     }
    }
    
    render() {
        return (<div className="landing">
                <header>
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-heading">Scribe</div>
                            <div className="intro-lead-in">Track And Share Experiences From Around The World</div>
                            <a href="#services" className="btn btn-xl" data-toggle="modal" data-target=".login-modal">Join Now!</a>
                            <button type="button" className="btn btn-default btn-xl" onClick={this.handleGuest.bind(this)}>Preview as Guest</button>
                            <div>
                                <a className="intro-download" href='https://play.google.com/store/apps/details?id=com.dc.scribe&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                <img alt='Get it on GooglePlay' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="modal fade login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title" id="myModalLabel"></h4>
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li role="presentation" className="active"><a href="#signin" aria-controls="signin" role="tab" data-toggle="tab">Sign In</a></li>
                                        <li role="presentation"><a href="#signup" aria-controls="signup" role="tab" data-toggle="tab">Sign Up</a></li>
                                    </ul>
                                </div>
                                    <div className="modal-body">
                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane active" id="signin"><SignIn /></div>
                                            <div role="tabpanel" className="tab-pane" id="signup"><SignUp /></div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                    </div>
                            </div>
                        </div>
                    </div>
                </header>
                 <section id="services">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">About</h2>
                            <h3 className="section-subheading text-muted">A brief summary about Scribe</h3>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                <i className="fa fa fa-android fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Android</h4>
                            <p className="text-muted">Currently only supports Android and Web. Sorry iPhone is not currently supported, stay tuned! <br/><a href="https://play.google.com/store/apps/details?id=com.dc.scribe">Download On GooglePlay!</a></p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                <i className="fa fa-camera-retro fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Share Photos</h4>
                            <p className="text-muted">Mobile and web photos synchronized. Take photos on your mobile and view them on your phone or computer. Share experiences through photos, look back at memories and have fun!</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                <i className="fa fa-code fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="service-heading">Updates</h4>
                            <p className="text-muted">We are currently in Beta. This is just the beginning of the journey. New and cool features still rolling in!</p>
                        </div>
                    </div>
                </div>
            </section>
                </div>);
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Feature);