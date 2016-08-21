import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Comment from './comment';
var Link = require('react-router').Link;

class Card extends Component {
    // getInitialState() {
    //     return { dynamicLikes: this.props.likes }
    // }
    constructor(props) {
        super(props);
        this.state = {
            dynamicLikes: this.props.likes
        };
    }

    componentWillMount() {
        this.props.fetchUser();
    }

    componentDidMount() {
        // Preserve 'this' reference
        var self = this;
        //this.state = { mylikes: this.props.likes}
        // On like emission
        this.props.socket.on('updateLikes' + this.props.id, function(data) {
            console.log('update likes ' + data);
            // self.setState({ likes: self.props.likes + 1 });
            self.props.fetchUser();
            self.setState({ dynamicLikes: data });
        })
        
                // On like emission
        this.props.socket.on('updateComments' + this.props.id, function(data) {
            var newComments = self.props.comments;
            newComments.unshift(data);
            self.setState({ comments: newComments })
        })
    }
    
    
    addLike(id) {
        console.log(this.props.currentUser.liked);
        var liked = this.props.currentUser.liked;
        if(this.props.currentUser.liked.indexOf(id) < 0){         
            liked.push(id);
            this.props.notify(this.props.authorId, { 
                action: "liked",
                from: this.props.currentUser.fullName,
                content: "" 
            });
            this.props.addLike(id);
        } else {
            liked.splice(liked.indexOf(id), 1);
            this.props.removeLike(id);
        }
        this.setState({ currentUser: { liked: liked }});
        
    }
    
    generateComments() {
        // console.log(this.props.comments);
        if(!this.props.comments){
            return; 
        }
        return this.props.comments.map(comment => {
            var author = comment.author ? (comment.author.fullName || comment.author.email) : "";
            var profilePic;
            if(comment.author) {
                profilePic = comment.author.profilePic ? comment.author.profilePic : "style/img/unknown_user.png";
                profilePic = profilePic.split('?');
                profilePic = profilePic[0];
            }
            return (<Comment key={comment._id} date={timeSince(comment.date)} author={author} text={comment.text} profilePic={profilePic} />);
        })
    }
        
    addComment() {
        console.log("adding comment: " + this.refs.comment.value);
        this.props.addComment(this.props.id, this.refs.comment.value);
        this.props.notify(this.props.authorId, { 
            action: "commented",
            from: this.props.currentUser.fullName,
            content: this.refs.comment.value
        });
        this.refs.comment.value = "";
    }
    
    heartColour() {
        if(this.props.currentUser && this.props.currentUser.liked) {
            return  ((this.props.currentUser.liked.indexOf(this.props.id) > 0) ? "icon red" : "outline icon");
        } else {
            return "";
        }
    }
    
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.addComment.bind(this)();
        }
    }
    
    imageModal() {
        if(this.props.imageModal) {
            return (<div className="container margin_center"> 
                <div className={"modal fade " + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog modal-lg" role="document">
                        <img className="center_image" src={this.props.image} />
                    </div>
                </div>                            
            </div>);
        } else {
            return "";
        }
    }
    
    
    render() {
        return (<div>
            <div className="feed">
                <div className="ui fluid card">
                    <div className="content">
                        <div className="right floated meta">{timeSince(this.props.date)}</div>
                        <Link className="black" to={`user/${this.props.authorId}`}> 
                            <img className="ui avatar image" src={this.props.profilePic || "style/img/unknown_user.png"}/>
                            {this.props.authorName}
                         </Link>
                    </div>
                                 
                    <div className="image">                    
                        <img data-toggle="modal" data-target={"." + this.props.id} src={this.props.image} />
                    </div>
                    
                    <div className="content">
                        <span onClick={this.addLike.bind(this, this.props.id)} className="right floated">
                        <i className="heart outline like icon"></i>
                        <span ref="likes">{this.state.dynamicLikes}</span> likes
                        </span>
                        <a data-toggle="collapse" data-target={"#collapse" + this.props.id} aria-expanded="false" aria-controls={"#collapse" + this.props.id} >
                            <i className="comment icon"></i>
                            {this.props.comments.length || "No"} comments
                        </a>
                        <div className="ui comments collapse in" id={"collapse" + this.props.id} >
                            {this.generateComments()}
                        </div>
                    </div>
                    <div className="extra content">
                        
                        <div className="ui fluid large transparent left icon input">
                            <i className={"heart " + this.heartColour()}></i>
                            <input className="full-width" ref="comment" onKeyPress={this._handleKeyPress.bind(this)} type="text" placeholder="Add Comment..."/>
                        </div>
                        
                    </div>
                </div>            
            </div>
            {this.imageModal()}
            </div>
        );    
    }
    
    
}

function mapStateToProps(state) {
    return {
        newLikes: state.feed.likes,
        currentUser: state.feed.currentUser
    }
}

export default connect(mapStateToProps, actions)(Card);