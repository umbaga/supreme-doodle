import util from './util';
import * as picklistInfo from './picklistInfo';
import * as resetObjectFunctions from './resetObjects';
import * as formStateFunctions from './formStateFunctions';

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

export const formState = formStateFunctions;

export const picklists = picklistInfo;

export const replace = {
    description: function(val) {
        return val.replace('W ', 'W').replace('ecom e', 'ecome').replace(' som e ', ' some ').replace('Som e ', 'Some ').replace(' ing', 'ing')
            .replace('”', '"').replace('“', '"')
            .replace('com e ', 'come ').replace('som eone', 'someone').replace('becom e', 'become').replace('dlO ', 'd10 ').replace('w ood', 'wood');
    }
};

export const resetObject = resetObjectFunctions;