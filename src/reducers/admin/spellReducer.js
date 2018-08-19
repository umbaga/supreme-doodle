import * as types from '../../actions/actionTypes';
import initialState from '../initialState';


export default function spellReducer(state = initialState.spells, action) {
    switch (action.type) {
        case types.LOAD_SPELLS_SUCCESS:
            return action.spells;
        case types.CREATE_SPELL_SUCCESS:
            return [
                ...state.filter(spell => spell.id !== action.spell.id),
                Object.assign({}, action.spell)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.UPDATE_SPELL_SUCCESS:
            return [
                Object.assign({}, action.spell),
                ...state.filter(spell => spell.id !== action.spell.id)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.DELETE_SPELL_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOf_TemplateToDelete = state.findIndex(spell => {
                return spell.id == action.spell.id;
            });
            newState.splice(indexOf_TemplateToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
