import util from './util';

export function getPicklistItems (picklistArray, picklistId) {
    let retVal = [];
    let tmp = picklistArray.filter((picklist) => picklist.id == picklistId);
    if (tmp && tmp.length != 0) {
        retVal = tmp[0].items;
    }
    return retVal;
}

export function filterPicklistByAssigned (picklist, assigned) {
    return picklist.filter((picklistItem) => {
        for (let d = 0; d < assigned.length; d++) {
            if (assigned[d].id == picklistItem.id) {
                return false;
            }
        }
        return true;
    });
}

export function getPicklistItem(allPicklists, picklistItemId) {
    for (let y = 0; y < allPicklists.length; y++) {
        for (let z = 0; z < allPicklists[y].items.length; z++) {
            if (allPicklists[y].items[z]) {
                if (allPicklists[y].items[z].id == picklistItemId) {
                    return allPicklists[y].items[z];
                }
            }
        }
    }
    return null;
}

export function getPicklistItemFromSinglePicklist(picklist, picklistItemId) {
    for (let a = 0; a < picklist.length; a++) {
        if (picklist[a].id == picklistItemId) {
            return picklist[a];
        }
    }
    return null;
}

export function getDefaultSelectedItem (picklist) {
    for (let i = 0; i < picklist.length; i++) {
        if (picklist[i].defaultSelected) {
            return picklist[i];
        }
    }
    return Object.assign({}, util.objectModel.PICKLISTITEM);
}

export function getIndexById(arr, id) {
    let retVal = -1;
    for (let d = 0; d < arr.length; d++) {
        if (arr[d].id == id) {
            retVal = d;
            break;
        }
    }
    return retVal;
}

export function refactorUnsavedItemIds(arr) {
    let retVal = arr;
    let newId = -1;
    if (arr && arr.length != 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id <= 0) {
                arr[i].id = newId;
                newId--;
            }
        }
    }
    return retVal;
}

export function removeEmptyObjects(arr) {
    let retVal = [];
    for (let q = 0; q < arr.length; q++) {
        if (arr[q] && arr[q].name && arr[q].name.length != 0) {
            retVal.push(arr[q]);
        }
    }
    return retVal;
}

export const supplementalPicklist = {
    hasSupplemntalItemsAdded: function(val) {
        if (val == util.datatypes.picklist.AREA_OF_EFFECT_SHAPE
            || val == util.datatypes.picklist.DAMAGE_TYPE
            || val == util.datatypes.combo.DAMAGE_AND_DAMAGE_TYPE) {
            return true;
        }
        return false;
    },
    itemIsSupplemental: function(val, datatype) {
        let testValue = '';
        switch (datatype) {
            case util.datatypes.picklist.AREA_OF_EFFECT_SHAPE:
                testValue = val.shape.id;
                break;
            case util.datatypes.picklist.DAMAGE_TYPE:
                testValue = val.id;
                break;
            case util.datatypes.combo.DAMAGE_AND_DAMAGE_TYPE:
                testValue = val.type.id;
                break;
            default:
                console.error('empty case in util.common.picklists.supplementalPicklist.itemIsSupplemental');
        }
        if (testValue == util.itemtypes.SUPPLEMENTAL_PICKLIST.BASED_ON_CHART
            || testValue == util.itemtypes.SUPPLEMENTAL_PICKLIST.CHOOSE_FROM_LIST) {
            return testValue;
        }
        return false;
    }
};