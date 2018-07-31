import * as types from '../../actions/actionTypes';
import initialState from '../initialState';


export default function _templateReducer(state = initialState._templates, action) {
    switch (action.type) {
        case types.LOAD__TEMPLATES_SUCCESS:
            return action._templates;
        case types.CREATE__TEMPLATE_SUCCESS:
            return [
                ...state.filter(_template => _template.id !== action._template.id),
                Object.assign({}, action._template)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.UPDATE__TEMPLATE_SUCCESS:
            return [
                Object.assign({}, action._template),
                ...state.filter(_template => _template.id !== action._template.id)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.DELETE__TEMPLATE_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOf_TemplateToDelete = state.findIndex(_template => {
                return _template.id == action._template.id;
            });
            newState.splice(indexOf_TemplateToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
