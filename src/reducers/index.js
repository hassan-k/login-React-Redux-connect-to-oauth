import {combineReducers} from 'redux';
import login from './loginReducer';
import * as types from '../actions/actionTypes';


const rootReducer = combineReducers({   
    login      
});

export default rootReducer;