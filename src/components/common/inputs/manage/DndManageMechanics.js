import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndList from '../DndList';
import DndFieldset from '../../form/DndFieldset';
import util from '../../../../util/util';

class DndManageMechanics extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderBonusInputs = this.renderBonusInputs.bind(this);
        this.renderBonusAdvancementInputs = this.renderBonusAdvancementInputs.bind(this);
        this.renderTargetInput = this.renderTargetInput.bind(this);
        this.renderTextInput = this.renderTextInput.bind(this);
    }
    
    renderBonusAdvancementInputs(mechanic, advancementTypes) {
        let retVal = null;
        let advancementValueInput = null;
        let advancementValueLabel = '';
        if (mechanic.bonus.advancement.type.id == util.itemtypes.TYPE.ADVANCEMENT_TYPE.AT_LEVEL) {
            advancementValueLabel = 'At Level';
            advancementValueInput = (
                <DndInput
                    name="bonus.advancement.atLevels"
                    label={advancementValueLabel}
                    dataType={util.datatypes.ARRAY.COMMA_DELIMITED.INT}
                    value={mechanic.bonus.advancement.atLevels}
                    onChange={this.props.onChangeChild}
                    dataTask="mechanic"
                    />
            );
        } else if (mechanic.bonus.advancement.type.id == util.itemtypes.TYPE.ADVANCEMENT_TYPE.EVERY_X_LEVELS) {
            advancementValueLabel = 'Every # Levels';
            advancementValueInput = (
                <DndInput
                    name="bonus.advancement.levelCount"
                    label={advancementValueLabel}
                    dataType={util.datatypes.NUMBER.INT}
                    value={mechanic.bonus.advancement.levelCount}
                    onChange={this.props.onChangeChild}
                    dataTask="mechanic"
                    />
            );
        }
        if (mechanic.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.DICE
           || mechanic.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.MODIFIER) {
            retVal = (
                <fragment>
                    <div className="col-md-5">
                        <DndInput
                            name="bonus.advancement.type"
                            label="Advancement Type"
                            dataType={util.datatypes.PICKLIST}
                            value={mechanic.bonus.advancement.type}
                            onChange={this.props.onChangeChild}
                            picklist={advancementTypes}
                            dataTask="mechanic"
                            />
                    </div>
                    <div className="col-md-5">
                        {advancementValueInput}
                    </div>
                </fragment>
            );
        }
        return retVal;
    }
    
    renderBonusInputs(mechanic, bonusTypes, abilityScores, advancementTypes) {
        let valueLabel = 'Value';
        let defaultValue = 0;
        let valueName = 'value';
        let modDataType = util.datatypes.NUMBER.INT_ALLOW_NEGATIVE;
        switch (mechanic.bonus.type.id) {
            case util.itemtypes.TYPE.BONUS_TYPE.MULTIPLIER:
            case util.itemtypes.TYPE.BONUS_TYPE.SPELLCASTING_ABILITY:
                valueLabel = 'Multiply By';
                defaultValue = 2;
                break;
            case util.itemtypes.TYPE.BONUS_TYPE.PROFICIENCY_BONUS:
                valueLabel = 'Multiply By';
                defaultValue = 1;
                break;
            case util.itemtypes.TYPE.BONUS_TYPE.ABILITY_SCORE:
                valueLabel = 'Multiply By';
                defaultValue = 1;
                break;
            case util.itemtypes.TYPE.BONUS_TYPE.DICE:
                valueLabel = 'Dice Value';
                modDataType = util.datatypes.SPECIAL.DICE;
                valueName = 'dice';
                break;
            case util.itemtypes.TYPE.BONUS_TYPE.DIVISOR:
                valueLabel = 'Divide By';
                defaultValue = 2;
                break;
            case util.itemtypes.TYPE.BONUS_TYPE.MODIFIER:
                valueLabel = 'Modifier';
                defaultValue = 1;
                break;
            default:
        }
        if (mechanic.bonus.value == 0 && mechanic.bonus.type.id != util.itemtypes.TYPE.BONUS_TYPE.MODIFIER) {
            mechanic.bonus.value = defaultValue;
        }
        let abilityScoreInput = null;
        let valueInput = (
            <DndInput
                labelCols={6}
                name={'bonus.' + valueName}
                label={valueLabel}
                dataType={modDataType}
                value={mechanic.bonus[valueName]}
                onChange={this.props.onChangeChild}
                dataTask="mechanic"
                />
        );
        if (mechanic.bonus.type.id == util.itemtypes.TYPE.BONUS_TYPE.ABILITY_SCORE) {
            abilityScoreInput = (
                <DndInput
                    labelCols={5}
                    name="bonus.abilityScore"
                    label="Ability Score"
                    dataType={util.datatypes.PICKLIST}
                    value={mechanic.bonus.abilityScore}
                    onChange={this.props.onChangeChild}
                    picklist={abilityScores}
                    dataTask="mechanic"
                    />
            );
            //valueInput = null;
        }
        if (mechanic.type.id == util.itemtypes.TYPE.MECHANIC.BONUS.ROLL
           || mechanic.type.id == util.itemtypes.TYPE.MECHANIC.BONUS.STAT) {
            return (
                <fragment>
                    <div className="col-md-6">
                        <DndInput
                            name="bonus.type"
                            label="Bonus Type"
                            dataType={util.datatypes.PICKLIST}
                            value={mechanic.bonus.type}
                            onChange={this.props.onChangeChild}
                            picklist={bonusTypes}
                            dataTask="mechanic"
                            />
                    </div>
                    <div className="col-md-6">
                        {valueInput}
                        {abilityScoreInput}
                    </div>
                    {this.renderBonusAdvancementInputs(mechanic, advancementTypes)}
                </fragment>
            );
        }
        return null;
    }
    
    renderTargetInput(mechanic, targets) {
        if (mechanic.type.id != util.itemtypes.TYPE.MECHANIC.SPECIAL_TEXT) {
            return (
                <DndInput
                    name="target"
                    label="Target"
                    dataType={util.datatypes.PICKLIST}
                    value={mechanic.target}
                    onChange={this.props.onChangeChild}
                    picklist={targets}
                    dataTask="mechanic"
                    />
            );
        }
        return null;
    }
    
    renderTextInput(mechanic) {
        let inputName = 'conditionalText';
        let inputLabel = 'Conditinal Text';
        let inputValue = mechanic.conditionalText;
        if (mechanic.type.id == util.itemtypes.TYPE.MECHANIC.SPECIAL_TEXT) {
            inputName = 'specialText';
            inputLabel = 'Special Text';
            inputValue = mechanic.specialText;
        }
        return (
            <DndInput
                labelCols={2}
                name={inputName}
                label={inputLabel}
                dataType={util.datatypes.STRING.SHORT}
                value={inputValue}
                onChange={this.props.onChangeChild}
                dataTask="mechanic"
                />
        );
    }
    
    render() {
        const mechanics = this.props.value;
        const mechanic = this.props.editMechanic;
        const abilityScores = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.ABILITY_SCORE);
        const advancementTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.ADVANCEMENT_TYPE);
        let targets = [];
        let bonusTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.BONUS_TYPE);
        let mechanicTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.MECHANIC_TYPE);
        switch (mechanic.type.id) {
            case util.itemtypes.TYPE.MECHANIC.ADVANTAGE:
            case util.itemtypes.TYPE.MECHANIC.DISADVANTAGE:
                targets = util.common.picklists.getPicklistItems(this.props.picklists, [
                    util.itemtypes.TYPE.ITEM.CHECK,
                    util.itemtypes.TYPE.ITEM.CHECK_TYPE,
                    util.itemtypes.TYPE.ITEM.CONDITION,
                    util.itemtypes.TYPE.ITEM.DAMAGE_SOURCE,
                    util.itemtypes.TYPE.ITEM.DAMAGE_TYPE,
                    util.itemtypes.TYPE.ITEM.OTHER_EFFECT,
                    util.itemtypes.TYPE.ITEM.PROFICIENCY
                ], [
                    null, null, null, null, null, null,
                    [util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SKILL, util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SAVING_THROW]
                ]);
                break;
            case util.itemtypes.TYPE.MECHANIC.BONUS.ROLL:
                targets = util.common.picklists.getPicklistItems(this.props.picklists, [
                    util.itemtypes.TYPE.ITEM.CHECK,
                    util.itemtypes.TYPE.ITEM.CHECK_TYPE,
                    util.itemtypes.TYPE.ITEM.PROFICIENCY
                ], [
                    null, null,
                    [util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SKILL, util.itemtypes.TYPE.PROFICIENCY_CATEGORY.SAVING_THROW]
                ]);
                break;
            case util.itemtypes.TYPE.MECHANIC.BONUS.STAT:
                targets = util.common.picklists.getPicklistItems(this.props.picklists, [
                    util.itemtypes.TYPE.ITEM.ABILITY_SCORE,
                    util.itemtypes.TYPE.ITEM.STAT
                ]);
                break;
            case util.itemtypes.TYPE.MECHANIC.RESISTANCE:
            case util.itemtypes.TYPE.MECHANIC.VULNERABILITY:
                targets = util.common.picklists.getPicklistItems(this.props.picklists, [
                    util.itemtypes.TYPE.ITEM.DAMAGE_SOURCE,
                    util.itemtypes.TYPE.ITEM.DAMAGE_TYPE
                ]);
                break;
            case util.itemtypes.TYPE.MECHANIC.IMMUNITY:
                targets = util.common.picklists.getPicklistItems(this.props.picklists, [
                    util.itemtypes.TYPE.ITEM.CONDITION,
                    util.itemtypes.TYPE.ITEM.DAMAGE_SOURCE,
                    util.itemtypes.TYPE.ITEM.DAMAGE_TYPE,
                    util.itemtypes.TYPE.ITEM.OTHER_EFFECT
                ]);
                break;
            default:
        }
        if (mechanic && mechanic.target) {
            mechanic.target.type = {};
            mechanic.target.type.id = util.common.picklists.getPicklistIdFromItem(this.props.picklists, mechanic.target);
        }
        return (
            <fragment>
                <DndFieldset
                    legend="New Mechanic"
                    collapsible
                    >
                    <div className="col-md-6">
                        <DndInput
                            name="type"
                            label="Mechanic Type"
                            dataType={util.datatypes.PICKLIST}
                            value={mechanic.type}
                            onChange={this.props.onChangeChild}
                            picklist={mechanicTypes}
                            dataTask="mechanic"
                            />
                    </div>
                    <div className="col-md-6">
                        {this.renderTargetInput(mechanic, targets)}
                    </div>
                    <div className="col-md-12">
                        {this.renderTextInput(mechanic)}
                    </div>
                    {this.renderBonusInputs(mechanic, bonusTypes, abilityScores, advancementTypes)}
                    <div className="col-md-12">
                        <DndInput
                            labelCols={2}
                            label="Final Mechanic"
                            name="mechanics"
                            dataType={util.datatypes.STRING.SHORT}
                            value={util.format.forDisplay.obj.mechanic(mechanic)}
                            onChange={this.props.onChange}
                            isReadOnly
                            buttonDatatype={util.datatypes.ACTION.MECHANIC}
                            buttonDataTask="mechanic"
                            buttonOnClick={this.props.onChange}
                            buttonType="additem"
                            buttonDisabled={!util.validation.isReadyToSave.mechanic(mechanic)}
                            />
                    </div>
                </DndFieldset>
                <DndFieldset
                    legend="Exisitng Mechanics"
                    collapsible
                    >
                    <DndList
                        name="mechanics"
                        value={mechanics}
                        dataTask="mechanic"
                        dataType={util.datatypes.ACTION.MECHANIC}
                        childName="title"
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        isCollapsible
                        renderNameFunction={util.format.forDisplay.obj.mechanic}
                        />
                </DndFieldset>
            </fragment>
        );
    }
}

DndManageMechanics.propTypes = {
    editMechanic: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired
};

export default DndManageMechanics;