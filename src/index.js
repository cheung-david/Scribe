import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';


import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import App from './components/app';
import Feed from './components/feed';
import UserProfile from './components/userProfile';
import ProfileEdit from './components/helper';
import UserList from './components/userList';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import io from 'socket.io-client';
var socket = io(`http://52.39.6.195`);
import createHistory from 'history/lib/createHashHistory';
const appHistory = useRouterHistory(createHistory)({ queryKey: false });

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// Token means signed in
if(token) {
  // Need to update application state
  store.dispatch({ type: AUTH_USER });  
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={appHistory}>
      <Route path="/" socket={socket} component={App}>
      <IndexRoute component={Welcome} />
        <Route path="signin" component={SignIn} />
        <Route path="signout" component={SignOut} />
        <Route path="signup" component={SignUp} />
        <Route path="feed" socket={socket} component={RequireAuth(Feed)} />
        <Route path="myfeed" socket={socket} localFeed={true} component={RequireAuth(Feed)} />
        <Route path="profile" socket={socket} component={RequireAuth(UserProfile)} />
        <Route path="user/edit" component={RequireAuth(ProfileEdit)} />
        <Route path="user/:id" component={RequireAuth(UserProfile)} />
        <Route path="users" socket={socket} component={RequireAuth(UserList)} />
      </Route>   
    </Router>  
  </Provider>
  , document.querySelector('.mainContent'));
