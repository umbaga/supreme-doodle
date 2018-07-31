import * as types from '../actionTypes';
import itemtypeApi from '../../api/admin/ItemtypeApi';

export function loadItemtypesSuccess(itemtypes) {
    return {type: types.LOAD_ITEMTYPES_SUCCESS, itemtypes};
}

export function updateItemtypeSuccess(itemtype) {
    return {type: types.UPDATE_ITEMTYPE_SUCCESS, itemtype};
}

export function createItemtypeSuccess(itemtype) {
    return {type: types.CREATE_ITEMTYPE_SUCCESS, itemtype};
}

export function deleteItemtypeSuccess(itemtype) {
    return {type: types.DELETE_ITEMTYPE_SUCCESS, itemtype};
}

export function upsertItemtypeSuccess(itemtype) {
    return {type: types.UPSERT_ITEMTYPE_SUCCESS, itemtype};
}

export function loadItemtypes() {
    return function(dispatch) {
        return itemtypeApi.getAllItemtypes().then(itemtypes => {
            dispatch(loadItemtypesSuccess(itemtypes));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updateItemtype(itemtype) {
    return function (dispatch) {
        return itemtypeApi.updateItemtype(itemtype).then(responseItemtype => {
            dispatch(updateItemtypeSuccess(responseItemtype.itemtype));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createItemtype(itemtype) {
    return function (dispatch) {
        return itemtypeApi.createItemtype(itemtype).then(responseItemtype => {
            dispatch(createItemtypeSuccess(responseItemtype.itemtype));
            return responseItemtype;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteItemtype(itemtype) {
    return function(dispatch) {
        return itemtypeApi.deleteItemtype(itemtype).then(() => {
            dispatch(deleteItemtypeSuccess(itemtype));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertItemtype(itemtype) {
    return function(dispatch) {
        if (itemtype.id && itemtype.id != 0) {
            return itemtypeApi.updateItemtype(itemtype).then(responseItemtype => {
                dispatch(updateItemtypeSuccess(responseItemtype.itemtype));
            }).catch(error => {
                throw (error);
            });
        } else {
            return itemtypeApi.createItemtype(itemtype).then(responseItemtype => {
                dispatch(createItemtypeSuccess(responseItemtype.itemtype));
                return responseItemtype;
            }).catch(error => {
                throw (error);
            });
        }
    };
}