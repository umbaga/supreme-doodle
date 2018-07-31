import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndPrerequisiteRow from '../subcomponents/DndPrerequisiteRow';

class DndManagePrerequisites extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderFormInputs = this.renderFormInputs.bind(this);
        this.renderPrerequisiteLists = this.renderPrerequisiteLists.bind(this);
        this.renderInclusiveInput = this.renderInclusiveInput.bind(this);
        this.renderFilterInput = this.renderFilterInput.bind(this);
        this.renderTargetInput = this.renderTargetInput.bind(this);
        this.renderValueInput = this.renderValueInput.bind(this);
    }
    
    renderFormInputs(prerequisite, types, targetFilters, targets, targetTitle, valueTitle) {
        return (
            <div>
                <DndInput
                    name="type"
                    label="Prerequisite Type"
                    dataType={util.datatypes.picklist.PREREQUISITE_TYPE}
                    value={this.props.editPrerequisite.type}
                    onChange={this.props.onChange}
                    picklist={types}
                    />
                {this.renderInclusiveInput(prerequisite)}
                {this.renderValueInput(prerequisite, targetFilters, targets, valueTitle)}
                {this.renderFilterInput(prerequisite, targetFilters, targets)}
                {this.renderTargetInput(prerequisite, targetFilters, targets, targetTitle)}
                <DndDataEntryButtonBar
                    onCancel={this.props.onChange}
                    onSave={this.props.onChange}
                    name="prerequisites"
                    saveAction={util.datatypes.action.PREREQUISITE.ADD}
                    cancelAction={util.datatypes.action.PREREQUISITE.RESET}
                    />
            </div>
        );
    }
    
    renderPrerequisiteLists(prerequisites) {
        return prerequisites.length == 0 ? null : (
            <table>
                <tbody>
                    {prerequisites.map(function(prerequisite, idx) {
                        return (
                            <DndPrerequisiteRow
                                key={idx}
                                prerequisite={prerequisite}
                                onRemovePrerequisite={this.props.onChange}
                                deleteButtonName={'prerequisites'}
                                deleteButtonAction={util.datatypes.action.PREREQUISITE.REMOVE}
                                />
                        );
                    }.bind(this))}
                </tbody>
            </table>
        );
    }
    
    renderInclusiveInput(prerequisite) {
        let retVal = null;
        if (prerequisite && prerequisite.type && prerequisite.type.id && prerequisite.type.id != 0) {
            switch (prerequisite.type.id) {
                case util.itemtypes.PREREQUISITE_TYPE.MINIMUM_ABILITY_SCORE:
                case util.itemtypes.PREREQUISITE_TYPE.PROFICIENCY:
                    retVal = (
                        <DndInput
                            name="isInclusive"
                            label="Is Inclusive"
                            dataType={util.datatypes.bool.YES_NO}
                            value={prerequisite.isInclusive}
                            onChange={this.props.onChange}
                            />
                    );
                    break;
                default:
            }
        }
        return retVal;
    }
    
    renderFilterInput(prerequisite, targetFilters) {
        let retVal = null;
        if (prerequisite && prerequisite.type && prerequisite.type.id && prerequisite.type.id != 0) {
            switch (prerequisite.type.id) {
                case util.itemtypes.PREREQUISITE_TYPE.PROFICIENCY:
                    retVal = (
                        <DndInput
                            name="filterObject"
                            label="Filter By"
                            dataType={util.datatypes.picklist.GENERAL}
                            value={prerequisite.filterObject}
                            onChange={this.props.onChange}
                            picklist={targetFilters}
                            />
                    );
                    break;
                default:
            }
        }
        return retVal;
    }
    
    renderTargetInput(prerequisite, targetFilters, targets, targetTitle) {
        let retVal = null;
        let finalTargets = targets;
        if (prerequisite && prerequisite.type && prerequisite.type.id && prerequisite.type.id != 0) {
            switch (prerequisite.type.id) {
                case util.itemtypes.PREREQUISITE_TYPE.MINIMUM_ABILITY_SCORE:
                    retVal = (
                        <DndInput
                            name="targets"
                            label={targetTitle}
                            dataType={util.datatypes.array.GENERAL}
                            value={prerequisite.targets}
                            onChange={this.props.onChange}
                            picklist={finalTargets}
                            />
                    );
                    break;
                case util.itemtypes.PREREQUISITE_TYPE.PROFICIENCY:
                    finalTargets = finalTargets.filter(function(obj) {
                        return obj.category.id == prerequisite.filterObject.id;
                    });
                    retVal = (
                        <DndInput
                            name="targets"
                            label={targetTitle}
                            dataType={util.datatypes.array.PROFICIENCIES}
                            value={prerequisite.targets}
                            onChange={this.props.onChange}
                            picklist={finalTargets}
                            />
                    );
                    break;
                default:
            }
        }
        return retVal;
    }
    
    renderValueInput(prerequisite, targetFilters, targets, valueTitle) {
        let retVal = null;
        if (prerequisite && prerequisite.type && prerequisite.type.id && prerequisite.type.id != 0) {
            switch (prerequisite.type.id) {
                case util.itemtypes.PREREQUISITE_TYPE.CAST_MINIMUM_SPELL_LEVEL:
                case util.itemtypes.PREREQUISITE_TYPE.MINIMUM_ABILITY_SCORE:
                    retVal = (
                        <DndInput
                            name="value"
                            label={valueTitle}
                            dataType={util.datatypes.number.INT}
                            value={prerequisite.value}
                            onChange={this.props.onChange}
                            />
                    );
                    break;
                default:
            }
        }
        return retVal;
    }
    
    render() {
        const prerequisiteTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.PREREQUISITE_TYPE);
        const prerequisite = this.props.editPrerequisite;
        let targets = [];
        let targetFilters = [];
        let targetTitle = '--No Target Title--';
        let valueTitle = '--Value--';
        switch (prerequisite.type.id) {
            case util.itemtypes.PREREQUISITE_TYPE.CAST_MINIMUM_SPELL_LEVEL:
                targetFilters = [];
                targets = [];
                targetTitle = '';
                valueTitle = 'Minimum Spell Level';
                break;
            case util.itemtypes.PREREQUISITE_TYPE.MINIMUM_ABILITY_SCORE:
                targetFilters = [];
                targets = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ABILITY_SCORE);
                targetTitle = 'Ability Scores';
                valueTitle = 'Minimum Value';
                break;
            case util.itemtypes.PREREQUISITE_TYPE.PROFICIENCY:
                targetFilters = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.PROFICIENCY_CATEGORY);
                targets = this.props.proficiencies;
                targetTitle = 'Proficiencies';
                break;
            default:
        }
        return (
            <div>
                <div className="col-md-12">
                    {this.renderFormInputs(prerequisite, prerequisiteTypes, targetFilters, targets, targetTitle, valueTitle)}
                </div>
                <div className="col-md-12">
                    {this.renderPrerequisiteLists(this.props.prerequisites)}
                </div>
            </div>
        );
    }
}

DndManagePrerequisites.propTypes = {
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    prerequisites: PropTypes.array.isRequired,
    proficiencies: PropTypes.array.isRequired,
    editPrerequisite: PropTypes.object.isRequired,
    showAdvancement: PropTypes.bool
};

export default DndManagePrerequisites;