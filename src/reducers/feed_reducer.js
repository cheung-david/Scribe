import { FETCH_FOLLOWERS_LIST, UPDATE_PASS, UN_UPDATE_PASS, UPDATE_USER_PROFILE_PIC, UN_UPDATE_USER_PROFILE_PIC, UPDATE_USER, UN_UPDATE_USER, FETCH_NOTIFICATIONS, FETCH_CURRENT_USER, FETCH_MESSAGE, FETCH_FEED, FETCH_LIKES, FETCH_FOLLOWERS, FETCH_USER, FETCH_USERS, FETCH_POSTS, SEARCH_RESULTS } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_FEED:        
            return { ...state, error: '', feed: action.payload };
        case FETCH_MESSAGE:
            return { ...state, error: '', message: action.payload };
        case FETCH_LIKES:
            return { ...state, error: '', likes: action.payload };  
        case FETCH_FOLLOWERS:
            return { ...state, error: '', following: action.payload };
        case FETCH_USER:
            return { ...state, error: '', user: action.payload };
        case FETCH_USERS:
            return { ...state, error: '', users: action.payload };
        case FETCH_CURRENT_USER:
            return { ...state, error: '', currentUser: action.payload };        
        case FETCH_POSTS:
            return { ...state, error: '', posts: action.payload };     
        case SEARCH_RESULTS:
            return { ...state, error: '', searchResults: action.payload };   
        case FETCH_NOTIFICATIONS:
            return { ...state, error: '', notifications: action.payload };   
        case UPDATE_USER:
            return { ...state, error: '', updated: true }; 
        case UN_UPDATE_USER:
            return { ...state, error: '', updated: false };     
        case UPDATE_USER_PROFILE_PIC:
            return { ...state, error: '', updatedPic: true };  
        case UN_UPDATE_USER_PROFILE_PIC:
            return { ...state, error: '', updatedPic: false };  
        case UPDATE_PASS:
            return { ...state, error: '', updatedPass: true }; 
        case UN_UPDATE_PASS:
            return { ...state, error: '', updatedPass: false };    
        case FETCH_FOLLOWERS_LIST:
            return { ...state, error: '', followers: action.payload };           
    }
    return state;
}