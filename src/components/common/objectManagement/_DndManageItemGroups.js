import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndAssignedItemRow from '../subcomponents/DndAssignedItemRow';

class _DndManageItemGroups extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderSelectCount = this.renderSelectCount.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.renderItemToggle = this.renderItemToggle.bind(this);
        this.renderList = this.renderList.bind(this);
        this._formatText = this._formatText.bind(this);
    }

    renderCategory(picklist) {
        return this.props.itemGroup.mechanic && this.props.itemGroup.mechanic.id != 0 ? (
            <DndInput
                name="category"
                label="Category"
                dataType={util.datatypes.picklist.PROFICIENCY_CATEGORY}
                picklist={picklist}
                onChange={this.props.onChangeItemGroup}
                value={this.props.itemGroup.category}
                />
        ) : null;
    }
    
    renderSelectCount() {
        if (this.props.itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.CATEGORY ||
           this.props.itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.LIST) {
            return (
            <DndInput
                name="selectCount"
                label="Selection Count"
                dataType={util.datatypes.number.INT}
                onChange={this.props.onChangeItemGroup}
                value={this.props.itemGroup.selectCount}
                />
            );
        }
        return null;
    }
    
    renderItemToggle(picklist) {
        if (this.props.itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.ASSIGNMENT ||
           this.props.itemGroup.mechanic.id == util.itemtypes.SELECTION_MECHANIC.SELECT_FROM.LIST) {
            if (this.props.itemGroup.category && this.props.itemGroup.category.id) {
                return (
                    <DndInput
                        name="proficiencies"
                        label={util.format.forDisplay.string.renderSingularPlural(this.props.title, 2)}
                        dataType={util.datatypes.array.PROFICIENCIES}
                        value={this.props.itemGroup.proficiencies}
                        onChange={this.props.onChangeItemGroup}
                        picklist={picklist} />
                );
            }
        }
        return null;
    }
    
    renderList(groups) {
        return groups && groups.length != 0 ? (
                <fieldset>
                    <legend>Existing Item Groups</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Group</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(group =>
                                <DndAssignedItemRow
                                    key={group.id}
                                    item={group}
                                    displayValue={this._formatText(group)}
                                    onRemoveItem={this.props.onRemoveItemGroup}
                                    />
                            )}
                        </tbody>
                    </table>
                </fieldset>
        ) : null;
    }
    
    _formatText(group) {
        if (typeof this.props.groupListItemTextFormatFunction === 'function') {
            return this.props.groupListItemTextFormatFunction(group);
        } else {
            return util.format.forDisplay.obj.itemGroup(group);
        }
    }
    
    render() {
        const groups = this.props.itemGroups;
        const categories = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.PROFICIENCY_CATEGORY);
        let proficiencies = this.props.proficiencies;
        if (this.props.itemGroup && this.props.itemGroup.category && this.props.itemGroup.category.id != 0) {
            proficiencies = proficiencies.filter(item => item.category.id == this.props.itemGroup.category.id);
        }
        const selectionMechanics = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.SELECTION_MECHANIC);
        return (
            <div>
                <fieldset>
                    <legend>New {this.props.title} Group</legend>
                    <DndInput
                        name="mechanic"
                        label="Selection Type"
                        dataType={util.datatypes.picklist.PROFICIENCY_SELECTION_MECHANIC}
                        picklist={selectionMechanics}
                        onChange={this.props.onChangeItemGroup}
                        value={this.props.itemGroup.mechanic}
                        />
                    {this.renderSelectCount()}
                    {this.renderCategory(categories)}
                    {this.renderItemToggle(proficiencies)}
                    <DndDataEntryButtonBar
                        onSave={this.props.onAddItemGroup}
                        onReset={this.props.onResetItemGroup}
                        />
                </fieldset>
                {this.renderList(groups)}
            </div>
        );
    }
}

_DndManageItemGroups.propTypes = {
    itemGroups: PropTypes.array.isRequired,
    picklists: PropTypes.array.isRequired,
    proficiencies: PropTypes.array,
    onAddItemGroup: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeItemGroup: PropTypes.func.isRequired,
    onRemoveItemGroup: PropTypes.func.isRequired,
    onResetItemGroup: PropTypes.func.isRequired,
    itemGroup: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    groupListItemTextFormatFunction: PropTypes.func
};

export default _DndManageItemGroups;
