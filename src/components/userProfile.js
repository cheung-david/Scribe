import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FollowButton from './followButton';
import Card from './card';
var Link = require('react-router').Link;

class UserProfile extends Component {
    componentWillMount() {
        this.props.clearUser();
        var id = this.props.params.id;
        if(id) {
            this.props.fetchUser(id);
            this.props.fetchUserPosts(id);
            this.props.fetchFollowerList(id);
        } else {
            this.props.fetchUser();
            this.props.fetchUserPosts();
            this.props.fetchFollowerList();
        }
    }
    
    generatePosts() {
        var socket = this.props.route.socket;
        if(this.props.userPosts) {
            var posts = this.props.userPosts.map(function(image) {
                var imgLink = "https://s3-us-west-2.amazonaws.com/photogriddemo/" + image.filename; 
                return (<div className="profile_left" key={image._id}>
                            <a href="#" data-toggle="modal" data-target={"." + image._id}>

                                <img className="grid_gallery" src={imgLink} />
                            </a>
                            <div className={"modal fade " + image._id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div className="modal-dialog modal-lg" role="document">
           
                                            <div className="shift_left">
                                                <Card profilePic={image.authorPic} authorId={image.authorId} authorName={image.authorName} image={imgLink} likes={image.likes} 
                                                    id={image._id} date={image.date} socket={socket}
                                                    comments={image.comments} /> 
                                            </div>
                                </div>
                            </div>                            
                        </div>
                );
            });
            return posts;
        }
        return "";
    }
    
    renderEdit() {
        if(this.props.currentUser && !this.props.params.id) {
            return (
                <Link to="/user/edit">
                    <button className="btn btn-primary">Edit Profile</button>
                </Link>
            );
        }
    }
    
    generateUserContent() {
        if(this.props.user){
           var profilePic = this.props.user.profilePic ? this.props.user.profilePic : "style/img/unknown_user.png"; 
           return  ([<div className="ui card gallery_banner" key={1}> 
                    <div className="">
                        <div className="content">
                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                <div className="image-crop">
                                    <img src={profilePic} />
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12" key={2}>
                                <h1>{this.props.user.fullName || this.props.user.email}</h1>
                                    <FollowButton userId={this.props.user._id}/>
                                    <div className="user_content">{this.props.description || "Empty Bio"}</div>
                                    <br/>
                                    <div className="user_follows">Following: {this.props.user.following.length} &nbsp; Followers: {this.props.followers.length}</div>
                                    <br/>
                                    {this.renderEdit()}
                            </div>
                        </div>
                    </div>
                    </div>,
                    <div key={3}>
                            <div className="margin_center">{this.generatePosts()} </div>      
                    </div>]);  
        }
        return <span>Sorry, user not found.</span>;    
    }
    
    render() {
        return (<div className="user_gallery">
                    <div className="container">
                        <div className="row">
                            {this.generateUserContent()}
                        </div>
                    </div>
                </div>);
    }
} 
/*
<div className="col-sm-12 col-md-3 col-lg-3 col-xl-1" key={1}>
    <div className="crop_profile_image">
        <img className="img-circle" src={profilePic} />
    </div>
</div>,
    <div className="col-sm-12 col-md-9 col-lg-9 col-xl-11" key={2}>
        <h1>{this.props.user.fullName || this.props.user.email}</h1>
        <p> </p>
        <p>Following</p>
        <div> {this.generatePosts()} </div>
        
</div>

*/
function mapStateToProps(state) {
    return {
        users: state.feed.myUsers,
        user: state.feed.user || state.feed.currentUser,
        userPosts: state.feed.posts,
        currentUser: state.feed.currentUser || false,
        followers: state.feed.followers || []
    }
}

export default connect(mapStateToProps, actions)(UserProfile);