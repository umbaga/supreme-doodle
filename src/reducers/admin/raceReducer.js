import * as types from '../../actions/actionTypes';
import initialState from '../initialState';


export default function raceReducer(state = initialState.races, action) {
    switch (action.type) {
        case types.LOAD_RACES_SUCCESS:
            return action.races;
        case types.CREATE_RACE_SUCCESS:
            return [
                ...state.filter(race => race.id !== action.race.id),
                Object.assign({}, action.race)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.UPDATE_RACE_SUCCESS:
            return [
                Object.assign({}, action.race),
                ...state.filter(race => race.id !== action.race.id)
            ].sort(function(a, b){
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        case types.DELETE_RACE_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfRaceToDelete = state.findIndex(race => {
                return race.id == action.race.id;
            });
            newState.splice(indexOfRaceToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
