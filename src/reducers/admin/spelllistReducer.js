import * as types from '../../actions/actionTypes';
import initialState from '../initialState';


export default function spelllistReducer(state = initialState.spelllists, action) {
    switch (action.type) {
        case types.LOAD_SPELLLISTS_SUCCESS:
            return action.spelllists;
        case types.CREATE_SPELLLIST_SUCCESS:
            return [
                ...state.filter(spelllist => spelllist.id !== action.spelllist.id),
                Object.assign({}, action.spelllist)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.UPDATE_SPELLLIST_SUCCESS:
            return [
                Object.assign({}, action.spelllist),
                ...state.filter(spelllist => spelllist.id !== action.spelllist.id)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.DELETE_SPELLLIST_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfSpelllistToDelete = state.findIndex(spelllist => {
                return spelllist.id == action.spelllist.id;
            });
            newState.splice(indexOfSpelllistToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
