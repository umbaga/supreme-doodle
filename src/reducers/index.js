import {combineReducers} from 'redux';
import session from './admin/sessionReducer';
import _templates from './admin/_templateReducer';
import equipments from './admin/equipmentReducer';
import itemtypes from './admin/itemtypeReducer';
import picklists from './admin/picklistReducer';
import proficiencies from './admin/proficiencyReducer';

const rootReducer = combineReducers({
    _templates,
    equipments,
    itemtypes,
    picklists,
    proficiencies,
    session
});

export default rootReducer;