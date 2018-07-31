import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInputWrapper from '../inputs/DndInputWrapper';
import DndButton from '../buttons/DndButton';
import DndAssignedItemRow from '../subcomponents/DndAssignedItemRow';
import DndPicklistAddSelect from '../inputs/DndPicklistAddSelect';

class DndManageAssignedItems extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._addItem = this._addItem.bind(this);
        this.renderItemList = this.renderItemList.bind(this);
        this.renderListHead = this.renderListHead.bind(this);
        this.renderListColumns = this.renderListColumns.bind(this);
        this.renderSelectDisplayText = this.renderSelectDisplayText.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }
    
    _addItem() {
        this.props.onAddItem();
    }
    
    renderListHead() {
        const count = this.props.showCount ? (
            <th>Count</th>
        ) : null;
        return (
            <thead>
                <tr>
                    <th>{this.props.itemListTitle}</th>
                    {count}
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        );
    }
    
    renderListColumns() {
        return this.props.showCount ? (
            <colgroup>
                <col width="50%"></col>
                <col width="25%"></col>
                <col width="15%"></col>
                <col width="10%"></col>
            </colgroup>
        ) : (
            <colgroup>
                <col width="70%"></col>
                <col width="20%"></col>
                <col width="10%"></col>
            </colgroup>
        );
    }
    
    renderItemList() {
        const itemList = this.props.valueArray.length == 0 ? null : (
            <div>
                <table>
                    {this.renderListColumns()}
                    {this.renderListHead()}
                    <tbody>
                        {
                            this.props.valueArray.map(function(item, idx) {
                                return (
                                    <DndAssignedItemRow
                                        key={item.id}
                                        item={item}
                                        onChangeCount={this.props.onChangeCount}
                                        onRemoveItem={this.props.onRemoveItem}
                                        showCount={this.props.showCount}
                                        supplementalText={this.props.supplementalText}
                                        index={idx}
                                        />
                                );
                            }.bind(this))
                        }
                    </tbody>
                </table>
            </div>
        );
        return itemList;
    }
    /*
                        {this.props.valueArray.map(item =>
                            <DndAssignedItemRow
                                key={item.id}
                                item={item}
                                onChangeCount={this.props.onChangeCount}
                                onRemoveItem={this.props.onRemoveItem}
                                showCount={this.props.showCount}
                                supplementalText={this.props.supplementalText}
                                />
                        )}*/
    renderSelectDisplayText(item, dataType) {
        switch (dataType) {
            case util.datatypes.array.ASSIGNED_EQUIPMENT:
                return util.format.forDisplay.obj.equipmentName(item);
            default:
                return item.name;
        }
    }
    
    renderInput() {
        if (typeof this.props.onSaveNewItem === 'function') {
            return (
                    <DndPicklistAddSelect
                        label={this.props.label}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        dataType={this.props.dataType}
                        picklist={util.common.picklists.filterPicklistByAssigned(this.props.picklist, this.props.valueArray)}
                        valueObj={this.props.valueObj}
                        onAddItemClick={this.props.onCreateNewItem}
                        onCancelButtonClick={this.props.onCancelNewItem}
                        onExtraButtonClick={this.props.onAddItem}
                        onSaveButtonClick={this.props.onSaveNewItem}
                        extraButtonType="additem"
                        />
            );
        } else {
            return (
                <DndInputWrapper
                    label={this.props.label}
                    dataType={this.props.dataType}
                    inputCols={this.props.inputCols}
                    labelCols={this.props.labelCols}
                    >
                    <div className="input-group">
                        <select
                            name={this.props.name}
                            className="form-control"
                            onChange={this.props.onChange}
                            datatype={this.props.dataType}
                            >
                            <option value="0">SELECT ONE</option>
                            {util.common.picklists.filterPicklistByAssigned(this.props.picklist, this.props.valueArray)
                                .map(item =>
                                     <option
                                         key={item.id}
                                         value={item.id}>
                                         {this.renderSelectDisplayText(item, this.props.dataTypeArray)}
                                     </option>)}
                        </select>
                        <span className="input-group-btn">
                            <DndButton
                                buttonType="additem"
                                onClick={this._addItem}
                                />
                        </span>
                    </div>
                </DndInputWrapper>
            );
        }
    }
    
    render() {

        return (
            <div>
                {this.renderInput()}
                {this.renderItemList()}
            </div>
        );
    }
}

DndManageAssignedItems.propTypes = {
    inputCols: PropTypes.number,
    labelCols: PropTypes.number,
    dataType: PropTypes.string.isRequired,
    dataTypeArray: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    picklist: PropTypes.array,
    value: PropTypes.string,
    valueArray: PropTypes.array,
    valueObj: PropTypes.object,
    onAddItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onChangeCount: PropTypes.func,
    showCount: PropTypes.bool,
    supplementalText: PropTypes.string,
    itemListTitle: PropTypes.string.isRequired,
    onCreateNewItem: PropTypes.func,
    onCancelNewItem: PropTypes.func,
    onSaveNewItem: PropTypes.func
};

export default DndManageAssignedItems;