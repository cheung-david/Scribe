import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
var Link = require('react-router').Link;

class UserBox extends Component {
    componentWillMount() {
        
    }
    
    numFollowers() {
        if(this.props.user && this.props.user.followers) {
            return <span> {this.props.user.followers.length} </span>;
        } else {
            return <span> 0 </span>;
        }
    }
    
    userDescription() {
        var desc = this.props.user.description;
        if(this.props.user && this.props.user.description) {
            if(desc.length > 23) {
                return <span> {desc.substring(0,23)}... </span>
            } else {
                return <span> {desc}  </span>
            }
        } else {
            return <span>Empty Bio</span>
        }
    }
    
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
   
                        <img className="user-image-height" src={this.props.user.profilePic || "../../style/img/unknown_user.png"} />
               
                    </div>
                    <div className="content">
                    <a className="header">{this.props.user.fullName || this.props.user.email }</a>
                    <div className="meta">
                        <span className="date">{this.userDescription()}</span>
                        <div>{this.props.children}</div>
                    </div>
                    </div>
                    <div className="extra content">
                    <a>
                        <i className="users icon"></i>
                        {this.numFollowers()} Followers
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