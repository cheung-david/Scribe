import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
var Link = require('react-router').Link;

class UserBox extends Component {
    componentDidMount(){
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    }
   render() {
        return (
            <div className="user_card">
            <div className="ui special cards">
                <div className="card">
                    <div className="blurring dimmable image">
                    <div className="ui dimmer">
                        <div className="content">
                        <div className="center">
                            <Link to={`user/${this.props.user._id}`}>
                                <div className="ui inverted button">
                                    View Profile
                                </div>
                            </Link> 
                        </div>
                        </div>
                    </div>
   
                        <img src={this.props.user.profilePic || "../../style/img/unknown_user.png"} />
               
                    </div>
                    <div className="content">
                    <a className="header">{this.props.user.fullName || this.props.user.email }</a>
                    <div className="meta">
                        <span className="date">Caption</span>
                        <div>{this.props.children}</div>
                    </div>
                    </div>
                    <div className="extra content">
                    <a>
                        <i className="users icon"></i>
                        2 Members
                    </a>
                    </div>
                </div>
            </div>
            </div>
        );    
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, actions)(UserBox);