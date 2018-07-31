import {combineReducers} from 'redux';
import session from './admin/sessionReducer';
import itemtypes from './admin/itemtypeReducer';

const rootReducer = combineReducers({
    itemtypes,
    session
});

export default rootReducer;