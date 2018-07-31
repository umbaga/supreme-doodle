import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndMechanicRow from '../subcomponents/DndMechanicRow';

class DndManageMechanics extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderMechanicLists = this.renderMechanicLists.bind(this);
        this.renderMechanicList = this.renderMechanicList.bind(this);
        this.renderFormInputs = this.renderFormInputs.bind(this);
        this.renderBaseAdvancementInput = this.renderBaseAdvancementInput.bind(this);
        this.renderValueInput = this.renderValueInput.bind(this);
        this.renderConditionalText = this.renderConditionalText.bind(this);
        this.renderTitleInput = this.renderTitleInput.bind(this);
    }
    
    renderMechanicLists(mechanics) {
        return (mechanics && mechanics.length != 0) ? (
            <div>
                {this.renderMechanicList(mechanics, 'Base', [util.itemtypes.MECHANIC_ASSIGNMENT.BASE, util.itemtypes.MECHANIC_ASSIGNMENT.BOTH])}
                {this.renderMechanicList(mechanics, 'Advancement', [util.itemtypes.MECHANIC_ASSIGNMENT.ADVANCEMENT, util.itemtypes.MECHANIC_ASSIGNMENT.BOTH])}
            </div>
        ) : null;
    }
    
    renderMechanicList(mechanics, title, assignmentTypeIds) {
        let useTheseMechanics = mechanics.filter(function(mech) {
            for (let q = 0; q < assignmentTypeIds.length; q++) {
                if (mech.assignmentType.id == assignmentTypeIds[q]) {
                    return true;
                }
            }
            return false;
        });
        const retVal = (useTheseMechanics && useTheseMechanics.length != 0) ? (
            <table>
                <thead>
                    <tr>
                        <th>{title}</th>
                    </tr>
                </thead>
                <tbody>
                    {useTheseMechanics.map(function(mechanic, idx) {
                        return (
                            <DndMechanicRow
                                key={idx}
                                mechanic={mechanic}
                                onRemoveMechanic={this.props.onChange}
                                deleteButtonName={'mechanics'}
                                deleteButtonAction={util.datatypes.action.MECHANIC.REMOVE}
                                />
                        );
                    }.bind(this))}
                </tbody>
            </table>
        ) : null;
        
        if (title == 'Advancement') {
            if (this.props.showAdvancement) {
                return retVal;
            } else {
                return null;
            }
        } else {
            return retVal;
        }
    }
    
    renderBaseAdvancementInput() {
        if (this.props.showAdvancement) {
            const baseAdvancementPicklist = [
                {id: util.itemtypes.MECHANIC_ASSIGNMENT.BASE, name: 'Base Only'},
                {id: util.itemtypes.MECHANIC_ASSIGNMENT.ADVANCEMENT, name: 'Advancement Only'},
                {id: util.itemtypes.MECHANIC_ASSIGNMENT.BOTH, name: 'Both Base and Advancement'}
            ];
            return (
                <DndInput
                    name="assignmentType"
                    label="Assignment Type"
                    dataType={util.datatypes.picklist.GENERAL}
                    value={this.props.editMechanic.assignmentType}
                    onChange={this.props.onChange}
                    picklist={baseAdvancementPicklist}
                    />
            );
        } else {
            return null;
        }
    }
    
    renderFormInputs(targets, types, valueObjects) {
        return (
            <div>
                {this.renderBaseAdvancementInput()}
                <DndInput
                    name="type"
                    label="Mechanic Type"
                    dataType={util.datatypes.picklist.MECHANIC_TYPE}
                    value={this.props.editMechanic.type}
                    onChange={this.props.onChange}
                    picklist={types}
                    />
                {this.renderTargetInput(targets)}
                {this.renderValueInput(valueObjects)}
                {this.renderTitleInput()}
                {this.renderConditionalText()}
                <DndDataEntryButtonBar
                    onCancel={this.props.onChange}
                    onSave={this.props.onChange}
                    name="mechanics"
                    saveAction={util.datatypes.action.MECHANIC.ADD}
                    cancelAction={util.datatypes.action.MECHANIC.RESET}
                    />
            </div>
        );
    }
    
    renderTargetInput(targets) {
        if (this.props.editMechanic && this.props.editMechanic.type && this.props.editMechanic.type.id != 0) {
            if (this.props.editMechanic.type.id != util.itemtypes.MECHANIC_TYPE.SPECIAL_TEXT) {
                return (
                    <DndInput
                        name="target"
                        label="Mechanic Target"
                        dataType={util.datatypes.picklist.MECHANIC_TARGET}
                        value={this.props.editMechanic.target}
                        onChange={this.props.onChange}
                        picklist={targets}
                        />
                );
            }
        }
        return null;
    }
    
    renderValueInput(valueObjects) {
        let inputLabel = 'Value';
        if (this.props.editMechanic && this.props.editMechanic.type
            && (this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.BONUS
                || this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.BONUS_PER_LEVEL
                || this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.DIVIDE_STAT
                || this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.MULTIPLY_STAT
                || this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.SELECT_ITEM
                || this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.SET_STAT_VALUE)) {
            if (this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.SELECT_ITEM) {
                inputLabel = 'Select #';
            }
            return (
                <DndInput
                    name="value"
                    label={inputLabel}
                    dataType={util.datatypes.number.INT}
                    value={this.props.editMechanic.value}
                    onChange={this.props.onChange}
                    />
            );
        } else if (this.props.editMechanic && this.props.editMechanic.type && this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.DIE_ROLL_BONUS_TO_STAT) {
            inputLabel = 'Die Value';
            return (
                <DndInput
                    name="dice"
                    label={inputLabel}
                    dataType={util.datatypes.special.DICE_ROLL}
                    value={this.props.editMechanic.dice}
                    onChange={this.props.onChange}
                    />
            );
        } else if (this.props.editMechanic && this.props.editMechanic.type && this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.APPLY_ABILITY_SCORE_TO_STAT) {
            inputLabel = 'Ability Score Modifier';
            return (
                <DndInput
                    name="valueObject"
                    label={inputLabel}
                    dataType={util.datatypes.picklist.GENERAL}
                    value={this.props.editMechanic.valueObject}
                    picklist={valueObjects}
                    onChange={this.props.onChange}
                    />
            );
        }
        return null;
    }
    
    renderConditionalText() {
        let specialTextLabel = (this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.SPECIAL_TEXT) ? 'Special Text' : 'Conditional Text';
        if (this.props.editMechanic && this.props.editMechanic.type && this.props.editMechanic.type.id > 0) {
            return (
                <DndInput
                    name="specialText"
                    label={specialTextLabel}
                    dataType={util.datatypes.string.STRING}
                    value={this.props.editMechanic.specialText}
                    onChange={this.props.onChange}
                    />
            );
        }
        return null;
    }
    
    renderTitleInput() {
        if (this.props.editMechanic.type.id == util.itemtypes.MECHANIC_TYPE.SPECIAL_TEXT) {
            return (
                <DndInput
                    name="title"
                    label="Title"
                    dataType={util.datatypes.string.STRING}
                    value={this.props.editMechanic.title}
                    onChange={this.props.onChange}
                    />
            );
        }
        return null;
    }
    
    render() {
        const mechanicTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.MECHANIC_TYPE);
        let mechanicTargets = [];
        let mechanicValueObjects = [];
        switch (this.props.editMechanic.type.id) {
            case util.itemtypes.MECHANIC_TYPE.DIVIDE_STAT:
            case util.itemtypes.MECHANIC_TYPE.MULTIPLY_STAT:
            case util.itemtypes.MECHANIC_TYPE.DIE_ROLL_BONUS_TO_STAT:
            case util.itemtypes.MECHANIC_TYPE.APPLY_ABILITY_SCORE_TO_STAT:
            case util.itemtypes.MECHANIC_TYPE.BONUS:
            case util.itemtypes.MECHANIC_TYPE.BONUS_PER_LEVEL:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.STAT))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ADVANTAGE_TARGET))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SKILL));
                mechanicValueObjects = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE);
                break;
            case util.itemtypes.MECHANIC_TYPE.ADVANTAGE:
            case util.itemtypes.MECHANIC_TYPE.DISADVANTAGE:
            case util.itemtypes.MECHANIC_TYPE.OPPONENT_ADVANTAGE:
            case util.itemtypes.MECHANIC_TYPE.OPPONENT_DISADVANTAGE:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SKILL)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ADVANTAGE_TARGET))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE));
                break;
            case util.itemtypes.MECHANIC_TYPE.ADVANTAGE_SAVING_THROW:
            case util.itemtypes.MECHANIC_TYPE.DISADVANTAGE_SAVING_THROW:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.CONDITION))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SCHOOL_OF_MAGIC))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.MISC_SAVING_THROW));
                break;
            case util.itemtypes.MECHANIC_TYPE.RESISTANCE:
            case util.itemtypes.MECHANIC_TYPE.VULNERABILITY:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE);
                break;
            case util.itemtypes.MECHANIC_TYPE.IMMUNITY:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.CONDITION))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SCHOOL_OF_MAGIC))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.MISC_SAVING_THROW));
                break;
            case util.itemtypes.MECHANIC_TYPE.DOUBLE_PROFICIENCY_BONUS:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SKILL);
                break;
            case util.itemtypes.MECHANIC_TYPE.SELECT_ITEM:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.TYPE);
                break;
            case util.itemtypes.MECHANIC_TYPE.BONUS_TO_COUNT_STATS_FROM_GROUP:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE);
                break;
            case util.itemtypes.MECHANIC_TYPE.SET_STAT_VALUE:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.STAT));
                break;
            case util.itemtypes.MECHANIC_TYPE.SPECIAL_MECHANIC:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SPECIAL_MECHANIC);
                break;
            default:
        }
        mechanicTargets.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        mechanicTargets = util.common.picklists.removeEmptyObjects(mechanicTargets);
        return (
            <div>
                <div className="col-md-12">
                    {this.renderFormInputs(mechanicTargets, mechanicTypes, mechanicValueObjects)}
                </div>
                <div className="col-md-12">
                    {this.renderMechanicLists(this.props.mechanics)}
                </div>
            </div>
        );
    }
}

DndManageMechanics.propTypes = {
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    mechanics: PropTypes.array.isRequired,
    editMechanic: PropTypes.object.isRequired,
    showAdvancement: PropTypes.bool
};

export default DndManageMechanics;