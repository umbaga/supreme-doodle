import util from './util';
import * as picklistInfo from './picklistInfo';

export const picklists = picklistInfo;

export const resetObject = {
    itemtype: function() {
        let retVal = Object.assign({}, util.objectModel.ITEMTYPE);
        return retVal;
    }
};

export const replace = {
    description: function(val) {
        return val.replace('W ', 'W').replace('ecom e', 'ecome').replace(' som e ', ' some ').replace('Som e ', 'Some ')
            .replace('som eone', 'someone').replace('becom e', 'become').replace('dlO ', 'd10 ');
    }
};

export const formState = {
    standard: function(event, obj, picklists) {
        let retVal = obj;
        let field = formState.setFieldFromTargetName(event);
        let dataType = formState.setDataTypeFromTarget(event);
        let newSelectedValue = {};
        let inputType = event.target.type;
        switch (dataType) {
            case util.datatypes.STRING.SHORT:
            case util.datatypes.STRING.LONG:
            case util.datatypes.NUMBER.CHARACTER_LEVEL:
            case util.datatypes.NUMBER.INT:
            case util.datatypes.NUMBER.DEC:
            case util.datatypes.NUMBER.SPELL_LEVEL:
                util.common.setObjectValue(retVal, field, event.target.value);
                break;
            case util.datatypes.BOOL:
                util.common.setObjectValue(retVal, field, event.target.checked);
                break;
            case util.datatypes.PICKLIST:
                newSelectedValue.id = parseInt(event.target.options[event.target.selectedIndex].value);
                newSelectedValue.name = event.target.options[event.target.selectedIndex].text;
                util.common.setObjectValue(retVal, field, newSelectedValue);
                break;
            case util.datatypes.SPECIAL.DICE:
                util.common.setObjectValue(retVal, field, formState.dice(event));
                break;
            default:
        }
        return retVal;
    }
};