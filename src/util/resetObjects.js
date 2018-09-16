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

export function damage() {
    let retVal = util.objectModel.DAMAGE;
    retVal.dice = util.objectModel.DICE;
    retVal.type = {id: 0};
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

export function mechanic(newId) {
    let retVal = Object.assign({}, util.objectModel.MECHANIC);
    if (newId !== undefined) {
        retVal.id = newId * -1;
    }
    retVal.bonus = {};
    retVal.bonus.abilityScore = {id: 0};
    retVal.bonus.advancement = {};
    retVal.bonus.advancement.type = {id: 0};
    retVal.bonus.advancement.atLevels = [];
    retVal.bonus.advancement.levelCount = 1;
    retVal.bonus.dice = util.objectModel.DICE;
    retVal.bonus.type = {id: 0};
    retVal.bonus.value = 1;
    retVal.conditionalText = '';
    retVal.specialText = '';
    retVal.target = {id: 0};
    retVal.type = {id: 0};
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

export function race() {
    let retVal = Object.assign({}, util.objectModel.SPELL);
    retVal.id = 0;
    retVal.name = '';
    retVal.description = '';
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
};

export function spell() {
    let retVal = Object.assign({}, util.objectModel.SPELL);
    retVal.id = 0;
    retVal.name = '';
    retVal.description = '';
    retVal.atHigherLevels = '';
    retVal.castingTime = {};
    retVal.castingTime.text = '';
    retVal.castingTime.unit = {id: util.itemtypes.TYPE.DEFAULT.UNIT.CASTING_TIME};
    retVal.castingTime.value = 1;
    retVal.charts = [];
    retVal.components = [];
    retVal.damage = {};
    retVal.damage.abilityScore = {id: 0};
    retVal.damage.advancement = {};
    retVal.damage.advancement.atLevels = [];
    retVal.damage.advancement.dice = util.objectModel.DICE;
    retVal.damage.advancement.levelCount = 1;
    retVal.damage.advancement.projectileCount = 0;
    retVal.damage.advancement.type = {id: util.itemtypes.TYPE.DEFAULT.ADVANCEMENT_TYPE};
    retVal.damage.applyAbilityScoreModifier = false;
    retVal.damage.areaOfEffect = {};
    retVal.damage.areaOfEffect.shape = util.objectModel.ITEM;
    retVal.damage.areaOfEffect.unit = {id: util.itemtypes.TYPE.DEFAULT.UNIT.LENGTH};
    retVal.damage.areaOfEffect.value = 0;
    retVal.damage.attack = {};
    retVal.damage.attack.type = util.objectModel.ITEM;
    retVal.damage.attack.addedToAttack = false;
    retVal.damage.condition = util.objectModel.ITEM;
    retVal.damage.conditionList = {};
    retVal.damage.conditionList.isInclusive = false;
    retVal.damage.conditionList.count = 1;
    retVal.damage.conditionList.list = [];
    retVal.damage.dice = util.objectModel.DICE;
    retVal.damage.projectileCount = 0;
    retVal.damage.savingThrow = {};
    retVal.damage.savingThrow.abilityScore = util.objectModel.ITEM;
    retVal.damage.savingThrow.effect = util.objectModel.ITEM;
    retVal.damage.savingThrow.isRepeating = false;
    retVal.damage.savingThrow.countToAvoid = 1;
    retVal.damage.supplemental = [];
    retVal.damage.type = util.objectModel.ITEM;
    retVal.damage.typeList = {};
    retVal.damage.typeList.isInclusive = false;
    retVal.damage.typeList.count = 1;
    retVal.damage.typeList.list = [];
    retVal.duration = {};
    retVal.duration.concentration = {};
    retVal.duration.concentration.unit = util.objectModel.ITEM;
    retVal.duration.concentration.value = 0;
    retVal.duration.unit = util.objectModel.ITEM;
    retVal.duration.value = 0;
    retVal.isRitual = false;
    retVal.level = 0;
    retVal.materialComponentText = '';
    retVal.mechanics = [];
    retVal.range = {};
    retVal.range.areaOfEffect = {};
    retVal.range.areaOfEffect.shape = util.objectModel.ITEM;
    retVal.range.areaOfEffect.unit = {id: util.itemtypes.TYPE.DEFAULT.UNIT.LENGTH};
    retVal.range.areaOfEffect.value = 0;
    retVal.range.unit = util.objectModel.ITEM;
    retVal.range.value = 0;
    retVal.resource = {id: util.itemtypes.TYPE.RESOURCE.PHB};
    retVal.school = util.objectModel.ITEM;
    retVal.supplementalDescriptions = [];
    return retVal;
}

export function spelllist() {
    let retVal = util.objectModel.SPELLLIST;
    retVal.name = '';
    retVal.spells = [];
    retVal.resource = {id: util.itemtypes.TYPE.RESOURCE.PHB};
    return retVal;
}

export function supplementalDescription(newIndex) {
    let retVal = Object.assign({}, util.objectModel.SUPPLEMENTAL_DESCRIPTION);
    retVal.id = newIndex * -1;
    retVal.orderIndex = newIndex;
    retVal.title = '';
    retVal.description = '';
    return retVal;
}

export function trinket(newId) {
    let retVal = Object.assign({}, util.objectModel.TRINKET);
    if (newId !== undefined) {
        retVal.id = newId;
    }
    return retVal;
}