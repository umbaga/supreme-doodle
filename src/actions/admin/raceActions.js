import * as types from '../actionTypes';
import raceApi from '../../api/admin/RaceApi';

export function loadRacesSuccess(races) {
    return {type: types.LOAD_RACES_SUCCESS, races};
}

export function updateRaceSuccess(race) {
    return {type: types.UPDATE_RACE_SUCCESS, race};
}

export function createRaceSuccess(race) {
    return {type: types.CREATE_RACE_SUCCESS, race};
}

export function deleteRaceSuccess(race) {
    return {type: types.DELETE_RACE_SUCCESS, race};
}

export function upsertRaceSuccess(race) {
    return {type: types.UPSERT_RACE_SUCCESS, race};
}

export function loadRaces() {
    return function(dispatch) {
        return raceApi.getAllRaces().then(races => {
            dispatch(loadRacesSuccess(races));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updateRace(race) {
    return function (dispatch) {
        return raceApi.updateRace(race).then(responseRace => {
            dispatch(updateRaceSuccess(responseRace.race));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createRace(race) {
    return function (dispatch) {
        return raceApi.createRace(race).then(responseRace => {
            dispatch(createRaceSuccess(responseRace.race));
            return responseRace;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteRace(race) {
    return function(dispatch) {
        return raceApi.deleteRace(race).then(() => {
            dispatch(deleteRaceSuccess(race));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertRace(race) {
    return function(dispatch) {
        if (race.id && race.id != 0) {
            return raceApi.updateRace(race).then(responseRace => {
                dispatch(updateRaceSuccess(responseRace.race));
            }).catch(error => {
                throw (error);
            });
        } else {
            return raceApi.createRace(race).then(responseRace => {
                dispatch(createRaceSuccess(responseRace.race));
                return responseRace;
            }).catch(error => {
                throw (error);
            });
        }
    };
}