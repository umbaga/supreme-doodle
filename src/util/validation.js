import util from './util';

export const isReadyToSave = {
    chart: function(val) {
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