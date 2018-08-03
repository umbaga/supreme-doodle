import * as types from '../../actions/actionTypes';
import initialState from '../initialState';


export default function equipmentReducer(state = initialState.equipments, action) {
    switch (action.type) {
        case types.LOAD_EQUIPMENTS_SUCCESS:
            return action.equipments;
        case types.CREATE_EQUIPMENT_SUCCESS:
            return [
                ...state.filter(equipment => equipment.id !== action.equipment.id),
                Object.assign({}, action.equipment)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.UPDATE_EQUIPMENT_SUCCESS:
            return [
                Object.assign({}, action.equipment),
                ...state.filter(equipment => equipment.id !== action.equipment.id)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.DELETE_EQUIPMENT_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfEquipmentToDelete = state.findIndex(equipment => {
                return equipment.id == action.equipment.id;
            });
            newState.splice(indexOfEquipmentToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
