/*eslint-disable no-console */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import LoginPage from './components/login/LoginPage';


const indexRoute = (process.env.NODE_ENV === 'production') ? '/login' : '/'; 

export default (    
    <Route path={indexRoute} component={App} >     
        <IndexRoute component={LoginPage} />    
    </Route>
); 
   