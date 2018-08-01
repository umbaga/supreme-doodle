import util from './util';
import * as picklistInfo from './picklistInfo';

export const picklists = picklistInfo;

export const resetObject = {
    item: function(newId) {
        let retVal = Object.assign({}, util.objectModel.ITEM);
        if (newId !== undefined) {
            retVal.id = newId;
        }
        return retVal;
    },
    itemtype: function() {
        let retVal = Object.assign({}, util.objectModel.ITEMTYPE);
        return retVal;
    }
};

export const replace = {
    description: function(val) {
        return val.replace('W ', 'W').replace('ecom e', 'ecome').replace(' som e ', ' some ').replace('Som e ', 'Some ')
            .replace('som eone', 'someone').replace('becom e', 'become').replace('dlO ', 'd10 ');
    }
};

export const formState = {
    functions: {
        set: {
            objectValue: function(obj, prop, val, action) {
                if (typeof prop === 'string') {
                    return util.common.formState.functions.set.objectValue(obj, prop.split('.'), val, action);
                } else if (prop.length == 1 && val !== undefined) {
                    if (action == undefined) {
                        return obj[prop[0]] = val;
                    } else {
                        switch (action.toLowerCase()) {
                            case 'add':
                                obj[prop[0]].push(val);
                                if (prop[0] == 'items') {
                                    obj[prop[0]].sort(function(a, b) {
                                        if (a.name > b.name) {
                                            return 1;
                                        }
                                        if (a.name < b.name) {
                                            return -1;
                                        }
                                        return 0;
                                    });
                                }
                                return obj[prop[0]];
                            case 'remove':
                                return obj[prop[0]].splice(val, 1);
                            default:
                        }
                    }
                } else if (prop.length == 0) {
                    return obj;
                } else {
                    return util.common.formState.functions.set.objectValue(obj[prop[0]], prop.slice(1), val, action);
                }
            },
            fieldFromTargetName: function(event) {
                if (event.target.getAttribute('id')) {
                    return event.target.getAttribute('id');
                } else {
                    if (event.target.getAttribute('name')) {
                        return event.target.getAttribute('name');
                    } else {
                        let testObject = event.target.parentElement;
                        let assigned = false;
                        while (!assigned) {
                            if (testObject && testObject.getAttribute('name')) {
                                assigned = true;
                                return testObject.getAttribute('name');
                            } else {
                                testObject = testObject.parentElement;
                            }
                        }
                    }
                }
            },
            dataTypeFromTarget: function(event) {
                if (event.target.getAttribute('dataType')) {
                    return event.target.getAttribute('dataType');
                } else {
                    let testObject = event.target.parentElement;
                    let assigned = false;
                    while (!assigned) {
                        if (testObject && testObject.getAttribute('dataType')) {
                            assigned = true;
                            return testObject.getAttribute('dataType');
                        } else {
                            testObject = testObject.parentElement;
                        }
                    }
                }
            },
            valueFromTarget: function(event, attrName) {
                if (event.target.getAttribute(attrName)) {
                    return event.target.getAttribute(attrName);
                } else {
                    let testObject = event.target.parentElement;
                    let assigned = false;
                    while (!assigned) {
                        if (testObject && testObject.getAttribute(attrName)) {
                            assigned = true;
                            return testObject.getAttribute(attrName);
                        } else {
                            if (testObject) {
                                testObject = testObject.parentElement;
                            } else {
                                assigned = true;
                                return -1;
                            }
                            
                        }
                    }
                }
            }
        }
    },
    standard: function(event, obj, picklists, arrayObject) {
        let retVal = obj;
        let field = util.common.formState.functions.set.fieldFromTargetName(event);
        let dataType = util.common.formState.functions.set.dataTypeFromTarget(event);
        let newSelectedValue = {};
        let inputType = event.target.type;
        let selectedIndex = util.common.formState.functions.set.valueFromTarget(event, 'value');
        switch (dataType) {
            case util.datatypes.ACTION.LIST.NEW.ADD:
                util.common.formState.functions.set.objectValue(retVal, field, arrayObject, 'add');
                break;
            case util.datatypes.ACTION.LIST.NEW.REMOVE:
                util.common.formState.functions.set.objectValue(retVal, field, selectedIndex, 'remove');
                break;
            case util.datatypes.ARRAY.LIST.ADD.NEW:
            case util.datatypes.NUMBER.CHARACTER_LEVEL:
            case util.datatypes.NUMBER.INT:
            case util.datatypes.NUMBER.DEC:
            case util.datatypes.NUMBER.SPELL_LEVEL:
            case util.datatypes.STRING.SHORT:
            case util.datatypes.STRING.LONG:
                util.common.formState.functions.set.objectValue(retVal, field, event.target.value);
                break;
            case util.datatypes.BOOL:
                util.common.formState.functions.set.objectValue(retVal, field, event.target.checked);
                break;
            default:
                console.error('Missing Datatype in switch: ' + dataType);
        }
        return retVal;
    }
};