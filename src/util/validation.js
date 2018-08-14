import util from './util';

export const isReadyToSave = {
    chart: function(val) {
        if (!val.title || val.title.length == 0) {
            return false;
        }
        if (val.rows.length == 0 || val.columns.length == 0 || val.entries.length == 0 || val.columnCount <= 0 || val.rowCount <= 0) {
            return false;
        }
        if (val.type.id == util.itemtypes.TYPE.CHART.DICE) {
            if (!util.datatypes.compareDataType(val.dice, util.datatypes.SPECIAL.DICE)) {
                return false;
            }
        } else if (val.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            if (val.isNewType) {
                if (!val.selectItemType || !val.selectItemType.name) {
                    return false;
                }
                for (let q = 0; q < val.rows.length; q++) {
                    if (!val.rows[q].text || val.rows[q].text.length == 0) {
                        return false;
                    }
                }
            } else {
                if (!val.selectItemType || val.selectItemType.id <= 0) {
                    return false;
                }
                for (let q = 0; q < val.rows.length; q++) {
                    if (!val.rows[q].selectedItem || val.rows[q].selectedItem.id <= 0) {
                        return false;
                    }
                }
            }
        }
        for (let q = 0; q < val.entries.length; q++) {
            switch (val.columns[parseInt(val.entries[q].columnIndex)].dataType.id) {
                case util.itemtypes.TYPE.DATA_TYPE.BOOL:
                    if (val.entries[q].boolValue === undefined || val.entries[q].boolValue === null) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.DICE:
                    if (!util.datatypes.compareDataType(val.entries[q].diceValue, util.datatypes.SPECIAL.DICE)) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.NUMBER:
                    if (Number.isNaN(parseFloat(val.entries[q].numberValue))) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.PICKLIST:
                    if (!val.entries[q].selectedItem || val.entries[q].selectedItem.id == 0) {
                        return false;
                    }
                    break;
                case util.itemtypes.TYPE.DATA_TYPE.STRING:
                    if (!val.entries[q].text || val.entries[q].text.length == 0) {
                        return false;
                    }
                    break;
                default:
            }
        }
        return true;
    }
};
export const isReadyToShow = {
    chart: function(val) {
        if (val.columnCount == 0) {
            return false;
        }
        if (val.rowCount == 0) {
            return false;
        }
        if (val.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            if (!val.isNewType) {
                if (!val.selectItemType || val.selectItemType.id == 0) {
                    return false;
                }
            }
        } else if (val.type.id == util.itemtypes.TYPE.CHART.DICE) {
            if (!util.datatypes.compareDataType(val.dice.rendered, util.datatypes.SPECIAL.DICE, [0, 1, 2])) {
                return true;
            }
        }
        return true;
    }
};