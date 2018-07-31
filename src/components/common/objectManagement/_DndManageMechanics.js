import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndMechanicRow from '../subcomponents/DndMechanicRow';

class _DndManageMechanics extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderMechanicLists = this.renderMechanicLists.bind(this);
        this.renderMechanicList = this.renderMechanicList.bind(this);
        this.renderFormInputs = this.renderFormInputs.bind(this);
        this.renderBaseAdvancementInput = this.renderBaseAdvancementInput.bind(this);
        this.renderValueInput = this.renderValueInput.bind(this);
    }
    
    renderMechanicLists(mechanics) {
        return (mechanics && mechanics.base && mechanics.base.length != 0) ? (
            <div>
                {this.renderMechanicList(mechanics.base, 'Base')}
                {this.renderMechanicList(mechanics.advancement, 'Advancement')}
            </div>
        ) : null;
    }
    
    renderMechanicList(mechanics, title) {
        const retVal = (mechanics && mechanics.length != 0) ? (
            <table>
                <thead>
                    <tr>
                        <th>{title}</th>
                    </tr>
                </thead>
                <tbody>
                    {mechanics.map(mechanic =>
                        <DndMechanicRow
                            key={mechanic.id}
                            mechanic={mechanic}
                            onRemoveMechanic={this.props.onRemoveMechanic}
                            />
                    )}
                </tbody>
            </table>
        ) : null;
        
        if (this.props.showAdvancement) {
            return retVal;
        } else {
            return null;
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
                    value={this.props.newMechanic.assignmentType}
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
                    value={this.props.newMechanic.type}
                    onChange={this.props.onChange}
                    picklist={types}
                    />
                {this.renderTargetInput(targets)}
                {this.renderValueInput(valueObjects)}
                <DndDataEntryButtonBar
                    onReset={this.props.onResetMechanic}
                    onSave={this.props.onAddMechanic}
                    />
            </div>
        );
    }
    
    renderTargetInput(targets) {
        return (this.props.newMechanic && this.props.newMechanic.type && this.props.newMechanic.type.id != 0) ? (
            <DndInput
                name="target"
                label="Mechanic Target"
                dataType={util.datatypes.picklist.MECHANIC_TARGET}
                value={this.props.newMechanic.target}
                onChange={this.props.onChange}
                picklist={targets}
                />
        ) : null;
    }
    
    renderValueInput(valueObjects) {
        if (this.props.newMechanic && this.props.newMechanic.type
            && (this.props.newMechanic.type.id == util.itemtypes.MECHANIC_TYPE.BONUS
                || this.props.newMechanic.type.id == util.itemtypes.MECHANIC_TYPE.DIVIDE_STAT
                || this.props.newMechanic.type.id == util.itemtypes.MECHANIC_TYPE.MULTIPLY_STAT)) {
            return (
                <DndInput
                    name="value"
                    label="Value"
                    dataType={util.datatypes.number.INT}
                    value={this.props.newMechanic.value}
                    onChange={this.props.onChange}
                    />
            );
        } else if (this.props.newMechanic && this.props.newMechanic.type && this.props.newMechanic.type.id == util.itemtypes.MECHANIC_TYPE.DIE_ROLL_BONUS_TO_STAT) {
            return (
                <DndInput
                    name="dice"
                    label="Die Value"
                    dataType={util.datatypes.special.DICE_ROLL}
                    value={this.props.newMechanic.dice}
                    onChange={this.props.onChange}
                    />
            );
        } else if (this.props.newMechanic && this.props.newMechanic.type && this.props.newMechanic.type.id == util.itemtypes.MECHANIC_TYPE.APPLY_ABILITY_SCORE_TO_STAT) {
            return (
                <DndInput
                    name="valueObject"
                    label="Ability Score Modifier"
                    dataType={util.datatypes.picklist.GENERAL}
                    valueObj={this.props.newMechanic.valueObject}
                    picklist={valueObjects}
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
        
        switch (this.props.newMechanic.type.id) {
            case util.itemtypes.MECHANIC_TYPE.DIVIDE_STAT:
            case util.itemtypes.MECHANIC_TYPE.MULTIPLY_STAT:
            case util.itemtypes.MECHANIC_TYPE.DIE_ROLL_BONUS_TO_STAT:
            case util.itemtypes.MECHANIC_TYPE.APPLY_ABILITY_SCORE_TO_STAT:
            case util.itemtypes.MECHANIC_TYPE.BONUS:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.STAT))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SKILL));
                mechanicValueObjects = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE);
                break;
            case util.itemtypes.MECHANIC_TYPE.ADVANTAGE:
            case util.itemtypes.MECHANIC_TYPE.DISADVANTAGE:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SKILL)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ADVANTAGE_TARGET));
                break;
            case util.itemtypes.MECHANIC_TYPE.ADVANTAGE_SAVING_THROW:
            case util.itemtypes.MECHANIC_TYPE.DISADVANTAGE_SAVING_THROW:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.CONDITION))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SCHOOL_OF_MAGIC));
                break;
            case util.itemtypes.MECHANIC_TYPE.RESISTANCE:
            case util.itemtypes.MECHANIC_TYPE.VULNERABILITY:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE);
                break;
            case util.itemtypes.MECHANIC_TYPE.IMMUNITY:
                mechanicTargets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.DAMAGE_TYPE)
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.CONDITION))
                    .concat(util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SCHOOL_OF_MAGIC));
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

_DndManageMechanics.propTypes = {
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    mechanics: PropTypes.object,
    onRemoveMechanic: PropTypes.func.isRequired,
    onResetMechanic: PropTypes.func.isRequired,
    onAddMechanic: PropTypes.func.isRequired,
    showAdvancement: PropTypes.bool,
    newMechanic: PropTypes.object.isRequired
};

export default _DndManageMechanics;