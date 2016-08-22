import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_FEED, FETCH_LIKES, FETCH_FOLLOWERS, 
            FETCH_CURRENT_USER, FETCH_USERS, FETCH_USER, FETCH_POSTS, SEARCH_RESULTS, FETCH_NOTIFICATIONS,
            UPDATE_USER, UN_UPDATE_USER, UPDATE_USER_PROFILE_PIC, UN_UPDATE_USER_PROFILE_PIC,
            UN_UPDATE_PASS, UPDATE_PASS, FETCH_FOLLOWERS_LIST } from './types';

const ROOT_URL = 'http://52.39.6.195';


var axiosInstance = axios.create({
  headers: { 'authorization': localStorage.getItem('token')},
  withCredentials: true
});

export function signinUser({ email, password }) {
    return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/api/signin`, { email, password }, { withCredentials: true })
        .then(response => {
            // Update state to indicate user is authenticated
            dispatch({ type: AUTH_USER })
            // Save JWT token
            localStorage.setItem('token', response.data.token);
            // Redirect to main user page        
            browserHistory.push('#/myfeed');        
        })
        .catch(() => {
            // Show errors
            dispatch(authError('Invalid Login Info!'));          
        })
    }
}

export function signinUserFB(token) {
    return function(dispatch) {
    // Submit email/password to server
    axios.get(`${ROOT_URL}/api/signin/auth/facebook`, { headers: {access_token: token}, withCredentials: true })
        .then(response => {
            console.log(response);
            // Update state to indicate user is authenticated
            dispatch({ type: AUTH_USER });
            // Save JWT token
            localStorage.setItem('token', response.data.token);
            dispatch({ type: AUTH_USER });
            // Redirect to main user page        
            browserHistory.push('#/myfeed');        
        })
        .catch(() => {
            // Show errors
            dispatch(authError('Invalid Login Info!'));          
        })
    }
}

export function signinUserTW() {
    return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/api/signin/auth/twitter`, {}, { withCredentials: true })
        .then(response => {
            // Update state to indicate user is authenticated
            dispatch({ type: AUTH_USER })
            // Save JWT token
            localStorage.setItem('token', response.data.token);
            // Redirect to main user page        
            browserHistory.push('/myfeed');        
        })
        .catch(() => {
            // Show errors
            dispatch(authError('Invalid Login Info!'));          
        })
    }
}

export function signoutUser() {
    localStorage.removeItem('token')
    return ({ type: UNAUTH_USER });
}

export function clearUpdateUser() {
    return ({ type: UN_UPDATE_USER });
}

export function clearUpdatePass() {
    return ({ type: UN_UPDATE_PASS });
}

export function clearUpdatePic() {
    return ({ type: UN_UPDATE_USER_PROFILE_PIC});
}

export function signupUser({ name, email, password }) {
    return function(dispatch) {
    axios.post(`${ROOT_URL}/api/signup`, { name, email, password }, { withCredentials: true })
        .then(response => {
            // Update state to indicate user is authenticated
            dispatch({ type: AUTH_USER })
            // Save JWT token
            localStorage.setItem('token', response.data.token);
            // Redirect to main user page        
            browserHistory.push('#/myfeed');        
        })
        .catch((error) => {
            // Show errors
            dispatch(authError(error));          
        })
    }
}

export function updateUser({ name, email, description }) {
    return function(dispatch) {
    axios.post(`${ROOT_URL}/api/user`, { name, email, description }, {  headers: { authorization: localStorage.getItem('token') }, withCredentials: true })
        .then(response => {
            //console.log(response, "updated user");
            // Update state to indicate user is authenticated
            dispatch({ type: UPDATE_USER })       
        })
        .catch((error) => {
            console.log(error);
            // Show errors
            dispatch(authError(error));          
        })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchMessage() {
  return function(dispatch) {
      axios.get(ROOT_URL, {
          headers: { authorization: localStorage.getItem('token') } },
            { withCredentials: true })
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            })
        })
        .catch(error => {
            console.log(error);
        })
  }  
}

// Global feed
export function fetchFeed() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/feed`, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
                dispatch({
                    type: FETCH_FEED,
                    payload: response.data
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function fetchLocalFeed() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/myfeed`, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
                dispatch({
                    type: FETCH_FEED,
                    payload: response.data
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function uploadFeed(image) {
  return function(dispatch) {
      axios.post(`${ROOT_URL}/api/feed`, image, { headers: { 'authorization': localStorage.getItem('token') } })
        .then(response => {
 
        })
        .catch(error => {
            console.log(error);
        })
  }  
}

export function uploadProfilePic(image) {
  return function(dispatch) {
      axios.post(`${ROOT_URL}/api/profilepic`, image, { headers: { 'authorization': localStorage.getItem('token') } })
        .then(response => {
                //console.log(response, "uploading profile pic");
                // dispatch({
                //     type: FETCH_CURRENT_USER,
                //     payload: response.data.user
                // });    
                dispatch({ type: UPDATE_USER_PROFILE_PIC });       
        })
        .catch(error => {
            console.log(error);
        })
  }  
}

export function addLike(id) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/likes/${id}`, {}, { headers: { 'authorization': localStorage.getItem('token') } })
            .then(response => {
                //console.log("action likes " + response.data.likes);
                dispatch({
                    type: FETCH_LIKES,
                    payload: response.data.likes
                })
            })
            .catch(error => {
                console.log(error);    
            })
    }
}

export function removeLike(id) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/unlikes/${id}`, {}, { headers: { 'authorization': localStorage.getItem('token') } })
            .then(response => {
                //console.log("action unlikes " + response.data.likes);
                dispatch({
                    type: FETCH_LIKES,
                    payload: response.data.likes
                })
            })
            .catch(error => {
                console.log(error);    
            })
    }
}



export function addComment(id, comment) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/comments/${id}`, 
        { 
            comment: comment 
        }, 
        {   
            headers: { 'authorization': localStorage.getItem('token') }, 
            withCredentials: true 
        })
            .then(response => {
                console.log("action comment " + response.data);
            })
            .catch(error => {
                console.log(error);    
            })
    }
}

export function follow(id) {
    // Send request to add userid to current user's follow list
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/follow/${id}`, {}, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
            //console.log(response.data.following, "Following", id);
                dispatch({
                    type: FETCH_FOLLOWERS,
                    payload: response.data.following
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function unfollow(id) {
    // Send request to remove userid from current user's follow list
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/unfollow/${id}`, {}, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
                dispatch({
                    type: FETCH_FOLLOWERS,
                    payload: response.data.following
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }    
}

export function fetchFollowing() {
        return function(dispatch) {
        axios.get(`${ROOT_URL}/api/following`, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
            //console.log("dispatching follows", response);
                dispatch({
                    type: FETCH_FOLLOWERS,
                    payload: response.data.following
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function fetchUser(id) {
    // Retrieve content of the user with given id
return function(dispatch) {   
        var curID = id ? ("/" + id) : "";
        var type = id ? FETCH_USER : FETCH_CURRENT_USER;
        axios.get(`${ROOT_URL}/api/user${curID}`, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
            //console.log("dispatching retrieve user", response);
                dispatch({
                    type: type,
                    payload: response.data.user
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function fetchUsers() {
    // Retrieve all users
return function(dispatch) {
        axios.get(`${ROOT_URL}/api/users`, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
            //console.log("dispatching follows", response);
                dispatch({
                    type: FETCH_USERS,
                    payload: response.data.users
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function clearUser() {
    return function(dispatch) {
        dispatch({
            type: FETCH_USER,
            payload: false
        });
        dispatch({
            type: FETCH_CURRENT_USER,
            payload: false
        });
        dispatch({
            type: FETCH_POSTS,
            payload: false
        });
    }
}

export function fetchUserPosts(id) {
    // Retrieve user id of the current user
return function(dispatch) {
        var curID = id ? ("/" + id) : "";
        axios.get(`${ROOT_URL}/api/posts${curID}`, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: response.data.posts
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function search(query) {
    // Retrieve all users
return function(dispatch) {
        axios.post(`${ROOT_URL}/api/search`, {query}, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {
            //console.log("dispatching follows", response);
                dispatch({
                    type: SEARCH_RESULTS,
                    payload: response.data.users
                })    
        })
        .catch(error => {
            console.log(error);
        })
    }
}


export function notify(id, content) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/notify/notification/${id}`, content, { headers: { 'authorization': localStorage.getItem('token') } }, 
            { withCredentials: true })
        .then(response => {       
            //console.log("notify", response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function fetchNotifications() {
    // Retrieve notifications
    return function(dispatch) {
            axios.get(`${ROOT_URL}/api/notify`, { headers: { 'authorization': localStorage.getItem('token') } }, 
                { withCredentials: true })
            .then(response => {
                //console.log("dispatching fetch notifications", response);
                    dispatch({
                        type: FETCH_NOTIFICATIONS,
                        payload: response.data.notifications
                    })    
            })
            .catch(error => {
                console.log(error);
            })
    }   
}

export function seenNotifications() {
    // Retrieve notifications
    return function(dispatch) {
            axios.get(`${ROOT_URL}/api/notify/seen`, { headers: { 'authorization': localStorage.getItem('token') } }, 
                { withCredentials: true })
            .then(response => {
                //console.log("dispatching seen notifications", response);
                    // dispatch({
                    //     type: FETCH_NOTIFICATIONS,
                    //     payload: response.data.notifications
                    // })    
            })
            .catch(error => {
                console.log(error);
            })
    }   
}

export function changePassword({ oldPassword, password }) {
    return function(dispatch) {
    // Submit old password/new password to server
    axios.post(`${ROOT_URL}/api/user/password`, { oldPassword, password }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: true })
        .then(response => {
            // Update state to indicate user is updated
            dispatch({ type: UPDATE_PASS });     
        })
        .catch(() => {
            // Show errors
            dispatch(authError('Failed to change your password. Perhaps the password you entered does not match?'));          
        })
    }
}

export function insertFollowerList(id){
    return function(dispatch) {
    // Add user to follower list of who they just started following
    axios.post(`${ROOT_URL}/api/followlist/add/${id}`, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: true })
        .then(response => {
            //console.log(response, "insert follower");
            dispatch({
                type: FETCH_FOLLOWERS_LIST,
                payload: response.data.followers
            })
        })
        .catch(() => {
            // Show errors
            console.log(error);       
        })
    }
}

export function removeFollowerList(id){
    return function(dispatch) {
    // Add user to follower list of who they just started following
    axios.post(`${ROOT_URL}/api/followlist/remove/${id}`, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: true })
        .then(response => {
            dispatch({
                type: FETCH_FOLLOWERS_LIST,
                payload: response.data.followers
            })
        })
        .catch(() => {
            // Show errors
            console.log(error);       
        })
    }
}

export function fetchFollowerList(id){
    return function(dispatch) {
    var curID = id ? ("/" + id) : "";
    // Add user to follower list of who they just started following
    axios.get(`${ROOT_URL}/api/followlist${curID}`, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: true })
        .then(response => {
            //console.log("fetch followers list", response);
            dispatch({
                type: FETCH_FOLLOWERS_LIST,
                payload: response.data.followers
            })
        })
        .catch(() => {
            dispatch({
                type: FETCH_FOLLOWERS_LIST,
                payload: 0
            })
            // Show errors
            console.log(error);       
        })
    }    
}



// Single route requests used for multiple concurrent requests in axios (NOT USED)
//=======================================================================
export function fetchFeedConcur() {
    return  axios.get(`${ROOT_URL}/api/feed`, {
        headers: { authorization: localStorage.getItem('token') }
    });
}

export function uploadFeedConcur(image) {
    return  axios.post(`${ROOT_URL}/api/feed`, image);
}
//========================================================================


export function uploadAndFetchFeed(image) {
return function(dispatch) {   
     axios.all([uploadFeedConcur(image), fetchFeedConcur()])
        .then(axios.spread(function (upload, fetch){
                // Update feed with new content
                dispatch({
                    type: FETCH_FEED,
                    payload: fetch.data
                });   
        }))
        .catch(error => {
            console.log(error);
        })
    }
}

export function ajax(config){
	return function(dispatch) {
    		var method = config.method || 'GET';
			var payload = config.payload || null;
			var xhr = new XMLHttpRequest();
			xhr.open(method, config.url, true);
			xhr.upload.addEventListener("progress", function(e){
				config.progress(e);
			});
			xhr.addEventListener("load", function(){
				config.success(xhr);
			});
			xhr.addEventListener("error", config.error);
			xhr.send(payload);        
    }
}
///////////////////////////////////////////////////////////////////////////////////////