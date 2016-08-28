import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './card';
import Footer from './footer';

class imagePage extends Component {
    componentWillMount() {
        var id = this.props.params.id;
        if(id) {
            this.props.fetchImage(id);
        }
    }
    
    componentDidMount() {
        
    }
    
    generateCard() {
        var socket = this.props.route.socket;
        var image = this.props.image;
        if(image) {
            var imgLink = "https://s3-us-west-2.amazonaws.com/photogriddemo/" + image.filename; 
            var newDate = new Date(image.date);
            var hours = newDate.getHours();
            var suffix = hours >= 12 ? "PM":"AM";
            hours = ((hours + 11) % 12 + 1);
            var dateString = newDate.toDateString() + ' at ' +  hours + ':' + newDate.getMinutes() + suffix;
            return (<div>
                        <Card profilePic={image.authorPic} authorId={image.authorId} authorName={image.authorName}  image={imgLink} likes={image.likes} 
                            id={image._id} date={image.date} socket={socket} imageModal={true}
                            comments={image.comments} dateString={dateString} />
                            <br/>
                            <br/>
                    </div>);
        } else {
            return <p> Invalid post id. The post does not exist. </p>
        }

        
    }
    
    render() {
        return (<div className="container"> 
                    <div className="center_object">
                        {this.generateCard()}
                    </div>
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        image: state.feed.image
    }
}

export default connect(mapStateToProps, actions)(imagePage);