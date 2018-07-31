import * as types from '../actionTypes';
import picklistApi from '../../api/admin/PicklistApi';

export function loadPicklistsSuccess(picklists) {
    return {type: types.LOAD_PICKLISTS_SUCCESS, picklists};
}

export function updatePicklistSuccess(picklist) {
    return {type: types.UPDATE_PICKLIST_SUCCESS, picklist};
}

export function createPicklistSuccess(picklist) {
    return {type: types.CREATE_PICKLIST_SUCCESS, picklist};
}

export function deletePicklistSuccess(picklist) {
    return {type: types.DELETE_PICKLIST_SUCCESS, picklist};
}

export function upsertPicklistSuccess(picklist) {
    return {type: types.UPSERT_PICKLIST_SUCCESS, picklist};
}

export function loadPicklists() {
    return function(dispatch) {
        return picklistApi.getAllPicklists().then(picklists => {
            dispatch(loadPicklistsSuccess(picklists));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updatePicklist(picklist) {
    return function (dispatch) {
        return picklistApi.updatePicklist(picklist).then(responsePicklist => {
            dispatch(updatePicklistSuccess(responsePicklist.picklist));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createPicklist(picklist) {
    return function (dispatch) {
        return picklistApi.createPicklist(picklist).then(responsePicklist => {
            dispatch(createPicklistSuccess(responsePicklist.picklist));
            return responsePicklist;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deletePicklist(picklist) {
    return function(dispatch) {
        return picklistApi.deletePicklist(picklist).then(() => {
            dispatch(deletePicklistSuccess(picklist));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertPicklist(picklist) {
    return function(dispatch) {
        if (picklist.id && picklist.id != 0) {
            return picklistApi.updatePicklist(picklist).then(responsePicklist => {
                dispatch(updatePicklistSuccess(responsePicklist.picklist));
            }).catch(error => {
                throw (error);
            });
        } else {
            return picklistApi.createPicklist(picklist).then(responsePicklist => {
                dispatch(createPicklistSuccess(responsePicklist.picklist));
                return responsePicklist;
            }).catch(error => {
                throw (error);
            });
        }
    };
}