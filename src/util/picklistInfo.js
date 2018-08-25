import util from './util';

export function getPicklistItems (picklistArray, picklistId, categoryIds) {
    let retVal = [];
    let tmp = picklistArray.filter(function(picklist) {
        if (picklistId.constructor === Array) {
            for (let e = 0; e < picklistId.length; e++) {
                if (picklist.id == picklistId[e]) {
                    return true;
                }
            }
            return false;
        } else {
            return picklist.id == picklistId;
        }
    });
    for (let e = 0; e < tmp.length; e++) {
        let tmpItems = tmp[e].items;
        let typeId = tmp[e].id;
        for (let w = 0; w < tmpItems.length; w++) {
            tmpItems[w].type = {};
            tmpItems[w].type.id = typeId;
        }
        if (categoryIds !== null && categoryIds !== undefined) {
            if (picklistId.constructor === Array) {
                if (categoryIds.constructor === Array) {
                    if (categoryIds[e] !== null && categoryIds[e] !== undefined) {
                        tmpItems = tmpItems.filter(function(item) {
                            if (categoryIds[e].constructor === Array) {
                                for (let q = 0; q < categoryIds[e].length; q++) {
                                    if (categoryIds[e][q] == item.category.id) {
                                        return true;
                                    }
                                }
                                return false;
                            } else {
                                return item.category.id == categoryIds[e];
                            }
                        });
                    }
                }
            } else {
                tmpItems = tmpItems.filter(function(item) {
                    if (categoryIds.constructor === Array) {
                        for (let q = 0; q < categoryIds.length; q++) {
                            if (categoryIds[q] == item.category.id) {
                                return true;
                            }
                        }
                        return false;
                    } else {
                        return item.category.id == categoryIds;
                    }
                });
            }
        }
        retVal = retVal.concat(tmpItems);
    }
    retVal = retVal.sort(function(a, b) {
        if (a.orderIndex !== null && a.orderIndex !== undefined) {
            return a.orderIndex - b.orderIndex;
        } else {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        }
        
    });
    return retVal;
}

export function getPicklistIdFromItem (picklists, item) {
    for (let q = 0; q < picklists.length; q++) {
        for (let w = 0; w < picklists[q].items.length; w++) {
            if (picklists[q].items[w].id == item.id) {
                return picklists[q].id;
            }
        }
    }
    return -1;
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