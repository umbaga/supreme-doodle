export const ACTION = {
    CHART: {
        ADD: 'DATATYPE_ACTION_CHART_ADD',
        COLUMN: {
            ADD: 'DATATYPE_ACTION_CHART_COLUMN_ADD',
            REMOVE: 'DATATYPE_ACTION_CHART_COLUMN_REMOVE'
        },
        CANCEL: 'DATATYPE_ACTION_CHART_CANCEL',
        EXPAND: 'DATATYPE_ACTON_CHART_EXPAND',
        ORDER: {
            DOWN: 'DATATYPE_ACTION_CHART_ORDER_DOWN',
            UP: 'DATATYPE_ACTION_CHART_ORDER_UP'
        },
        REMOVE: 'DATATYPE_ACTION_CHART_REMOVE',
        ROW: {
            ADD: 'DATATYPE_ACTION_CHART_ROW_ADD',
            REMOVE: 'DATATYPE_ACTION_CHART_ROW_REMOVE'
        },
        SELECT: 'DATATYPE_ACTION_CHART_SELECT'
    },
    LIST: {
        PICKLIST: {
            ADD: 'DATATYPE_ACTION_LIST_FROM_PICKLIST_ADD',
            ORDER: {
                DOWN: 'DATATYPE_ACTION_LIST_FROM_PICKLIST_ORDER_DOWN',
                UP: 'DATATYPE_ACTION_LIST_FROM_PICKLIST_ORDER_UP'
            },
            REMOVE: 'DATATYPE_ACTION_LIST_FROM_PICKLIST_REMOVE'
        },
        NEW: {
            ADD: 'DATATYPE_ACTION_LIST_NEW_ADD',
            ORDER: {
                DOWN: 'DATATYPE_ACTION_LIST_NEW_ORDER_DOWN',
                UP: 'DATATYPE_ACTION_LIST_NEW_ORDER_UP'
            },
            REMOVE: 'DATATYPE_ACTION_LIST_NEW_REMOVE'
        }
    },
    MECHANIC: {
        ADD: 'DATATYPE_ACTION_MECHANIC_ADD',
        REMOVE: 'DATATYPE_ACTION_MECHANIC_REMOVE'
    },
    SPELL_COMPONENT: 'DATATYPE_ACTION_SPELL_COMPONENT',
    SUPPLEMENTAL_DAMAGE: {
        ADD: 'DATATYPE_ACTION_SUPPLEMENTAL_DAMAGE_ADD',
        REMOVE: 'DATATYPE_ACTION_SUPPLEMENTAL_DAMAGE_REMOVE'
    },
    SUPPLEMENTAL_DESCRIPTION: {
        ADD: 'DATATYPE_ACTION_SUPPLEMENTAL_DESCRIPTION_ADD',
        CANCEL: 'DATATYPE_ACTION_SUPPLEMENTAL_DESCRIPTION_CANCEL',
        ORDER: {
            DOWN: 'DATATYPE_ACTION_SUPPLEMENTAL_DESCRIPTION_ORDER_DOWN',
            UP: 'DATATYPE_ACTION_SUPPLEMENTAL_DESCRIPTION_ORDER_UP'
        },
        REMOVE: 'DATATYPE_ACTION_SUPPLEMENTAL_DESCRIPTION_REMOVE',
        SELECT: 'DATATYPE_ACTION_SUPPLEMENTAL_DESCRIPTION_SELECT'
    },
    TOGGLE: {
        ADD: 'DATATYPE_ACTION_TOGGLE_ADD',
        REMOVE: 'DATATYPE_ACTION_TOGGLE_REMOVE'
    },
    VARIANT: {
        LOSE: {
            EQUIPMENT: 'DATATYPE_ACTION_VARIANT_LOSE_EQUIPMENT',
            PROFICIENCY: 'DATATYPE_ACTION_VARIANT_LOSE_PROFICIENCY',
            PROFICIENCY_CATEGORY: 'DATATYPE_ACTION_VARIANT_LOSE_PROFICIENCY_CATEGORY',
            PROFICIENCY_LIST: 'DATATYPE_ACTION_VARIANT_LOSE_PROFICIENCY_LIST'
        }
    }
};

export const ARRAY = {
    CHECKBOX: 'DATATYPE_ARRAY_CHECKBOX',
    COMMA_DELIMITED: {
        INT: 'DATATYPE_ARRAY_COMMA_DELIMTED_INT'
    },
    LIST: {
        ADD: {
            PICKLIST: 'DATATYPE_ARRAY_LIST_ADD_PICKLIST',
            NEW: 'DATATYPE_ARRAY_LIST_ADD_NEW',
            WITH_VALUE: {
                PICKLIST: {
                    INT: 'DATATYPE_ARRAY_LIST_ADD_WITH_VALUE_PICKLIST_INT'
                }
            }
        }
    },
    TAGS: {
        ADD: {
            PICKLIST: 'DATATYPE_ARRAY_TAGS_ADD_PICKLIST',
            NEW: 'DATATYPE_ARRAY_LIST_TAGS_NEW'
        }
    },
    TOGGLE: 'DATATYPE_ARRAY_TOGGLE'
};

export const BOOL = 'DATATYPE_BOOL';

export const COMBO = {
    DICE: {
        PICKLIST: 'DATATYPE_COMBO_DICE_AND_PICKLIST'
    },
    NUMBER: {
        INT: {
            NUMBER: {
                INT: 'DATATYPE_NUMBER_INT_AND_NUMBER_INT'
            },
            PICKLIST: 'DATATYPE_NUMBER_INT_PICKLIST',
            TWO_PICKLISTS: 'DATATYPE_NUMBER_INT_TWO_PICKLISTS'
        }
    }
};

export const NUMBER = {
    CHARACTER_LEVEL: 'DATATYPE_NUMBER_CHARACTER_LEVEL',
    DEC: 'DATATYPE_NUMBER_DEC',
    DEC_ALLOW_NEGATIVE: 'DATATYPE_NUMBER_DEC_ALLOW_NEGATIVE',
    INT: 'DATATYPE_NUMBER_INT',
    INT_ALLOW_NEGATIVE: 'DATATYPE_NUMBER_INT_ALLOW_NEGATIVE',
    SPELL_LEVEL: 'DATATYPE_NUMBER_SPELL_LEVEL'
};

export const PICKLIST = 'DATATYPE_PICKLIST';

export const SPECIAL = {
    CHART: {
        COLUMN: {
            COUNT: 'DATATYPE_SPECIAL_CHART_COLUMN_COUNT',
            DATA_TYPE: 'DATATYPE_SPECIAL_CHART_COLUMN_DATA_TYPE',
            PICKLIST: 'DATATYPE_SPECIAL_CHART_COLUMN_PICKLIST',
            STRING: 'DATATYPE_SPECIAL_CHART_COLUMN_STRING'
        },
        ENTRY: {
            BOOL: 'DATATYPE_SPECIAL_CHART_ENTRY_BOOL',
            DICE: 'DATATYPE_SPECIAL_CHART_ENTRY_DICE',
            NUMBER: 'DATATYPE_SPECIAL_CHART_ENTRY_NUMBER',
            PICKLIST: 'DATATYPE_SPECIAL_CHART_ENTRY_PICKLIST',
            STRING: 'DATATYPE_SPECIAL_CHART_ENTRY_STRING'
        },
        ROW: {
            COUNT: 'DATATYPE_SPECIAL_CHART_COLUMN_ROW',
            DICE_RANGE: 'DATATYPE_SPECIAL_CHART_ROW_DICE_RANGE',
            PICKLIST: 'DATATYPE_SPECIAL_CHART_ROW_PICKLIST',
            STRING: 'DATATYPE_SPECIAL_CHART_ROW_STRING'
        }
    },
    DICE: 'DATATYPE_SPECIAL_DICE'
};

export const STRING = {
    HTML: {
        LONG: 'DATATYPE_STRING_HTML_LONG',
        SHORT: 'DATATYPE_STRING_HTML_SHORT'
    },
    LONG: 'DATATYPE_STRING_LONG',
    SHORT: 'DATATYPE_STRING_SHORT'
};

export function compareDataType (val, dataType, disallowValues) {
    let retVal = true;
    let testVal = val;
    let tmpDieType = 0;
    let tmpArr = [];
    let tmpArr2 = [];
    let usesPositiveModifier = false;
    let usesNegativeModifier = false;
    let usesMultiplier = false;
    let usesDivisor = false;
    switch (dataType) {
        case SPECIAL.DICE:
            testVal = (typeof val === 'object') ? val.rendered : val;
            usesPositiveModifier = (testVal.indexOf('+') != -1);
            usesNegativeModifier = (testVal.indexOf('-') != -1);
            usesMultiplier = (testVal.indexOf('x') != -1) || (testVal.indexOf('*') != -1);
            usesDivisor = (testVal.indexOf('/') != -1);
            tmpArr = testVal.toLowerCase().split('d');
            if (tmpArr.length == 2) {
                if (usesPositiveModifier || usesNegativeModifier || usesMultiplier || usesDivisor) {
                    if (usesPositiveModifier) {
                        tmpArr2 = tmpArr[1].split('+');
                    } else if (usesNegativeModifier) {
                        tmpArr2 = tmpArr[1].split('-');
                    } else if (usesMultiplier) {
                        if (testVal.indexOf('x') != -1) {
                            tmpArr2 = tmpArr[1].split('x');
                        } else if (testVal.indexOf('*') != -1) {
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
                        if (tmpArr.length == 3) {
                            if (Number.isInteger(parseInt(tmpArr[2]))) {
                                retVal = true;
                            } else {
                                retVal = false;
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
            break;
        default:
    }
    return retVal;
}