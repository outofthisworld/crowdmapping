import {combineReducers,applyMiddleware,createStore} from 'redux';
import * as reducers from '../reducers/Reducers';
import thunk from 'redux-thunk';

export default createStore(combineReducers(reducers),applyMiddleware(thunk))