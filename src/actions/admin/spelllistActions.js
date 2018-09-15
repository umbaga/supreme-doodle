import * as types from '../actionTypes';
import spelllistApi from '../../api/admin/SpelllistApi';

export function loadSpelllistsSuccess(spelllists) {
    return {type: types.LOAD_SPELLLISTS_SUCCESS, spelllists};
}

export function updateSpelllistSuccess(spelllist) {
    return {type: types.UPDATE_SPELLLIST_SUCCESS, spelllist};
}

export function createSpelllistSuccess(spelllist) {
    return {type: types.CREATE_SPELLLIST_SUCCESS, spelllist};
}

export function deleteSpelllistSuccess(spelllist) {
    return {type: types.DELETE_SPELLLIST_SUCCESS, spelllist};
}

export function upsertSpelllistSuccess(spelllist) {
    return {type: types.UPSERT_SPELLLIST_SUCCESS, spelllist};
}

export function loadSpelllists() {
    return function(dispatch) {
        return spelllistApi.getAllSpelllists().then(spelllists => {
            dispatch(loadSpelllistsSuccess(spelllists));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updateSpelllist(spelllist) {
    return function (dispatch) {
        return spelllistApi.updateSpelllist(spelllist).then(responseSpelllist => {
            dispatch(updateSpelllistSuccess(responseSpelllist.spelllist));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createSpelllist(spelllist) {
    return function (dispatch) {
        return spelllistApi.createSpelllist(spelllist).then(responseSpelllist => {
            dispatch(createSpelllistSuccess(responseSpelllist.spelllist));
            return responseSpelllist;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteSpelllist(spelllist) {
    return function(dispatch) {
        return spelllistApi.deleteSpelllist(spelllist).then(() => {
            dispatch(deleteSpelllistSuccess(spelllist));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertSpelllist(spelllist) {
    return function(dispatch) {
        if (spelllist.id && spelllist.id != 0) {
            return spelllistApi.updateSpelllist(spelllist).then(responseSpelllist => {
                dispatch(updateSpelllistSuccess(responseSpelllist.spelllist));
            }).catch(error => {
                throw (error);
            });
        } else {
            return spelllistApi.createSpelllist(spelllist).then(responseSpelllist => {
                dispatch(createSpelllistSuccess(responseSpelllist.spelllist));
                return responseSpelllist;
            }).catch(error => {
                throw (error);
            });
        }
    };
}