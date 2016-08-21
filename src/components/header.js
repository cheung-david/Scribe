import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
var timeoutID = null;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    
    componentWillMount() {
        this.props.fetchUser();
        this.props.fetchNotifications();
    }
    
    componentDidMount() {
        $('.ui.search')
        .search({
            type          : 'category',
            minCharacters : 2,
            searchDelay   : 500,
            apiSettings: {   
                onResponse: function(searchResults) {
                    var
                    response = {
                        results : {}
                    }
                    ;
                    // translate GitHub API response to work with search
                    $.each(searchResults.users, function(index, user) {
                        var
                            profilePic   = user.profilePic || 'style/img/unknown_user.png',
                            maxResults = 8
                        ;
                        if(index >= maxResults) {
                            return false;
                        }
                        var image = `<img class="ui avatar image" src=${profilePic} />`;
                        
                        // create new language category
                        if(response.results[user._id] === undefined) {
                            response.results[user._id] = {
                            name    : image,
                            results : []
                            };
                        }
                        var link = `<Link to={user/${user._id}}> Link </Link>`;
                        var url = `https://cheung-david.github.io/Scribe/user/${user._id}`;
                        // add result to category
                        response.results[user._id].results.push({
                            title       : user.fullName,
                            description : user.description || user.fullName,
                            url         : url
                        });
                    });
                    return response;
                },
                url: '//52.39.6.195/api/altsearch?q={query}',
            }
        });  
          
          
        // Preserve 'this' reference
        var self = this;
        var socket = this.props.socket;
        if(this.props.currentUser){
           console.log("current user");
           socket.emit('username', this.props.currentUser._id); 
        }
        
        // On notification event emission...
        socket.on('notification', function(data) {
            console.log("notification", data);
            
            var notificationList = self.props.notifications;
            if(data) {
                console.log("shifting");
                notificationList.unshift(data);
            }            
            self.setState({notifications: notificationList});
            self.props.fetchNotifications();
        });  
            
    }
    
    // Not used, alternate search method
    searchResults() {
        if(this.props.searchResults && this.props.searchResults.users) {
            var results = this.props.searchResults.users.map(function(result) {
                return (<li>{result.email}</li>);
            });
            return results;
        } else {
            return <li>"test"</li>;
        }
    }
    
    notification() {
        console.log(this.props.notifications, "fetched notifications");
        //var length = this.state.notification.length;
        if(this.props.notifications) {
            var length = this.props.notifications.filter(function(item) {
                return (item.seen === false);
            }).length;
            
            if(length) {
                return (<div key={1337} className="floating ui red label">{length}</div>)
            } else {
                return ""
            }
        }
    }
    
    notificationList() {
        if(this.props.notifications && this.props.notifications.length > 0) {
            var notifications = this.props.notifications.map(function(item) {
                return (<div key={item._id} className="event">
                            <div className="label">
                                <img src={item.profilePic || "../../style/img/Fullmetal-Alchemist.ico"} />
                            </div>
                            <div className="content">
                                <div className="summary">
                                    <a className="user">
                                        {item.from}
                                    </a> &nbsp; has {item.action} your post
                                    <div className="date">
                                        {timeSince(item.date)}
                                    </div>
                                </div>
                                <div className="">
                                    {item.content || ""}
                                </div>
                            </div>
                        </div>);
            });
            return  (
                <div className="dropdown-menu">
                    <div className="ui feed" aria-labelledby="notifications">                         
                        {notifications}
                    </div>
                </div>);
        } else {
            return (<div className="dropdown-menu ui feed" aria-labelledby="notifications">
                        <div className="event"> &nbsp; There are no new notifications.</div>
                    </div>);
        }
    }
    
    viewed() {
        this.props.seenNotifications();
        //this.props.fetchNotifications();
    }
    
    renderHeader() {
        var socket = this.props.socket;
        if(this.props.currentUser){
           console.log("current user");
           socket.emit('username', this.props.currentUser._id); 
        }
        
        if(!this.props.authenticated) {
            return [
                    <Link key={1} className="item" to="/signin">
                        Sign In
                    </Link>,
                    <Link key={2} className="item" to="/signup">
                        Sign Up
                    </Link> 
            ];                             
        } else {
            return [
                    <Link key={2} className={"item " + (this.props.location.pathname === '/myfeed' ? 'active' : '')} to="/myfeed">
                        My Feed
                    </Link>, 
                    <Link key={1} className={"item " + (this.props.location.pathname === '/feed' ? 'active' : '')} to="/feed">
                        Explore
                    </Link>,    
                    <Link key={3} className={"item " + (this.props.location.pathname === '/users' ? 'active' : '')} to="/users">
                        Users
                    </Link>, 
                    <Link key={4} className={"item " + (this.props.location.pathname === '/profile' ? 'active' : '')} to="/profile">
                        You
                    </Link>,
                    <div key={5} className="item dropdown">
                        <a className="black dropdown-toggle" onClick={this.viewed.bind(this)} id="notifications" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <i className="icon mail"></i>
                            {this.notification()}
                        </a>
                        {this.notificationList()}
                    </div>,                    
                    <div key={6} className="item center ui search">
                        <div className="ui icon input">
                            <input className="prompt" name="search" type="text" placeholder="Search..." />
                            <i className="search icon"></i>
                        </div>
                        <div className="results">
                        </div>
                    </div>,
                    <div key={7} className="right menu">
                        <Link className="item" to="/signout">
                            Sign Out
                        </Link> 
                    </div>       
            ];             
        }
    }
    
    // Not used, alternate search method
    search(e) {
        var self = this;
        clearTimeout(timeoutID);
        var query = e.target.value;
        
        timeoutID = setTimeout(function() {
            if(query !== '') {
                console.log(query);
                self.props.search(query);
            }
        }, 500);
    }
    
    render() {
        return (
        //   <nav className="navbar navbar-inverse">
        //     <div className="container-fluid">
        //         <div class="navbar-header">
        //             <Link to="/" className="navbar-brand">Redux Auth</Link>
        //         </div>  
        //         <ul className="nav navbar-nav">
        //             {this.renderHeader()}
        //         </ul>
        //     </div>
        //   </nav>  
        <div className="ui secondary pointing menu">
                <Link className="header item" to="/myfeed">
                    <span>App &nbsp;</span><i className="fa fa-camera-retro fa-lg" aria-hidden="true"></i> 
                </Link>     
                {this.renderHeader()}
        </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
            authenticated: state.auth.authenticated, 
            searchResults: state.feed.searchResults,  
            currentUser: state.feed.currentUser,
            notifications: state.feed.notifications
           };
}

export default connect(mapStateToProps, actions)(Header);