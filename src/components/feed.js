import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './card';


class Feature extends Component {
    constructor(props) {
        super(props);
    }
  
    componentWillMount() {
        $('.login-modal').modal('hide');
        if(this.props.route.localFeed) {
            this.props.fetchLocalFeed();
        } else {
            this.props.fetchFeed();
        }
        
    }
    
    componentDidMount() {
        // Preserve 'this' reference
        var self = this;
        var socket = this.props.route.socket;
        
        // On image update event emission...
        socket.on('updateView', function(data) {
            var newFeed = self.props.feed;
            //console.log("updateView", data);
            newFeed.unshift(data);
            self.setState({ feed: newFeed });
            //self.props.fetchFeed();

        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        var host = 'https://52.39.6.195';
        var uploadURL = host + '/api/feed'; 
        var uploadFile = this.refs.file;
        //console.log(uploadFile);
        if(uploadFile.value !== ''){
            var form = new FormData();
            form.append("upload", uploadFile.files[0]);
            //console.log(form);
            // Action creator Post request to send file
        /*    this.props.ajax({
						method: 'post',
						url: uploadURL,
						success: function(){
							//$('.progress').fadeOut(200);
							uploadFile.value = '';
                            console.log('success');
						},
						progress: function(e){
							if(e.lengthComputable){
								var percent = Math.round((e.loaded * 100) / e.total);
								//$('.progress').css('width', (percent + '%'));
							}
						},
						payload: form,
						error: function(err){
							console.log("error: " + err);
						}
					})*/
            this.props.uploadFeed(form);
            uploadFile.value = '';
        }       
    }
    
    generateCards() {
        var socket = this.props.route.socket;
        if(this.props.feed && this.props.feed.length > 0) {
            return this.props.feed.map(function(image) {
                // console.log(image);
                var imgLink = "https://s3-us-west-2.amazonaws.com/photogriddemo/" + image.filename; 
                var newDate = new Date(image.date);
                var hours = newDate.getHours();
                var suffix = hours >= 12 ? "PM":"AM";
                hours = ((hours + 11) % 12 + 1);
                var dateString = newDate.toDateString() + ' at ' +  hours + ':' + newDate.getMinutes() + suffix;
                return (<li key={image._id}>
                            <p></p>
                            <Card profilePic={image.authorPic} authorId={image.authorId} authorName={image.authorName}  image={imgLink} likes={image.likes} 
                                  id={image._id} date={image.date} socket={socket} imageModal={true}
                                  comments={image.comments} dateString={dateString} /> 
                        </li>);
            });            
        } else {
            return (<li> You have no new feed </li>);
        }

    }
    
    render() {
        return (
            <div className="container"> 
                <div className="center_object">
                    <h4> Feed </h4>
                    {this.props.error}
                    <input ref="file" type="file" name="uploadPic" className="uploadPic form-control" />
                    <button id="doUpload" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Upload</button>
                </div>
                <p></p>
                <ul>
                    {this.generateCards()}
                </ul> 
            </div>);
    }
}

function mapStateToProps(state) {
    return { 
        feed: state.feed.feed, 
        error: state.auth.error
    };
}

export default connect(mapStateToProps, actions)(Feature);