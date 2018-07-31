import {combineReducers} from 'redux';
import session from './admin/sessionReducer';
import _templates from './admin/_templateReducer';
import itemtypes from './admin/itemtypeReducer';
import picklists from './admin/picklistReducer';

const rootReducer = combineReducers({
    _templates,
    itemtypes,
    picklists,
    session
});

export default rootReducer;