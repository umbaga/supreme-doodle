import * as types from '../actionTypes';
import equipmentApi from '../../api/admin/EquipmentApi';

export function loadEquipmentsSuccess(equipments) {
    return {type: types.LOAD_EQUIPMENTS_SUCCESS, equipments};
}

export function updateEquipmentSuccess(equipment) {
    return {type: types.UPDATE_EQUIPMENT_SUCCESS, equipment};
}

export function createEquipmentSuccess(equipment) {
    return {type: types.CREATE_EQUIPMENT_SUCCESS, equipment};
}

export function deleteEquipmentSuccess(equipment) {
    return {type: types.DELETE_EQUIPMENT_SUCCESS, equipment};
}

export function upsertEquipmentSuccess(equipment) {
    return {type: types.UPSERT_EQUIPMENT_SUCCESS, equipment};
}

export function loadEquipments() {
    return function(dispatch) {
        return equipmentApi.getAllEquipments().then(equipments => {
            dispatch(loadEquipmentsSuccess(equipments));
        }).catch(error => {
            throw (error);
        });
    };
}

export function updateEquipment(equipment) {
    return function (dispatch) {
        return equipmentApi.updateEquipment(equipment).then(responseEquipment => {
            dispatch(updateEquipmentSuccess(responseEquipment.equipment));
        }).catch(error => {
            throw (error);
        });
    };
}

export function createEquipment(equipment) {
    return function (dispatch) {
        return equipmentApi.createEquipment(equipment).then(responseEquipment => {
            dispatch(createEquipmentSuccess(responseEquipment.equipment));
            return responseEquipment;
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteEquipment(equipment) {
    return function(dispatch) {
        return equipmentApi.deleteEquipment(equipment).then(() => {
            dispatch(deleteEquipmentSuccess(equipment));
            return;
        }).catch(error => {
            throw (error);
        });
    };
}

export function upsertEquipment(equipment) {
    return function(dispatch) {
        if (equipment.id && equipment.id != 0) {
            return equipmentApi.updateEquipment(equipment).then(responseEquipment => {
                dispatch(updateEquipmentSuccess(responseEquipment.equipment));
            }).catch(error => {
                throw (error);
            });
        } else {
            return equipmentApi.createEquipment(equipment).then(responseEquipment => {
                dispatch(createEquipmentSuccess(responseEquipment.equipment));
                return responseEquipment;
            }).catch(error => {
                throw (error);
            });
        }
    };
}