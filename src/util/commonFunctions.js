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
        retVal.equipment = {
            startingGold: 0,
            assigned: []
        };
        retVal.charts = [];
        retVal.proficiencies = {
            assigned: [],
            select: {
                category: [],
                list: []
            }
        };
        retVal.feature = {
            id: 0,
            name: '',
            description: ''
        };
        return retVal;
    },
    chart: function(currentChartCount) {
        let retVal = Object.assign({}, util.objectModel.CHART);
        retVal.id = -1 * currentChartCount;
        retVal.orderIndex = currentChartCount;
        retVal.columnCount = 0;
        retVal.rowCount = 0;
        retVal.columns = [];
        retVal.entries = [];
        retVal.rows = [];
        retVal.dice = util.objectModel.DICE;
        return retVal;
    },
    chartColumn: function(newIndex) {
        let retVal = util.objectModel.CHART_COLUMN;
        retVal.columnIndex = newIndex;
        retVal.dataType = {id: util.itemtypes.TYPE.DATA_TYPE.STRING};
        retVal.picklist = {id: 0};
        return retVal;
    },
    chartEntry: function(newColumnIndex, newRowIndex) {
        let retVal = Object.assign({}, util.objectModel.CHART_ENTRY);
        retVal.columnIndex = newColumnIndex;
        retVal.rowIndex = newRowIndex;
        return retVal;
    },
    chartRow: function(newIndex) {
        let retVal = Object.assign({}, util.objectModel.CHART_ROW);
        retVal.rowIndex = newIndex;
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
        return val.replace('W ', 'W').replace('ecom e', 'ecome').replace(' som e ', ' some ').replace('Som e ', 'Some ').replace(' ing', 'ing')
            .replace('com e ', 'come ').replace('som eone', 'someone').replace('becom e', 'become').replace('dlO ', 'd10 ').replace('w ood', 'wood');
    }
};

export const charts = {
    refactorIndexes: {
        columns: function(columns) {
            let retVal = columns.sort(function(a, b) {
                return a.columnIndex - b.columnIndex;
            });
            for (let q = 0; q < columns.length; q++) {
                retVal[q].columnIndex = q;
            }
            return retVal;
        },
        entries: function(entries, rows, columns) {
            let retVal = entries.sort(function(a, b) {
                if (a.rowIndex != b.rowIndex) {
                    return a.rowIndex - b.rowIndex;
                } else {
                    return a.columnIndex - b.columnIndex;
                }
            });
            let counter = 0;
            for (let q = 0; q < columns.length; q++) {
                for (let w = 0; w < rows.length; w++) {
                    entries[counter].rowIndex = w;
                    entries[counter].columnIndex = q;
                    counter++;
                }
            }
            retVal = retVal.sort(function(a, b) {
                if (a.rowIndex == b.rowIndex) {
                    return a.columnIndex - b.columnIndex;
                } else {
                    return a.rowIndex - b.rowIndex;
                }
            });
            return retVal;
        },
        rows: function(rows, chart) {
            let retVal = rows.sort(function(a, b) {
                return a.rowIndex - b.rowIndex;
            });
            for (let q = 0; q < rows.length; q++) {
                retVal[q].rowIndex = q;
            }
            if (chart && chart.type.id == util.itemtypes.TYPE.CHART.DICE) {
                for (let q = 0; q < retVal.length; q++) {
                    if (q == 0) {
                        if (retVal[0].diceRange.minimum > util.common.calculate.dice.minimum(chart.dice)) {
                            retVal[0].diceRange.minimum = util.common.calculate.dice.minimum(chart.dice);
                        }
                    } else if (q == retVal.length - 1) {
                        if (retVal[retVal.length - 1].diceRange.maximum < util.common.calculate.dice.maximum(chart.dice)) {
                            retVal[retVal.length - 1].diceRange.maximum = util.common.calculate.dice.maximum(chart.dice);
                        }
                        if ((retVal[q].diceRange.minimum - retVal[q - 1].diceRange.maximum) > 1) {
                            retVal[q - 1].diceRange.maximum = retVal[q].diceRange.minimum - 1;
                        }
                    } else {
                        if ((retVal[q].diceRange.minimum - retVal[q - 1].diceRange.maximum) > 1) {
                            retVal[q - 1].diceRange.maximum = retVal[q].diceRange.minimum - 1;
                        }
                    }
                }
            }
            return retVal;
        }
    }
};

export const calculate = {
    dice: {
        minimum: function(val) {
            let retVal = val.dieCount;
            retVal += val.modifier;
            retVal *= val.multiplier;
            retVal /= val.divisor;
            return retVal;
        },
        maximum: function(val) {
            let retVal = val.dieCount * val.dieType;
            retVal += val.modifier;
            retVal *= val.multiplier;
            retVal /= val.divisor;
            return retVal;
        }
    }
};

export const formState = {
    functions: {
        get: {
            indexFromId: function(arr, id) {
                for (let q = 0; q < arr.length; q++) {
                    if (arr[q].id == id) {
                        return q;
                    }
                }
                return -1;
            },
            objectValue: function(obj, prop) {
                if (typeof prop === 'string') {
                    return util.common.formState.functions.get.objectValue(obj, prop.split('.'));
                } else if (prop.length == 1) {
                    return obj[prop[0]];
                } else if (prop.length == 0) {
                    return obj;
                } else {
                    return util.common.formState.functions.get.objectValue(obj[prop[0]], prop.slice(1));
                }
            }
        },
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
                                if (subfield) {
                                    return obj[prop[0]][idx][subfield] = val;
                                } else {
                                    return obj[prop[0]][idx] = val;
                                }
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
        let dataTask = util.common.formState.functions.set.valueFromTarget(event, 'data-task');
        let tmpText = '';
        let tmpVal = null;
        let tmpObj = null;
        let newRowIndex = 0;
        let newColIndex = 0;
        let oldRowCount = 0;
        let oldColumnCount = 0;
        let counter = 0;
        
        switch (dataType) {
            case util.datatypes.ACTION.CHART.ADD:
                if (arrayObject.id <= 0) {
                    util.common.formState.functions.set.objectValue(retVal, field, arrayObject, 'add');
                } else {
                    arrayItemIndex = util.common.formState.functions.get.indexFromId(retVal.charts, arrayObject.id);
                    util.common.formState.functions.set.objectValue(retVal, field, arrayObject, 'edit', arrayItemIndex);
                }
                break;
            case util.datatypes.ACTION.CHART.COLUMN.ADD:
                newColIndex = util.common.formState.functions.set.objectValue(retVal, field).length;
                util.common.formState.functions.set.objectValue(retVal, field, Object.assign({}, util.common.resetObject.chartColumn(newColIndex)), 'add');
                retVal.columnCount++;
                for (let q = 0; q < retVal.rows.length; q++) {
                    retVal.entries.push(Object.assign({}, util.common.resetObject.chartEntry(newColIndex, q)));
                }
                break;
            case util.datatypes.ACTION.CHART.COLUMN.REMOVE:
                util.common.formState.functions.set.objectValue(retVal, field, '', 'remove', selectedIndex);
                retVal.columnCount--;
                retVal.columns = util.common.charts.refactorIndexes.columns(retVal.columns);
                retVal.entries = retVal.entries.filter(function(entry) {
                    return entry.columnIndex != selectedIndex;
                });
                retVal.entries = util.common.charts.refactorIndexes.entries(retVal.entries, retVal.rows, retVal.columns);
                break;
            case util.datatypes.ACTION.CHART.CANCEL:
                retVal = util.common.resetObject.chart(arrayObject.length);
                break;
            case util.datatypes.ACTION.CHART.ROW.ADD:
                newRowIndex = util.common.formState.functions.set.objectValue(retVal, field).length;
                util.common.formState.functions.set.objectValue(retVal, field, Object.assign({}, util.common.resetObject.chartRow(newRowIndex)), 'add');
                retVal.rowCount++;
                for (let q = 0; q < retVal.columns.length; q++) {
                    retVal.entries.push(Object.assign({}, util.common.resetObject.chartEntry(q, newRowIndex)));
                }
                break;
            case util.datatypes.ACTION.CHART.EXPAND:
                if (retVal.type.id == util.itemtypes.TYPE.CHART.SELECT) {
                    tmpVal = util.common.picklists.getPicklistItems(picklists, retVal.picklist.id);
                    for (let q = retVal.rows.length; q < tmpVal.length; q++) {
                        retVal.rows.push(Object.assign({}, util.common.resetObject.chartRow(q)));
                        retVal.rowCount++;
                    }
                    for (let q = 0; q < tmpVal.length; q++) {
                        retVal.rows[q].picklistItem = tmpVal[q];
                    }
                } else if (retVal.type.id == util.itemtypes.TYPE.CHART.DICE){
                    counter = 0;
                    for (let q = util.common.calculate.dice.minimum(retVal.dice); q <= util.common.calculate.dice.maximum(retVal.dice); q++) {
                        if (retVal.rows[counter]) {
                            retVal.rows[counter].diceRange = {};
                            retVal.rows[counter].diceRange.minimum = q;
                            retVal.rows[counter].diceRange.maximum = q;
                        } else {
                            tmpObj = Object.assign({}, util.common.resetObject.chartRow(retVal.rows.length));
                            tmpObj.diceRange = {};
                            tmpObj.diceRange.minimum = q;
                            tmpObj.diceRange.maximum = q;
                            retVal.rows.push(tmpObj);
                            retVal.rowCount++;
                        }
                        counter++;
                    }
                }
                break;
            case util.datatypes.ACTION.CHART.ROW.REMOVE:
                util.common.formState.functions.set.objectValue(retVal, field, '', 'remove', selectedIndex);
                retVal.rowCount--;
                retVal.rows = util.common.charts.refactorIndexes.rows(retVal.rows, retVal);
                retVal.entries = retVal.entries.filter(function(entry) {
                    return entry.rowIndex != selectedIndex;
                });
                retVal.entries = util.common.charts.refactorIndexes.entries(retVal.entries, retVal.rows, retVal.columns);
                break;
            case util.datatypes.ACTION.CHART.REMOVE:
                util.common.formState.functions.set.objectValue(retVal, field, '', 'remove', selectedIndex);
                break;
            case util.datatypes.ACTION.CHART.SELECT:
                retVal = Object.assign({}, arrayObject[0]);
                break;
            case util.datatypes.ACTION.LIST.NEW.ADD:
            case util.datatypes.ACTION.LIST.PICKLIST.ADD:
                util.common.formState.functions.set.objectValue(retVal, field, arrayObject, 'add');
                break;
            case util.datatypes.ACTION.LIST.NEW.REMOVE:
            case util.datatypes.ACTION.LIST.PICKLIST.REMOVE:
                util.common.formState.functions.set.objectValue(retVal, field, '', 'remove', selectedIndex);
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
            case util.datatypes.SPECIAL.CHART.COLUMN.DATA_TYPE:
            case util.datatypes.SPECIAL.CHART.COLUMN.PICKLIST:
            case util.datatypes.SPECIAL.CHART.ENTRY.PICKLIST:
            case util.datatypes.SPECIAL.CHART.ROW.PICKLIST:
                newSelectedValue = util.common.picklists.getPicklistItem(picklists, event.target.value);
                util.common.formState.functions.set.objectValue(retVal, field, newSelectedValue, 'edit', arrayItemIndex, subfield);
                break;
            case util.datatypes.SPECIAL.CHART.COLUMN.STRING:
            case util.datatypes.SPECIAL.CHART.ENTRY.STRING:
            case util.datatypes.SPECIAL.CHART.ROW.STRING:
                tmpText = util.common.replace.description(event.target.innerHTML);
                util.common.formState.functions.set.objectValue(retVal, field, tmpText.trim(), 'edit', arrayItemIndex, subfield);
                break;
            case util.datatypes.SPECIAL.DICE:
            case util.datatypes.SPECIAL.CHART.ENTRY.DICE:
                if (dataTask == 'chart') {
                    if (arrayItemIndex == -1) {
                        util.common.formState.functions.set.objectValue(retVal, field, formState.dice(event));
                        tmpVal = util.common.formState.functions.get.objectValue(retVal, field);
                        if (util.datatypes.compareDataType(tmpVal.rendered, util.datatypes.SPECIAL.DICE, [0, 1, 2])) {
                            if (retVal.rows.length == 0) {
                                retVal.rowCount++;
                                tmpObj = Object.assign({}, util.common.resetObject.chartRow(0));
                                tmpObj.diceRange.minimum = util.common.calculate.dice.minimum(tmpVal);
                                tmpObj.diceRange.maximum = util.common.calculate.dice.maximum(tmpVal);
                                retVal.rows.push(tmpObj);
                            } else if (retVal.rows.length == 1) {
                                retVal.rows[0].diceRange.minimum = util.common.calculate.dice.minimum(tmpVal);
                                retVal.rows[0].diceRange.maximum = util.common.calculate.dice.maximum(tmpVal);
                            }
                        }
                    } else {
                        util.common.formState.functions.set.objectValue(retVal, field, formState.dice(event), 'edit', arrayItemIndex, subfield);
                    }
                } else {
                    util.common.formState.functions.set.objectValue(retVal, field, formState.dice(event));
                }
                break;
            case util.datatypes.SPECIAL.CHART.COLUMN.COUNT:
                oldRowCount = parseInt(retVal.rowCount);
                oldColumnCount = parseInt(retVal.columnCount);
                util.common.formState.functions.set.objectValue(retVal, field, event.target.value);
                if (oldColumnCount > retVal.columnCount) {
                    retVal.columns = retVal.columns.filter(function(column) {
                        return column.columnIndex < retVal.columnCount;
                    });
                    retVal.entries = retVal.entries.filter(function(entry) {
                        return entry.columnIndex < retVal.columnCount;
                    });
                } else if (oldColumnCount < retVal.columnCount) {
                    for (let q = oldColumnCount; q < retVal.columnCount; q++) {
                        retVal.columns.push(Object.assign({}, util.common.resetObject.chartColumn(q)));
                        for (let w = 0; w < retVal.rows.length; w++) {
                            retVal.entries.push(Object.assign({}, util.common.resetObject.chartEntry(q, w)));
                        }
                    }
                }
                break;
            case util.datatypes.SPECIAL.CHART.ENTRY.BOOL:
                util.common.formState.functions.set.objectValue(retVal, field, event.target.checked, 'edit', arrayItemIndex, subfield);
                break;
            case util.datatypes.SPECIAL.CHART.ENTRY.NUMBER:
                util.common.formState.functions.set.objectValue(retVal, field, event.target.value, 'edit', arrayItemIndex, subfield);
                break;
            case util.datatypes.SPECIAL.CHART.ROW.COUNT:
                oldRowCount = parseInt(retVal.rowCount);
                oldColumnCount = parseInt(retVal.columnCount);
                util.common.formState.functions.set.objectValue(retVal, field, event.target.value);
                if (oldRowCount > retVal.rowCount) {
                    retVal.rows = retVal.rows.filter(function(row) {
                        return row.rowIndex < retVal.rowCount;
                    });
                    retVal.entries = retVal.entries.filter(function(entry) {
                        return entry.rowIndex < retVal.rowCount;
                    });
                } else if (oldRowCount < retVal.rowCount) {
                    for (let q = oldRowCount; q < retVal.rowCount; q++) {
                        retVal.rows.push(Object.assign({}, util.common.resetObject.chartRow(q)));
                        for (let w = 0; w < retVal.columns.length; w++) {
                            retVal.entries.push(Object.assign({}, util.common.resetObject.chartEntry(w, q)));
                        }
                    }
                }
                break;
            case util.datatypes.SPECIAL.CHART.ROW.DICE_RANGE:
                retVal.rows[arrayItemIndex].diceRange.maximum = event.target.value;
                if (arrayItemIndex < retVal.rows.length - 1) {
                    retVal.rows[parseInt(arrayItemIndex) + 1].diceRange.minimum = parseInt(retVal.rows[arrayItemIndex].diceRange.maximum) + 1;
                } else {
                    tmpObj = Object.assign({}, util.common.resetObject.chartRow(retVal.rows.length));
                    tmpObj.diceRange = {};
                    tmpObj.diceRange.minimum = parseInt(retVal.rows[arrayItemIndex].diceRange.maximum) + 1;
                    tmpObj.diceRange.maximum = util.common.calculate.dice.maximum(retVal.dice);
                    retVal.rows.push(tmpObj);
                    for (let q = 0; q < retVal.columns.length; q++) {
                        retVal.entries.push(Object.assign({}, util.common.resetObject.chartEntry(q, retVal.rows.length - 1)));
                    }
                }
                break;
            case util.datatypes.STRING.HTML.LONG:
                tmpText = util.common.replace.description(event.target.innerHTML);
                util.common.formState.functions.set.objectValue(retVal, field, tmpText.trim());
                break;
            case util.datatypes.STRING.SHORT:
            case util.datatypes.STRING.LONG:
            case util.datatypes.ARRAY.LIST.ADD.NEW:
            case util.datatypes.ARRAY.TAGS.ADD.NEW:
            case util.datatypes.NUMBER.CHARACTER_LEVEL:
            case util.datatypes.NUMBER.INT:
            case util.datatypes.NUMBER.DEC:
            case util.datatypes.NUMBER.SPELL_LEVEL:
                if (arrayItemIndex == -1) {
                    util.common.formState.functions.set.objectValue(retVal, field, event.target.value);
                } else {
                    util.common.formState.functions.set.objectValue(retVal, field, event.target.value, 'edit', arrayItemIndex, subfield);
                }
                break;
            default:
                console.error('Missing Datatype in switch: ' + dataType);
        }
        return retVal;
    }
};