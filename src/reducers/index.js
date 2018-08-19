import {combineReducers} from 'redux';
import session from './admin/sessionReducer';
import _templates from './admin/_templateReducer';
import backgrounds from './admin/backgroundReducer';
import equipments from './admin/equipmentReducer';
import itemtypes from './admin/itemtypeReducer';
import picklists from './admin/picklistReducer';
import proficiencies from './admin/proficiencyReducer';
import spells from './admin/spellReducer';

const rootReducer = combineReducers({
    _templates,
    backgrounds,
    equipments,
    itemtypes,
    picklists,
    proficiencies,
    spells,
    session
});

export default rootReducer;