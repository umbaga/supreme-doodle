export const action = {
    ASSIGNED_EQUIPMENT: {
        ADD: 'DATA_ACTION_ASSIGNED_EQUIPMENT_ADD',
        REMOVE: 'DATA_ACTION_ASSIGNED_EQUIPMENT_REMOVE'
    },
    BREATH_WEAPON: {
        ADD: 'DATA_ACTION_BREATH_WEAPON_ADD',
        IMPROVEMENT: {
            CHARGES: {
                ADD: 'DATA_ACTION_BREATH_WEAPON_IMPROVEMENT_CHARGES_ADD',
                REMOVE: 'DATA_ACTION_BREATH_WEAPON_IMPROVEMENT_CHARGES_REMOVE'
            },
            DAMAGE: {
                ADD: 'DATA_ACTION_BREATH_WEAPON_IMPROVEMENT_DAMAGE_ADD',
                REMOVE: 'DATA_ACTION_BREATH_WEAPON_IMPROVEMENT_DAMAGE_REMOVE'
            }
        },
        REMOVE: 'DATA_ACTION_BREATH_WEAPON_REMOVE',
        RESET: 'DATA_ACTION_BREATH_WEAPON_RESET',
        SELECT: 'DATA_ACTION_BREATH_WEAPON_SELECT'
    },
    CHART: {
        ADD: 'DATA_ACTION_CHART_ADD',
        CHANGE_INDEX: {
            UP: 'DATA_ACTION_CHART_CHANGE_INDEX_UP',
            DOWN: 'DATA_ACTION_CHART_CHANGE_INDEX_DOWN'
        },
        EXPAND_DIE: 'DATA_ACTION_CHART_EXPAND_DIE',
        EXPAND_SELECTION: 'DATA_ACTION_CHART_EXPAND_SELECTION',
        REMOVE: 'DATA_ACTION_CHART_REMOVE',
        REMOVE_ENTRY: 'DATA_ACTION_CHART_REMOVE_ENTRY',
        SELECT: 'DATA_ACTION_CHART_SELECT',
        RESET: 'DATA_ACTION_CHART_RESET'
    },
    DESCRIPTION: {
        ADD: 'DATA_ACTION_DESCRIPTION_ADD',
        CHANGE_INDEX: {
            UP: 'DATA_ACTION_CHART_DESCRIPTION_INDEX_UP',
            DOWN: 'DATA_ACTION_CHART_DESCRIPTION_INDEX_DOWN'
        },
        REMOVE: 'DATA_ACTION_DESCRIPTION_REMOVE',
        RESET: 'DATA_ACTION_DESCRIPTION_RESET',
        SELECT: 'DATA_ACTION_DESCRIPTION_SELECT'
    },
    DAMAGE_GROUPING: {
        ADD: 'DATA_ACTION_DAMAGE_GROUPING_ADD',
        REMOVE: 'DATA_ACTION_DAMAGE_GROUPING_REMOVE'
    },
    MECHANIC: {
        ADD: 'DATA_ACTION_MECHANIC_ADD',
        REMOVE: 'DATA_ACTION_MECHANIC_REMOVE',
        RESET: 'DATA_ACTION_MECHANIC_RESET',
        SELECT: 'DATA_ACTION_MECHANIC_SELECT'
    },
    NATURAL_WEAPON: {
        ADD: 'DATA_ACTION_NATURAL_WEAPON_ADD',
        REMOVE: 'DATA_ACTION_NATURAL_WEAPON_REMOVE',
        RESET: 'DATA_ACTION_NATURAL_WEAPON_RESET',
        SELECT: 'DATA_ACTION_NATURAL_WEAPON_SELECT'
    },
    PREREQUISITE: {
        ADD: 'DATA_ACTION_PREREQUISITE_ADD',
        REMOVE: 'DATA_ACTION_PREREQUISITE_REMOVE',
        RESET: 'DATA_ACTION_PREREQUISITE_RESET',
        SELECT: 'DATA_ACTION_PREREQUISITE_SELECT'
    },
    PROFICIENCY_GROUP: {
        ADD: 'DATA_ACTION_PROFICIENCY_GROUP_ADD',
        REMOVE: 'DATA_ACTION_PROFICIENCY_GROUP_REMOVE',
        RESET: 'DATA_ACTION_PROFICIENCY_GROUP_RESET',
        SELECT: 'DATA_ACTION_PROFICIENCY_GROUP_SELECT'
    },
    SPELL_SELECTION: {
        ADD: 'DATA_ACTION_SPELL_SELECTION_ADD',
        REMOVE: 'DATA_ACTION_SPELL_SELECTION_REMOVE',
        RESET: 'DATA_ACTION_SPELL_SELECTION_RESET'
    }
};

export const array = {
    ADVANCED_SENSE: 'DATA_ARRAY_ADVANCED_SENSE',
    ASSIGNED_EQUIPMENT: 'DATA_ARRAY_ASSIGNED_EQUIPMENT',
    ASSIGNED_SPELLS: 'DATA_ARRAY_ASSIGNED_SPELLS',
    GENERAL: 'DATA_ARRAY_GENERAL',
    LANGUAGE_DIALECTS: 'DATA_ARRAY_LANGUAGE_DIALECTS',
    MONSTER_TAGS: 'DATA_ARRAY_MONSTER_TAG',
    MOVEMENT: 'DATA_ARRAY_MOVEMENT',
    PROFICIENCIES: 'DATA_ARRAY_PROFICIENCIES',
    WEAPON_PROPERTIES: 'DATA_ARRAY_WEAPON_PROPERTIES'
};

export const bool = {
    BOOL: 'DATA_BOOL_STANDARD',
    HAS_DISADVANTAGE: 'DATA_BOOL_HAS_DISADVANTAGE',
    YES_NO: 'DATA_BOOL_YES_NO'
};

export const combo = {
    DAMAGE_AND_DAMAGE_TYPE: 'DATA_COMBO_DAMAGE_AND_DAMAGE_TYPE'
};

export const number = {
    CHARACTER_LEVEL: 'DATA_NUMBER_CHARACTER_LEVEL',
    COLUMN_COUNT: 'DATA_NUMBER_COLUMN_COUNT',
    COIN: 'DATA_NUMBER_COIN',
    DEC: 'DATA_NUMBER_DECIMAL',
    INT: 'DATA_NUMBER_INTEGER',
    LENGTH: 'DATA_NUMBER_LENGTH',
    NUMBER: 'DATA_NUMBER_NUMBER',
    RANGE: 'DATA_NUMBER_RANGE',
    ROW_COUNT: 'DATA_NUMBER_ROW_COUNT',
    SPEED: 'DATA_NUMBER_SPEED',
    SPELL_LEVEL: 'DATA_NUMBER_SPELL_LEVEL',
    VEHICLE_SPEED: 'DATA_NUMBER_VEHICLE_SPEED',
    WEIGHT: 'DATA_NUMBER_WEIGHT',
    getDecimalPlaces: function (val) {
        let retVal = 0;
        if (Math.floor(val) == val) {
            retVal = 0;
        } else if (Math.floor(val * 10) == val * 10) {
            retVal = 1;
        } else if (Math.floor(val * 100) == val * 100) {
            retVal = 2;
        }
        return retVal;
    },
    getStepIncrement: function (val) {
        return 1 / (Math.pow(10, this.getDecimalPlaces(val)));
    }
};

export const obj = {
    EQUIPMENT: 'DATA_OBJ_EQUIPMENT'
};

export const picklist = {
    ABILITY_SCORE: 'DATA_PICKLIST_ABILITY_SCORE',
    AMMUNITION_TYPE: 'DATA_PICKLIST_AMMUNITION_TYPE',
    AREA_OF_EFFECT_SHAPE: 'DATA_PICKLIST_AREA_OF_EFFECT_SHAPE',
    ARMOR_PROFICIENCY: 'DATA_PICKLIST_ARMOR_PROFICIENCY',
    ATTACK_ROLL_TYPE: 'DATA_PICKLIST_ATTACK_ROLL_TYPE',
    CHART_TYPE: 'DATA_PICKLIST_CHART_TYPE',
    CONDITION: 'DATA_PICKLIST_CONDITION',
    DAMAGE_TYPE: 'DATA_PICKLIST_DAMAGE_TYPE',
    DATA_TYPE: 'DATA_PICKLIST_DATA_TYPE',
    DESCRIPTION_TYPE: 'DATA_PICKLIST_DESCRIPTION_TYPE',
    EQUIPMENT_CATEGORY: 'DATA_PICKLIST_EQUIPMENT_CATEGORY',
    GENERAL: 'DATA_PICKLIST_GENERAL',
    LANGUAGE_DIALECT: 'DATA_PICKLIST_LANGUAGE_DIALECT',
    LANGUAGE_RARITY: 'DATA_PICKLIST_LANGUAGE_RARITY',
    LANGUAGE_SCRIPT: 'DATA_PICKLIST_LANGUAGE_SCRIPT',
    MECHANIC_TARGET: 'DATA_PICKLIST_MECHANIC_TARGET',
    MECHANIC_TYPE: 'DATA_PICKLIST_MECHANIC_TYPE',
    MONSTER_TYPE: 'DATA_PICKLIST_MONSTER_TYPE',
    NATURAL_WEAPON_TYPE: 'DATA_PICKLIST_NATURAL_WEAPON_TYPE',
    PREREQUISITE_TYPE: 'DATA_PICKLIST_PREREQUISITE_TYPE',
    PROFICIENCY: 'DATA_PICKLIST_PROFICIENCY',
    PROFICIENCY_CATEGORY: 'DATA_PICKLIST_PROFICIENCY_CATEGORY',
    PROFICIENCY_SELECTION_MECHANIC: 'DATA_PICKLIST_PROFICIENCY_SELECTION_MECHANIC',
    RECHARGE_TYPE: 'DATA_PICKLIST_RECHARGE_TYPE',
    RESOURCE: 'DATA_PICKLIST_RESOURCE',
    SAVE_EFFECT: 'DATA_PICKLIST_SAVE_EFFECT',
    SCHOOL_OF_MAGIC: 'DATA_PICKLIST_SCHOOL_OF_MAGIC',
    SELECTION_CHART_ROW: 'DATA_PICKLIST_SELECTION_CHART_ROW',
    SIZE: 'DATA_PICKLIST_SIZE',
    SPELL_CASTING_TIME: 'DATA_PICKLIST_SPELL_CASTING_TIME',
    SPELL_COMPONENT: 'DATA_PICKLIST_SPELL_COMPONENT',
    SPELL_DURATION: 'DATA_PICKLIST_SPELL_DURATION',
    SPELL_LEVEL: 'DATA_PICKLIST_SPELL_LEVEL',
    SPELL_RANGE: 'DATA_PICKLIST_SPELL_RANGE',
    SPELL_SELECTION: 'DATA_PICKLIST_SPELL_SELECTION',
    WEAPON_CATEGORY: 'DATA_PICKLIST_WEAPON_CATEGORY',
    WEAPON_PROFICIENCY: 'DATA_PICKLIST_WEAPON_PROFICIENCY'
};

export const special = {
    CHART: 'DATA_SPECIAL_CHART',
    CHART_COLUMN: 'DATA_SPECIAL_CHART_COLUMN',
    CHART_COLUMN_COUNT: 'DATA_SPECIAL_CHART_COLUMN_COUNT',
    CHART_COLUMN_TITLE: 'DATA_SPECIAL_CHART_COLUMN_TITLE',
    CHART_ENTRY: 'DATA_SPECIAL_CHART_ENTRY',
    CHART_ENTRY_DESCRIPTION: 'DATA_SPECIAL_CHART_ENTRY_DESCRIPTION',
    CHART_ENTRY_DIE_ROLL_RANGE: 'DATA_SPECIAL_DIE_CHART_ENTRY_DIE_ROLL_RANGE',
    CHART_ROW: 'DATA_SPECIAL_CHART_ROW',
    CHART_ROW_COUNT: 'DATA_SPECIAL_CHART_ROW_COUNT',
    CHART_ROW_TITLE: 'DATA_SPECIAL_CHART_ROW_TITLE',
    DICE_ROLL: 'DATA_SPECIAL_DICE_ROLL',
    WEAPON_RANGE: 'DATA_SPECIAL_WEAPON_RANGE'
};

export const string = {
    EMPTY_PICKLIST_ITEM: 'DATA_STRING_EMPTY_PICKLIST_ITEM',
    STRING: 'DATA_STRING_STANDARD',
    LONG_STRING: 'DATA_STRING_LONG',
    DESCRIPTION: 'DATA_STRING_DESCRIPTION'
};

export function compareDataType (val, dataType, disallowValues) {
    let retVal = true;
    let tmpDieType = 0;
    let tmpArr = [];
    let tmpArr2 = [];
    let usesPositiveModifier = (val.indexOf('+') != -1);
    let usesNegativeModifier = (val.indexOf('-') != -1);
    let usesMultiplier = (val.indexOf('x') != -1) || (val.indexOf('*') != -1);
    let usesDivisor = (val.indexOf('/') != -1);
    switch (dataType) {
        case special.DICE_ROLL:
            tmpArr = val.toLowerCase().split('d');
            if (tmpArr.length == 2) {
                if (usesPositiveModifier || usesNegativeModifier || usesMultiplier || usesDivisor) {
                    if (usesPositiveModifier) {
                        tmpArr2 = tmpArr[1].split('+');
                    } else if (usesNegativeModifier) {
                        tmpArr2 = tmpArr[1].split('-');
                    } else if (usesMultiplier) {
                        if (val.indexOf('x') != -1) {
                            tmpArr2 = tmpArr[1].split('x');
                        } else if (val.indexOf('*') != -1) {
                            tmpArr2 = tmpArr[1].split('*');
                        }
                    } else if (usesDivisor) {
                        tmpArr2 = tmpArr[1].split('/');
                    }
                    tmpArr[1] = tmpArr2[0];
                    tmpArr[2] = tmpArr2[1];
                }
                if (Number.isInteger(parseInt(tmpArr[0]))) {
                    if (Number.isInteger(parseInt(tmpArr[1]))) {
                        tmpDieType = parseInt(tmpArr[1]);
                        if (tmpDieType == 0 || tmpDieType == 1 || tmpDieType == 2 ||
                           tmpDieType == 3 || tmpDieType == 4 || tmpDieType == 6 ||
                           tmpDieType == 8 || tmpDieType == 10 || tmpDieType == 12 ||
                           tmpDieType == 20 || tmpDieType == 100) {
                            if (disallowValues && disallowValues.length) {
                                for (let z = 0; z < disallowValues.length; z++) {
                                    if (disallowValues[z] == tmpDieType) {
                                        retVal = false;
                                    }
                                }
                            } else {
                                if (usesPositiveModifier || usesNegativeModifier || usesMultiplier || usesDivisor) {
                                    if (Number.isInteger(parseInt(tmpArr[2]))) {
                                        retVal = true;
                                    } else {
                                        retVal = false;
                                    }
                                } else {
                                    retVal = true;
                                }
                            }
                        } else {
                            retVal = false;
                        }
                    } else {
                        retVal = false;
                    }
                } else {
                    retVal = false;
                }
            } else {
                retVal = false;
            }
            break;
        default:
    }
    return retVal;
}