import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UserBox from './userBox';
import FollowButton from './followButton';

class UserList extends Component {
    componentWillMount() {
        this.props.clearUser();
        this.props.fetchUsers();
        // Fetch Current User
        this.props.fetchUser();
    }
    
    generateUserCards(){
        //console.log(this.props.currentUser, this.props.users);
        if(this.props.users && this.props.currentUser){
            var items = this.props.users.filter(function(user){
                return this.props.currentUser._id !== user._id;
            }.bind(this)).map(function (user){ 
                return (<div className="float_left" key={user._id}>
                                <UserBox user={user}>
                                    <FollowButton userId={user._id}/>
                                </UserBox>
                        </div>);
            });
            return items;
        } else {
            return "";
        }  
    }
    
    render() {
        return (<div className="container">
            <div>{ this.generateUserCards() }</div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        users: state.feed.users,
        currentUser: state.feed.currentUser
    }
}

export default connect(mapStateToProps, actions)(UserList);