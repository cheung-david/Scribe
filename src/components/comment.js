import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comment extends Component {
    render() {
        return (<div className="comment">
                <a className="avatar">
                    <img src={this.props.profilePic} />
                </a>
                <div className="content">
                    <a className="author">{this.props.author}</a>
                <div className="metadata">
                    <span className="date">{this.props.date}</span>
                </div>
                <div className="text">
                    {this.props.text}
                </div>
                <div className="actions">
                    <a className="like">Like</a>
                </div>
                </div>
            </div>);
    }
}

export default Comment;