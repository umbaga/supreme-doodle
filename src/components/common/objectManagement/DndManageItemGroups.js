import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndAssignedItemRow from '../subcomponents/DndAssignedItemRow';

class DndManageItemGroups extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderSelectCount = this.renderSelectCount.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.renderItemToggle = this.renderItemToggle.bind(this);
        this.renderItemGroupList = this.renderItemGroupList.bind(this);
        this._formatText = this._formatText.bind(this);
        this.renderConditionalPicklistInputs = this.renderConditionalPicklistInputs.bind(this);
        this.renderConditionalTextInput = this.renderConditionalTextInput.bind(this);
    }

    renderCategory(itemGroup, hasCategories, picklist) {
        if ((itemGroup.mechanic && itemGroup.mechanic.id != 0) && hasCategories) {
            return (
                <DndInput
                    name="category"
                    label="Category"
                    dataType={util.datatypes.picklist.PROFICIENCY_CATEGORY}
                    picklist={picklist}
                    onChange={this.props.onChange}
                    value={itemGroup.category}
                    />
            );
        }
        return null;
    }
    
    renderSelectCount(itemGroup) {
        if (itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.CATEGORY ||
           itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.LIST) {
            return (
                <DndInput
                    name="selectCount"
                    label="Selection Count"
                    dataType={util.datatypes.number.INT}
                    onChange={this.props.onChange}
                    value={itemGroup.selectCount}
                    />
            );
        }
        return null;
    }
    
    renderItemToggle(itemGroup, picklist) {
        if (itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.ASSIGNMENT ||
           itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.LIST) {
            if (itemGroup.category && itemGroup.category.id) {
                return (
                    <DndInput
                        name="proficiencies"
                        label={util.format.forDisplay.string.renderSingularPlural(this.props.title, 2)}
                        dataType={util.datatypes.array.PROFICIENCIES}
                        value={itemGroup[this.props.toggleFieldName]}
                        onChange={this.props.onChange}
                        picklist={picklist}
                        />
                );
            }
        }
        return null;
    }
    
    renderItemGroupList(itemGroups) {
        
        if (itemGroups && itemGroups.length != 0) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemGroups.map(function(group, idx) {
                            return (<DndAssignedItemRow
                                        index={idx}
                                        key={idx}
                                        item={group}
                                        displayValue={this._formatText(group)}
                                        onRemoveItem={this.props.onChange}
                                        deleteButtonName={this.props.buttonClickFieldName}
                                        deleteButtonAction={util.datatypes.action[this.props.actionProperty].REMOVE}
                                        />);
                        }.bind(this))}
                    </tbody>
                </table>
            );
        }
        return null;
    }
    
    _formatText(group) {
        if (typeof this.props.groupListItemTextFormatFunction === 'function') {
            return this.props.groupListItemTextFormatFunction(group);
        } else {
            return util.format.forDisplay.obj.itemGroup(group);
        }
    }
    
    renderConditionalPicklistInputs(itemGroup, hasCategories, items) {
        if (itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.CONDITIONAL) {
            if (!hasCategories || (hasCategories && itemGroup.category.id != 0)) {
                return (
                    <div>
                        <DndInput
                            name="proficiencies"
                            label={util.format.forDisplay.string.renderSingularPlural(this.props.title, 2)}
                            dataType={util.datatypes.picklist.PROFICIENCY}
                            value={itemGroup[this.props.toggleFieldName]}
                            onChange={this.props.onChange}
                            picklist={items}
                            />
                        {this.renderConditionalTextInput(itemGroup, hasCategories)}
                    </div>
                );
            }
        }
        return null;
    }
    
    renderConditionalTextInput(itemGroup) {
        if (itemGroup.proficiencies && itemGroup.proficiencies.length != 0) {
            return (
                <div>
                    <DndInput
                        name="conditionalText"
                        label="Conditional Text"
                        dataType={util.datatypes.string.STRING}
                        value={itemGroup.conditionalText}
                        onChange={this.props.onChange}
                        />
                </div>
            );
        }
        return null;
    }
    
    render() {
        const itemGroups = this.props.itemGroups;
        let hasCategories = (this.props.categoryTypeId && this.props.categoryTypeId.length != 0);
        const categories = util.common.picklists.getPicklistItems(this.props.picklists, this.props.categoryTypeId);
        const selectionMechanics = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SELECTION_MECHANIC);
        let items = this.props.items;
        if (this.props.editItemGroup && this.props.editItemGroup.category && this.props.editItemGroup.category.id != 0) {
            items = items.filter(item => item.category.id == this.props.editItemGroup.category.id);
        }
        const itemGroup = this.props.editItemGroup;
        return (
            <div>
                <div>
                    <DndInput
                        name="mechanic"
                        label="Selection Type"
                        dataType={util.datatypes.picklist.PROFICIENCY_SELECTION_MECHANIC}
                        picklist={selectionMechanics}
                        onChange={this.props.onChange}
                        value={itemGroup.mechanic}
                        />
                    {this.renderSelectCount(itemGroup)}
                    {this.renderCategory(itemGroup, hasCategories, categories)}
                    {this.renderItemToggle(itemGroup, items)}
                    {this.renderConditionalPicklistInputs(itemGroup, hasCategories, items)}
                    <DndDataEntryButtonBar
                        name={this.props.buttonClickFieldName}
                        onCancel={this.props.onChange}
                        onSave={this.props.onChange}
                        cancelAction={util.datatypes.action[this.props.actionProperty].RESET}
                        saveAction={util.datatypes.action[this.props.actionProperty].ADD}
                        />
                </div>
                <div>
                    {this.renderItemGroupList(itemGroups)}
                </div>
            </div>
        );
    }
}

DndManageItemGroups.propTypes = {
    itemGroups: PropTypes.array.isRequired,
    picklists: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    categoryTypeId: PropTypes.number,
    editItemGroup: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    toggleFieldName: PropTypes.string.isRequired,
    buttonClickFieldName: PropTypes.string.isRequired,
    actionProperty: PropTypes.string.isRequired,
    groupListItemTextFormatFunction: PropTypes.func
};

export default DndManageItemGroups;
