import * as types from '../actionTypes';
import proficiencyApi from '../../api/admin/ProficiencyApi';

export function loadProficienciesSuccess(proficiencies) {
    return {type: types.LOAD_PROFICIENCIES_SUCCESS, proficiencies};
}

export function updateProficiencySuccess(proficiency) {
    return {type: types.UPDATE_PROFICIENCY_SUCCESS, proficiency};
}

export function createProficiencySuccess(proficiency) {
    return {type: types.CREATE_PROFICIENCY_SUCCESS, proficiency};
}

export function deleteProficiencySuccess(proficiency) {
    return {type: types.DELETE_PROFICIENCY_SUCCESS, proficiency};
}

export function upsertProficiencySuccess(proficiency) {
    return {type: types.UPSERT_PROFICIENCY_SUCCESS, proficiency};
}

export function loadProficiencies() {
    return function(dispatch) {
        return proficiencyApi.getAllProficiencies().then(proficiencies => {
            dispatch(loadProficienciesSuccess(proficiencies));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updateProficiency(proficiency) {
    return function (dispatch) {
        return proficiencyApi.updateProficiency(proficiency).then(responseProficiency => {
            dispatch(updateProficiencySuccess(responseProficiency.proficiency));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createProficiency(proficiency) {
    return function (dispatch) {
        return proficiencyApi.createProficiency(proficiency).then(responseProficiency => {
            dispatch(createProficiencySuccess(responseProficiency.proficiency));
            return responseProficiency;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteProficiency(proficiency) {
    return function(dispatch) {
        return proficiencyApi.deleteProficiency(proficiency).then(() => {
            dispatch(deleteProficiencySuccess(proficiency));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertProficiency(proficiency) {
    return function(dispatch) {
        if (proficiency.id && proficiency.id != 0) {
            return proficiencyApi.updateProficiency(proficiency).then(responseProficiency => {
                dispatch(updateProficiencySuccess(responseProficiency.proficiency));
            }).catch(error => {
                throw (error);
            });
        } else {
            return proficiencyApi.createProficiency(proficiency).then(responseProficiency => {
                dispatch(createProficiencySuccess(responseProficiency.proficiency));
                return responseProficiency;
            }).catch(error => {
                throw (error);
            });
        }
    };
}