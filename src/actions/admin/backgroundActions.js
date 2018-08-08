import * as types from '../actionTypes';
import backgroundApi from '../../api/admin/BackgroundApi';

export function loadBackgroundsSuccess(backgrounds) {
    return {type: types.LOAD_BACKGROUNDS_SUCCESS, backgrounds};
}

export function updateBackgroundSuccess(background) {
    return {type: types.UPDATE_BACKGROUND_SUCCESS, background};
}

export function createBackgroundSuccess(background) {
    return {type: types.CREATE_BACKGROUND_SUCCESS, background};
}

export function deleteBackgroundSuccess(background) {
    return {type: types.DELETE_BACKGROUND_SUCCESS, background};
}

export function upsertBackgroundSuccess(background) {
    return {type: types.UPSERT_BACKGROUND_SUCCESS, background};
}

export function loadBackgrounds() {
    return function(dispatch) {
        return backgroundApi.getAllBackgrounds().then(backgrounds => {
            dispatch(loadBackgroundsSuccess(backgrounds));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updateBackground(background) {
    return function (dispatch) {
        return backgroundApi.updateBackground(background).then(responseBackground => {
            dispatch(updateBackgroundSuccess(responseBackground.background));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createBackground(background) {
    return function (dispatch) {
        return backgroundApi.createBackground(background).then(responseBackground => {
            dispatch(createBackgroundSuccess(responseBackground.background));
            return responseBackground;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteBackground(background) {
    return function(dispatch) {
        return backgroundApi.deleteBackground(background).then(() => {
            dispatch(deleteBackgroundSuccess(background));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertBackground(background) {
    return function(dispatch) {
        if (background.id && background.id != 0) {
            return backgroundApi.updateBackground(background).then(responseBackground => {
                dispatch(updateBackgroundSuccess(responseBackground.background));
            }).catch(error => {
                throw (error);
            });
        } else {
            return backgroundApi.createBackground(background).then(responseBackground => {
                dispatch(createBackgroundSuccess(responseBackground.background));
                return responseBackground;
            }).catch(error => {
                throw (error);
            });
        }
    };
}