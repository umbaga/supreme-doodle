import util from './util';

export function assignedEquipment() {
    let retVal = Object.assign({}, util.objectModel.ASSIGNED_EQUIPMENT);

    return retVal;
}

export function background() {
    let retVal = Object.assign({}, util.objectModel.BACKGROUND);
    retVal.charts = [];
    retVal.equipment = {
        startingGold: 0,
        assigned: [],
        variant: {
            gain: [],
            lose: []
        }
    };
    retVal.feature = {
        id: 0,
        name: '',
        description: ''
    };
    retVal.proficiencies = {
        assigned: [],
        select: {
            category: [],
            list: []
        },
        variant: {
            gain: {
                assigned: [],
                select: {
                    category: [],
                    list: []
                }
            },
            lose: {
                assigned: [],
                select: {
                    category: [],
                    list: []
                }
            }
        }
    };
    return retVal;
}

export function chart(currentChartCount) {
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
}

export function chartColumn(newIndex) {
    let retVal = util.objectModel.CHART_COLUMN;
    retVal.columnIndex = newIndex;
    retVal.dataType = {id: util.itemtypes.TYPE.DATA_TYPE.STRING};
    retVal.picklist = {id: 0};
    return retVal;
}

export function chartEntry(newColumnIndex, newRowIndex) {
    let retVal = Object.assign({}, util.objectModel.CHART_ENTRY);
    retVal.columnIndex = newColumnIndex;
    retVal.rowIndex = newRowIndex;
    return retVal;
}

export function chartRow(newIndex) {
    let retVal = Object.assign({}, util.objectModel.CHART_ROW);
    retVal.rowIndex = newIndex;
    return retVal;
}

export function equipment(equipmentCategory, oldEquipment) {
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
}

export function item(newId) {
    let retVal = Object.assign({}, util.objectModel.ITEM);
    if (newId !== undefined) {
        retVal.id = newId;
    }
    return retVal;
}

export function itemtype() {
    let retVal = Object.assign({}, util.objectModel.ITEMTYPE);
    return retVal;
}

export function picklist() {
    let retVal = Object.assign({}, util.objectModel.PICKLIST);
    retVal.items = [];
    return retVal;
}

export function proficiency() {
    let retVal = Object.assign({}, util.objectModel.PROFICIENCY);
    retVal.abilityScore = {id: 0};
    retVal.category = {id: 0};
    retVal.language = {};
    retVal.language.dialects = [];
    retVal.language.rarity = {id: 0};
    retVal.language.script = {id: 0};
    return retVal;
}

export const select = {
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
}

export function trinket(newId) {
    let retVal = Object.assign({}, util.objectModel.TRINKET);
    if (newId !== undefined) {
        retVal.id = newId;
    }
    return retVal;
}