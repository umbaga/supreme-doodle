import * as types from '../../actions/actionTypes';
import initialState from '../initialState';


export default function picklistReducer(state = initialState.picklists, action) {
    switch (action.type) {
        case types.LOAD_PICKLISTS_SUCCESS:
            return action.picklists;
        case types.CREATE_PICKLIST_SUCCESS:
            return [
                Object.assign({}, action.picklist),
                ...state.filter(picklist => picklist.id !== action.picklist.id)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.UPDATE_PICKLIST_SUCCESS:
            return [
                Object.assign({}, action.picklist),
                ...state.filter(picklist => picklist.id !== action.picklist.id)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.DELETE_PICKLIST_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfPicklistToDelete = state.findIndex(picklist => {
                return picklist.id == action.picklist.id;
            });
            newState.splice(indexOfPicklistToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
