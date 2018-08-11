import util from './util';
import * as picklistInfo from './picklistInfo';

export const picklists = picklistInfo;

export const resetObject = {
    assignedEquipment: function() {
        let retVal = Object.assign({}, util.objectModel.ASSIGNED_EQUIPMENT);
        
        return retVal;
    },
    background: function() {
        let retVal = Object.assign({}, util.objectModel.BACKGROUND);
        
        return retVal;
    },
    chart: function(currentChartCount) {
        let retVal = Object.assign({}, util.objectModel.BACKGROUND);
        retVal.id = -1 * currentChartCount;
        retVal.orderIndex = currentChartCount;
        return retVal;
    },
    equipment: function(equipmentCategory, oldEquipment) {
        let retVal = Object.assign({}, util.objectModel.EQUIPMENT);
        retVal.ammunition = {id: 0};
        retVal.armor = {};
        retVal.armor.armorClass = {};
        retVal.armor.armorClass.applyDexterity = true;
        retVal.armor.armorClass.base = 11;
        retVal.armor.armorClass.isCumulative = false;
        retVal.armor.armorClass.maximumDexterity = 0;
        retVal.armor.armorClass.hasMaximumDexterity = false;
        retVal.armor.hasMinimumStrength = false;
        retVal.armor.minimumStrength = 0;
        retVal.armor.stealthDisadvantage = false;
        retVal.assignedEquipment = [];
        retVal.carryCapacity = 0;
        if (equipmentCategory && equipmentCategory.id && equipmentCategory.id != 0) {
            retVal.category = equipmentCategory;
        } else {
            retVal.category = {id: 0};
        }
        retVal.cost = 0;
        retVal.count = 1;
        retVal.description = '';
        retVal.isImprovisedWeapon = false;
        if (oldEquipment && (oldEquipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR || oldEquipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON
            || oldEquipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.LAND_VEHICLE || oldEquipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE)
           && (oldEquipment.proficiency && oldEquipment.proficiency.id && oldEquipment.proficiency.id != 0)) {
            retVal.proficiency = oldEquipment.proficiency;
        } else {
            retVal.proficiency = {id: 0};
        }
        retVal.speed = 0;
        retVal.unit = '';
        retVal.weight = 0;
        retVal.weapon = {};
        if (oldEquipment && oldEquipment.category.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON && oldEquipment && oldEquipment.weapon && oldEquipment.weapon.class && oldEquipment.weapon.class.id != 0) {
            retVal.weapon.class = oldEquipment.weapon.class;
        } else {
            retVal.weapon.class = {id: 0};
        }
        
        retVal.weapon.damage = {};
        retVal.weapon.damage.dice = {id: 0, rendered: ''};
        retVal.weapon.damage.type = {id: 0};
        retVal.weapon.damage.versatile = {};
        retVal.weapon.damage.versatile.dice = {id: 0, rendered: ''};
        retVal.weapon.properties = [],
        retVal.weapon.range = {};
        retVal.weapon.range.maximum = 0;
        retVal.weapon.range.normal = 0;
        retVal.weapon.special = '';
        return retVal;
    },
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
    },
    picklist: function() {
        let retVal = Object.assign({}, util.objectModel.PICKLIST);
        retVal.items = [];
        return retVal;
    },
    proficiency: function() {
        let retVal = Object.assign({}, util.objectModel.PROFICIENCY);
        retVal.abilityScore = {id: 0};
        retVal.category = {id: 0};
        retVal.language = {};
        retVal.language.dialects = [];
        retVal.language.rarity = {id: 0};
        retVal.language.script = {id: 0};
        return retVal;
    },
    select: {
        proficiency: {
            category: function() {
                let retVal = Object.assign({}, util.objectModel.SELECT.PROFICIENCY.CATEGORY);
                return retVal;
            },
            list: function() {
                let retVal = Object.assign({}, util.objectModel.SELECT.PROFICIENCY.LIST);
                retVal.proficiencies = [];
                return retVal;
            }
        }
    },
    trinket: function(newId) {
        let retVal = Object.assign({}, util.objectModel.TRINKET);
        if (newId !== undefined) {
            retVal.id = newId;
        }
        return retVal;
    }
};

export const replace = {
    description: function(val) {
        return val.replace('W ', 'W').replace('ecom e', 'ecome').replace(' som e ', ' some ').replace('Som e ', 'Some ')
            .replace('som eone', 'someone').replace('becom e', 'become').replace('dlO ', 'd10 ').replace('w ood', 'wood');
    }
};

export const formState = {
    functions: {
        set: {
            objectValue: function(obj, prop, val, action, idx, subfield) {
                if (typeof prop === 'string') {
                    return util.common.formState.functions.set.objectValue(obj, prop.split('.'), val, action, idx, subfield);
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
                                return obj[prop[0]].splice(idx, 1);
                            case 'edit':
                                return obj[prop[0]][idx][subfield] = val;
                            default:
                        }
                    }
                } else if (prop.length == 0) {
                    return obj;
                } else {
                    return util.common.formState.functions.set.objectValue(obj[prop[0]], prop.slice(1), val, action, idx, subfield);
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
    dice: function(event) {
        let retVal = {};
        let newRenderedValue = '';
        if (event.target.value && event.target.value.length != 0) {
            for (let y = 0; y < event.target.value.length; y++) {
                if (event.target.value.charAt(y) == '1' || event.target.value.charAt(y) == '2' ||
                   event.target.value.charAt(y) == '3' || event.target.value.charAt(y) == '4' ||
                   event.target.value.charAt(y) == '5' || event.target.value.charAt(y) == '6' ||
                   event.target.value.charAt(y) == '7' || event.target.value.charAt(y) == '8' ||
                   event.target.value.charAt(y) == '9' || event.target.value.charAt(y) == '0' ||
                   event.target.value.charAt(y) == 'd' || event.target.value.charAt(y) == 'D' ||
                   event.target.value.charAt(y) == '+' || event.target.value.charAt(y) == '-' ||
                   event.target.value.charAt(y) == 'x' || event.target.value.charAt(y) == 'X' ||
                    event.target.value.charAt(y) == '*' || event.target.value.charAt(y) == '/') {
                    newRenderedValue += event.target.value.charAt(y);
                }
            }
        }
        if (util.datatypes.compareDataType(newRenderedValue, util.datatypes.SPECIAL.DICE)) {
            if (event.target.value.indexOf('+') != -1 || event.target.value.indexOf('-') != -1) {
                if (event.target.value.indexOf('+') != -1) {
                    retVal.modifier = parseInt(event.target.value.split('+')[1]);
                } else {
                    retVal.modifier = -1 * parseInt(event.target.value.split('-')[1]);
                }
                retVal.multiplier = 1;
                retVal.divisor = 1;
            } else if (event.target.value.indexOf('x') != -1 || event.target.value.indexOf('*') != -1) {
                if (event.target.value.indexOf('x') != -1) {
                    retVal.multiplier = parseInt(event.target.value.toLowerCase().split('x')[1]);
                } else {
                    retVal.multiplier = parseInt(event.target.value.split('*')[1]);
                }
                retVal.modifier = 0;
                retVal.divisor = 1;
            } else if (event.target.value.indexOf('/') != -1) {
                retVal.divisor = parseInt(event.target.value.split('/')[1]);
                retVal.modifier = 0;
                retVal.multiplier = 1;
            } else {
                retVal.modifier = 0;
                retVal.multiplier = 1;
                retVal.divisor = 1;
            }
            retVal.dieCount = parseInt(event.target.value.toLowerCase().split('d')[0]);
            retVal.dieType = parseInt(event.target.value.toLowerCase().split('d')[1]);
        } else {
            retVal.id = 0;
            if (event.target.value.length != 0) {
                retVal.dieCount = parseInt(event.target.value.toLowerCase().split('d')[0]);
            } else {
                retVal.dieCount = 0;
            }
            retVal.dieType = 1;
            retVal.modifier = 0;
            retVal.multiplier = 1;
            retVal.divisor = 1;
        }
        retVal.rendered = newRenderedValue;
        return retVal;
    },
    standard: function(event, obj, picklists, arrayObject) {
        let retVal = obj;
        let field = util.common.formState.functions.set.fieldFromTargetName(event).split('_idx_')[0];
        let arrayItemIndex = -1;
        let subfield = '';
        if (util.common.formState.functions.set.fieldFromTargetName(event).split('_idx_').length > 1) {
            arrayItemIndex = util.common.formState.functions.set.fieldFromTargetName(event).split('_idx_')[1];
            subfield = util.common.formState.functions.set.fieldFromTargetName(event).split('_idx_')[2];
        }
        let dataType = util.common.formState.functions.set.dataTypeFromTarget(event);
        let newSelectedValue = {};
        let inputType = event.target.type;
        let selectedIndex = util.common.formState.functions.set.valueFromTarget(event, 'value');
        let tmpText = '';
        switch (dataType) {
            case util.datatypes.ACTION.LIST.NEW.ADD:
            case util.datatypes.ACTION.LIST.PICKLIST.ADD:
                util.common.formState.functions.set.objectValue(retVal, field, arrayObject, 'add');
                break;
            case util.datatypes.ACTION.LIST.NEW.REMOVE:
            case util.datatypes.ACTION.LIST.PICKLIST.REMOVE:
                util.common.formState.functions.set.objectValue(retVal, field, '', 'remove', selectedIndex);
                break;
            case util.datatypes.ARRAY.LIST.ADD.NEW:
            case util.datatypes.ARRAY.TAGS.ADD.NEW:
            case util.datatypes.NUMBER.CHARACTER_LEVEL:
            case util.datatypes.NUMBER.INT:
            case util.datatypes.NUMBER.DEC:
            case util.datatypes.NUMBER.SPELL_LEVEL:
            case util.datatypes.STRING.SHORT:
            case util.datatypes.STRING.LONG:
                if (arrayItemIndex == -1) {
                    util.common.formState.functions.set.objectValue(retVal, field, event.target.value);
                } else {
                    util.common.formState.functions.set.objectValue(retVal, field, event.target.value, 'edit', arrayItemIndex, subfield);
                }
                break;
            case util.datatypes.ARRAY.TAGS.ADD.PICKLIST:
                if (field.split('_').length == 1) {
                    if (inputType == 'text') {
                        newSelectedValue.id = 0;
                        newSelectedValue.name = event.target.value;
                    } else {
                        newSelectedValue = util.common.picklists.getPicklistItem(picklists, event.target.options[event.target.selectedIndex].value);
                    }
                    retVal = newSelectedValue;
                }
                break;
            case util.datatypes.ARRAY.LIST.ADD.WITH_VALUE.PICKLIST.INT:
                for (let key in retVal) {
                    if (retVal.hasOwnProperty(key)) {
                        if (util.common.picklists.getPicklistItem(picklists, event.target.options[event.target.selectedIndex].value)[key] !== undefined && util.common.picklists.getPicklistItem(picklists, event.target.options[event.target.selectedIndex].value)[key] !== null) {
                            newSelectedValue[key] = util.common.picklists.getPicklistItem(picklists, event.target.options[event.target.selectedIndex].value)[key];
                        } else {
                            newSelectedValue[key] = retVal[key];
                        }
                    }
                }
                retVal = newSelectedValue;
                break;
            case util.datatypes.BOOL:
                util.common.formState.functions.set.objectValue(retVal, field, event.target.checked);
                break;
            case util.datatypes.PICKLIST:
                if (field.split('_').length == 1) {
                    if (inputType == 'text') {
                        newSelectedValue.id = 0;
                        newSelectedValue.name = event.target.value;
                    } else {
                        newSelectedValue.id = parseInt(event.target.options[event.target.selectedIndex].value);
                        newSelectedValue.name = event.target.options[event.target.selectedIndex].text;
                    }
                    util.common.formState.functions.set.objectValue(retVal, field, newSelectedValue);
                }
                break;
            case util.datatypes.SPECIAL.DICE:
                util.common.formState.functions.set.objectValue(retVal, field, formState.dice(event));
                break;
            case util.datatypes.STRING.HTML.LONG:
                tmpText = util.common.replace.description(event.target.innerHTML);
                util.common.formState.functions.set.objectValue(retVal, field, tmpText.trim());
                break;
            default:
                console.error('Missing Datatype in switch: ' + dataType);
        }
        return retVal;
    }
};