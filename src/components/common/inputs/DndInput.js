import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInputWrapper from './DndInputWrapper';
import DndToggleBoxes from './DndToggleBoxes';
import DndButton from '../buttons/DndButton';

class DndInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderSelectOneOption = this.renderSelectOneOption.bind(this);
    }
    
    setFocus() {
        this.refs[this.props.name].focus();
    }
    
    renderSelectOneOption(placeholderText) {
        if (this.props.hideSelectOneOption) {
            return null;
        } else {
            return (<option value="0">{placeholderText}</option>);
        }
    }
    
    render() {
        let primaryInput = null;
        //let supplementalInput = null;
        let longValue = '';
        let isReadOnly = this.props.isReadOnly ? this.props.isReadOnly : false;
        let numberMinVal = this.props.numberMinVal ? this.props.numberMinVal : 0;
        let numberStepVal = this.props.numberStepVal ? this.props.numberStepVal : 1;
        let hasButton = this.props.buttonOnClick ? true : false;
        let size = 10;
        if (this.props.selectBoxSize) {
            size = this.props.selectBoxSize;
        }
        let placeholderText = '';
        if (this.props.value == undefined) {
            console.error('props.value is undefined: ' + this.props.name);
        }
        if (this.props.dataType == undefined) {
            console.error('datatype undefined: ' + this.props.name);
        }
        switch (this.props.dataType) {
            case util.datatypes.bool.BOOL:
            case util.datatypes.bool.HAS_DISADVANTAGE:
            case util.datatypes.bool.YES_NO:
                primaryInput = (<input
                                    type="checkbox"
                                    name={this.props.name}
                                    ref={this.props.name}
                                    checked={this.props.value}
                                    datatype={this.props.dataType}
                                    onChange={this.props.onChange}
                                    className="form-control checkbox-inline" />);
                break;
            case util.datatypes.string.STRING:
            case util.datatypes.number.LENGTH:
            case util.datatypes.special.CHART_COLUMN_TITLE:
                primaryInput = (<input
                                    type="text"
                                    name={this.props.name}
                                    ref={this.props.name}
                                    placeholder={this.props.placeholder}
                                    value={this.props.value}
                                    datatype={this.props.dataType}
                                    onChange={this.props.onChange}
                                    className="form-control"
                                    readOnly={isReadOnly} />);
                break;
            case util.datatypes.array.ADVANCED_SENSE:
            case util.datatypes.array.MOVEMENT:
            case util.datatypes.number.CHARACTER_LEVEL:
            case util.datatypes.number.COIN:
            case util.datatypes.number.INT:
            case util.datatypes.number.NUMBER:
            case util.datatypes.number.SPEED:
            case util.datatypes.number.SPELL_LEVEL:
            case util.datatypes.number.VEHICLE_SPEED:
            case util.datatypes.number.WEIGHT:
            case util.datatypes.special.CHART_COLUMN_COUNT:
            case util.datatypes.special.CHART_ROW_COUNT:
                if (this.props.dataType == util.datatypes.number.SPELL_LEVEL) {
                    primaryInput = (<input
                                        type="number"
                                        name={this.props.name}
                                        ref={this.props.name}
                                        placeholder={this.props.placeholder}
                                        value={this.props.value}
                                        datatype={this.props.dataType}
                                        onChange={this.props.onChange}
                                        className="form-control"
                                        step={numberStepVal}
                                        min="0"
                                        max="9"
                                        readOnly={isReadOnly} />);
                } else if (this.props.dataType == util.datatypes.number.SPELL_LEVEL) {
                    primaryInput = (<input
                                        type="number"
                                        name={this.props.name}
                                        ref={this.props.name}
                                        placeholder={this.props.placeholder}
                                        value={this.props.value}
                                        datatype={this.props.dataType}
                                        onChange={this.props.onChange}
                                        className="form-control"
                                        step={numberStepVal}
                                        min="1"
                                        max="20"
                                        readOnly={isReadOnly} />);
                } else {
                    primaryInput = (<input
                                        type="number"
                                        name={this.props.name}
                                        ref={this.props.name}
                                        placeholder={this.props.placeholder}
                                        value={this.props.value}
                                        datatype={this.props.dataType}
                                        onChange={this.props.onChange}
                                        className="form-control"
                                        step={numberStepVal}
                                        min={numberMinVal}
                                        readOnly={isReadOnly} />);
                }
                break;
            case util.datatypes.special.DICE_ROLL:
                primaryInput = (<input
                                    type="text"
                                    name={this.props.name}
                                    ref={this.props.name}
                                    placeholder={this.props.placeholder}
                                    value={this.props.value.rendered}
                                    datatype={this.props.dataType}
                                    onKeyUp={this.props.onChange}
                                    onChange={this.props.onChange}
                                    className="form-control" />);
                break;
            case util.datatypes.picklist.ABILITY_SCORE:
            case util.datatypes.picklist.AMMUNITION_TYPE:
            case util.datatypes.picklist.AREA_OF_EFFECT_SHAPE:
            case util.datatypes.picklist.ARMOR_PROFICIENCY:
            case util.datatypes.picklist.ATTACK_ROLL_TYPE:
            case util.datatypes.picklist.CHART_TYPE:
            case util.datatypes.picklist.CONDITION:
            case util.datatypes.picklist.DAMAGE_TYPE:
            case util.datatypes.picklist.DATA_TYPE:
            case util.datatypes.picklist.DESCRIPTION_TYPE:
            case util.datatypes.picklist.EQUIPMENT_CATEGORY:
            case util.datatypes.picklist.GENERAL:
            case util.datatypes.picklist.LANGUAGE_RARITY:
            case util.datatypes.picklist.LANGUAGE_SCRIPT:
            case util.datatypes.picklist.MECHANIC_TARGET:
            case util.datatypes.picklist.MECHANIC_TYPE:
            case util.datatypes.picklist.MONSTER_TYPE:
            case util.datatypes.picklist.NATURAL_WEAPON_TYPE:
            case util.datatypes.picklist.PREREQUISITE_TYPE:
            case util.datatypes.picklist.PROFICIENCY:
            case util.datatypes.picklist.PROFICIENCY_CATEGORY:
            case util.datatypes.picklist.PROFICIENCY_SELECTION_MECHANIC:
            case util.datatypes.picklist.RECHARGE_TYPE:
            case util.datatypes.picklist.RESOURCE:
            case util.datatypes.picklist.SAVE_EFFECT:
            case util.datatypes.picklist.SCHOOL_OF_MAGIC:
            case util.datatypes.picklist.SIZE:
            case util.datatypes.picklist.SPELL_CASTING_TIME:
            case util.datatypes.picklist.SPELL_COMPONENT:
            case util.datatypes.picklist.SPELL_DURATION:
            case util.datatypes.picklist.SPELL_LEVEL:
            case util.datatypes.picklist.SPELL_RANGE:
            case util.datatypes.picklist.SPELL_SELECTION:
            case util.datatypes.picklist.WEAPON_CATEGORY:
            case util.datatypes.picklist.WEAPON_PROFICIENCY:
                placeholderText = (this.props.placeholder && this.props.placeholder.length != 0) ? this.props.placeholder : 'SELECT ONE';
                primaryInput = (<select
                                    value={this.props.value.id}
                                    name={this.props.name}
                                    ref={this.props.name}
                                    className="form-control"
                                    onChange={this.props.onChange}
                                    datatype={this.props.dataType}>
                        {this.renderSelectOneOption(placeholderText)}
                        {this.props.picklist.map(picklistItem =>
                                                 <option
                                                     key={picklistItem.id}
                                                     value={picklistItem.id}>
                                                     {picklistItem.name}
                                                 </option>)}
                    </select>);
                break;
            case util.datatypes.string.EMPTY_PICKLIST_ITEM:
                primaryInput = (
                    <input
                        name={this.props.name}
                        ref={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.props.value.name}
                        datatype={this.props.dataType}
                        onChange={this.props.onChange}
                        className="form-control"
                        />
                );
                break;
            case util.datatypes.picklist.SELECTION_CHART_ROW:
                placeholderText = (this.props.placeholder && this.props.placeholder.length != 0) ? this.props.placeholder : 'SELECT ONE';
                primaryInput = (<select
                                value={this.props.value.id}
                                name={this.props.name}
                                ref={this.props.name}
                                className="form-control"
                                onChange={this.props.onChange}
                                datatype={this.props.dataType}>
                    {this.renderSelectOneOption(placeholderText)}
                    {this.props.picklist.map(picklistItem =>
                                             <option
                                                 key={picklistItem.id}
                                                 value={picklistItem.id}>
                                                 {picklistItem.name}
                                             </option>)}
                </select>);
                break;
            case util.datatypes.array.GENERAL:
            case util.datatypes.array.MONSTER_TAGS:
            case util.datatypes.array.PROFICIENCIES:
            case util.datatypes.array.WEAPON_PROPERTIES:
                primaryInput = (
                    <DndToggleBoxes
                        dataType={this.props.dataType}
                        onAddItem={this.props.onChange}
                        onRemoveItem={this.props.onChange}
                        unselectedItemArray={this.props.picklist}
                        selectedItemArray={this.props.value}
                        name={this.props.name}
                        selectBoxSize={size}
                        />
                );
                break;
            case util.datatypes.special.WEAPON_RANGE:
                primaryInput = (
                    <div name={this.props.name}>
                        <div className="col-sm-6">
                            <label htmlFor={this.props.name + '.normal'}>Normal</label>
                            <input type="number"
                                name={this.props.name + '.normal'}
                                ref={this.props.name + '.normal'}
                                placeholder={this.props.placeholder}
                                value={this.props.value.normal}
                                datatype={this.props.dataType}
                                onChange={this.props.onChange}
                                className="form-control"/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor={this.props.name + '.maximum'}>Maximum</label>
                            <input type="number"
                                name={this.props.name + '.maximum'}
                                ref={this.props.name + '.maximum'}
                                placeholder={this.props.placeholder}
                                value={this.props.value.maximum}
                                datatype={this.props.dataType}
                                onChange={this.props.onChange}
                                className="form-control"/>
                        </div>
                    </div>
                );
                break;
            case util.datatypes.string.LONG_STRING:
                if (this.props.value) {
                    longValue = this.props.value;
                }
                primaryInput = (
                    <textarea
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        value={longValue}
                        datatype={this.props.dataType}
                        onKeyUp={this.props.onChange}
                        onChange={this.props.onChange}
                        className="form-control" />
                );
                break;
            case util.datatypes.string.DESCRIPTION:
                if (this.props.value) {
                    longValue = this.props.value;
                }
                primaryInput = (
                    <div
                        id={this.props.name}
                        datatype={this.props.dataType}
                        className="form-control pre-scrollable"
                        style={{height: '200px'}}
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: longValue }}
                        onBlur={this.props.onChange}
                        />
                );
                break;
            case util.datatypes.combo.DAMAGE_AND_DAMAGE_TYPE:
                primaryInput = (
                    <div className=" input-group input-inline">
                        <input
                            type="text"
                            name={this.props.name + '.dice'}
                            ref={this.props.name + '.dice'}
                            value={this.props.value.dice.rendered}
                            datatype={util.datatypes.special.DICE_ROLL}
                            onKeyUp={this.props.onChange}
                            onChange={this.props.onChange}
                            className="form-control" />
                        <select
                            value={this.props.value.type.id}
                            name={this.props.name + '.type'}
                            ref={this.props.name + '.type'}
                            className="form-control"
                            onChange={this.props.onChange}
                            datatype={util.datatypes.picklist.DAMAGE_TYPE}>
                            <option value="0">SELECT ONE</option>
                            {this.props.picklist.map(picklistItem =>
                                 <option
                                     key={picklistItem.id}
                                     value={picklistItem.id}>
                                     {picklistItem.name}
                                 </option>)}
                        </select>
                    </div>
                );
                break;
            default:
                primaryInput = (<div>Need to add dataType to switch in DndInput</div>);
        }
        const buttonType = (this.props.buttonType && this.props.buttonType.length) != 0 ? this.props.buttonType : 'additem';
        /*if (util.common.picklists.supplementalPicklist.hasSupplemntalItemsAdded(this.props.dataType)) {
            if (util.common.picklists.supplementalPicklist.itemIsSupplemental(this.props.value, this.props.dataType)) {
                switch (util.common.picklists.supplementalPicklist.itemIsSupplemental(this.props.value, this.props.dataType)) {
                    case util.itemtypes.SUPPLEMENTAL_PICKLIST.BASED_ON_CHART:
                        console.log('based on chart');
                        break;
                    case util.itemtypes.SUPPLEMENTAL_PICKLIST.CHOOSE_FROM_LIST:
                        console.log('choose from list');
                        break;
                    default:
                }
            }
        }*/
        const finalInput = hasButton ? (
            <div className="input-group">
                {primaryInput}
                <span className="input-group-btn">
                    <DndButton
                        buttonType={buttonType}
                        onClick={this.props.buttonOnClick}
                        bsButtonStyle={this.props.bsButtonStyle}
                        />
                </span>
            </div>
        ) : primaryInput;
        
        if (this.props.hideLabel) {
            return (
                <div>
                    {finalInput}
                </div>
            );
        } else {
            return (
                <DndInputWrapper
                    label={this.props.label}
                    dataType={this.props.dataType}
                    inputCols={this.props.inputCols}
                    labelCols={this.props.labelCols}
                    stackLabel={this.props.stackLabel}
                    >
                    <div>
                        {finalInput}
                    </div>
                </DndInputWrapper>
            );
        }
    }
}

DndInput.propTypes = {
    bsButtonStyle: PropTypes.string,
    buttonOnClick: PropTypes.func,
    buttonType: PropTypes.string,
    dataType: PropTypes.string.isRequired,
    hideLabel: PropTypes.bool,
    hideSelectOneOption: PropTypes.bool,
    inputCols: PropTypes.number,
    isReadOnly: PropTypes.bool,
    label: PropTypes.string,
    labelCols: PropTypes.number,
    name: PropTypes.string.isRequired,
    numberMaxVal: PropTypes.number,
    numberMinVal: PropTypes.number,
    numberStepVal: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    picklist: PropTypes.array,
    placeholder: PropTypes.string,
    selectBoxSize: PropTypes.number,
    stackLabel: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool
    ]).isRequired
};

export default DndInput;