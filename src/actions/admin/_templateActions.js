import * as types from '../actionTypes';
import _templateApi from '../../api/admin/_TemplateApi';

export function load_TemplatesSuccess(_templates) {
    return {type: types.LOAD__TEMPLATES_SUCCESS, _templates};
}

export function update_TemplateSuccess(_template) {
    return {type: types.UPDATE__TEMPLATE_SUCCESS, _template};
}

export function create_TemplateSuccess(_template) {
    return {type: types.CREATE__TEMPLATE_SUCCESS, _template};
}

export function delete_TemplateSuccess(_template) {
    return {type: types.DELETE__TEMPLATE_SUCCESS, _template};
}

export function upsert_TemplateSuccess(_template) {
    return {type: types.UPSERT__TEMPLATE_SUCCESS, _template};
}

export function load_Templates() {
    return function(dispatch) {
        return _templateApi.getAll_Templates().then(_templates => {
            dispatch(load_TemplatesSuccess(_templates));
        }).catch(error => {
            throw (error);
        });
    };
}

export function update_Template(_template) {
    return function (dispatch) {
        return _templateApi.update_Template(_template).then(response_Template => {
            dispatch(update_TemplateSuccess(response_Template._template));
        }).catch(error => {
            throw (error);
        });
    };
}

export function create_Template(_template) {
    return function (dispatch) {
        return _templateApi.create_Template(_template).then(response_Template => {
            dispatch(create_TemplateSuccess(response_Template._template));
            return response_Template;
        }).catch(error => {
            throw (error);
        });
    };
}

export function delete_Template(_template) {
    return function(dispatch) {
        return _templateApi.delete_Template(_template).then(() => {
            dispatch(delete_TemplateSuccess(_template));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsert_Template(_template) {
    return function(dispatch) {
        if (_template.id && _template.id != 0) {
            return _templateApi.update_Template(_template).then(response_Template => {
                dispatch(update_TemplateSuccess(response_Template._template));
            }).catch(error => {
                throw (error);
            });
        } else {
            return _templateApi.create_Template(_template).then(response_Template => {
                dispatch(create_TemplateSuccess(response_Template._template));
                return response_Template;
            }).catch(error => {
                throw (error);
            });
        }
    };
}