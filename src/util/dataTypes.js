export const ACTION = {
    LIST: {
        FROM_PICKLIST: {
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
    TOGGLE: {
        ADD: 'DATATYPE_ACTION_TOGGLE_ADD',
        REMOVE: 'DATATYPE_ACTION_TOGGLE_REMOVE'
    }
};

export const ARRAY = {
    CHECKBOX: 'DATATYPE_ARRAY_CHECKBOX',
    LIST: {
        ADD: {
            FROM_PICKLIST: 'DATATYPE_ARRAY_LIST_ADD_FROM_PICKLIST',
            NEW: 'DATATYPE_ARRAY_LIST_ADD_NEW'
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
            }
        }
    }
};

export const NUMBER = {
    CHARACTER_LEVEL: 'DATATYPE_NUMBER_CHARACTER_LEVEL',
    DEC: 'DATATYPE_NUMBER_DEC',
    INT: 'DATATYPE_NUMBER_INT',
    SPELL_LEVEL: 'DATATYPE_NUMBER_SPELL_LEVEL'
};

export const PICKLIST = 'DATATYPE_PICKLIST';

export const SPECIAL = {
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
    let tmpDieType = 0;
    let tmpArr = [];
    let tmpArr2 = [];
    let usesPositiveModifier = (val.indexOf('+') != -1);
    let usesNegativeModifier = (val.indexOf('-') != -1);
    let usesMultiplier = (val.indexOf('x') != -1) || (val.indexOf('*') != -1);
    let usesDivisor = (val.indexOf('/') != -1);
    switch (dataType) {
        case SPECIAL.DICE:
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