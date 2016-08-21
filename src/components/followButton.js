import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FollowButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: "Follow",
            action: ""
        }    
    }
    
    OnChange() {
        
    }
    
    componentWillMount() {
        this.props.fetchFollowing();
    }
    
    generateFollowing() {
        if(this.props.following){
            console.log(this.props.following);
            var following = this.props.following.map(follower => {
                return (<p key={follower}> {follower} </p>);
            });
            return following;
        }
    }
    
    render() {
        if(this.props.currentUser._id === this.props.userId){
            return <span></span>;
        } 
                
        var text, action;
                
        if(this.props.following && this.props.following.indexOf(this.props.userId) > -1) {
            text = 'Unfollow';
            action = this.unfollow.bind(this);
        } else {
            console.log(this.props.following, this.props.userId);
            text = 'Follow';
            action = this.follow.bind(this);
        }
        return (<div>
        <button className="btn btn-primary" onClick={action}> {text} </button>
        </div>);
    }
            
    unfollow() {
        this.props.unfollow(this.props.userId);
        this.props.removeFollowerList(this.props.userId);
    }
    
    follow() {
        //console.log(this.props.following);
        this.props.notify(this.props.userId, { 
            action: "followed",
            from: this.props.currentUser.fullName,
            content: "" 
        });
        this.props.follow(this.props.userId);
        this.props.insertFollowerList(this.props.userId);
    }                
}

function mapStateToProps(state) {
    return {
        following: state.feed.following,
        currentUser: state.feed.currentUser
    }    
}

export default connect(mapStateToProps, actions)(FollowButton);