import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndButton from '../buttons/DndButton';

class DndToggleBoxes extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderButtons = this.renderButtons.bind(this);
        this.renderAddAllButton = this.renderAddAllButton.bind(this);
        this.renderRemoveAllButton = this.renderRemoveAllButton.bind(this);
        this.renderMainButtons = this.renderMainButtons.bind(this);
    }

    renderButtons() {
        return this.props.showButtons ? (
            <div>
                {this.renderAddAllButton()}
                <div>
                    <DndButton
                        buttonType="right"
                        onClick={this.props.onAddItem}
                        />
                </div>
                <div>
                    <DndButton
                        buttonType="left"
                        onClick={this.props.onRemoveItem}
                        />
                </div>
                {this.renderRemoveAllButton()}
            </div>
        ) : null;
    }
    
    renderAddAllButton() {
        if (this.props.onAddAllItems) {
            return (
                <div>
                    <DndButton
                        buttonType="doubleright"
                        onClick={this.props.onAddAllItems}
                        />
                </div>
            );
        }
        return null;
    }
    
    renderRemoveAllButton() {
        if (this.props.onAddAllItems) {
            return (
                <div>
                    <DndButton
                        buttonType="doubleleft"
                        onClick={this.props.onRemoveAllItems}
                        />
                </div>
            );
        }
        return null;
    }
    
    renderMainButtons() {
        
    }
    
    render() {
        let idKey = 'id';
        let textKey = 'name';
        let selectBoxSize = this.props.selectBoxSize ? this.props.selectBoxSize : 10;
        return (
            <div>
                <div className="col-sm-6">
                    <select
                        name={this.props.name + 'Unassigned'}
                        className="form-control"
                        multiple
                        size={selectBoxSize}
                        datatype={this.props.dataType}
                        onDoubleClick={this.props.onAddItem}>
                        {util.common.picklists.filterPicklistByAssigned(this.props.unselectedItemArray, this.props.selectedItemArray).map(picklistItem =>
                                                                                                                    <option
                                                                                                                        key={picklistItem[idKey]}
                                                                                                                        value={picklistItem[idKey]}>
                                                                                                                        {picklistItem[textKey]}
                                                                                                                    </option>)}
                    </select>
                </div>
                <div className="col-sm-6">
                    <select
                        name={this.props.name}
                        className="form-control"
                        multiple
                        size={selectBoxSize}
                        datatype={this.props.dataType}
                        onDoubleClick={this.props.onRemoveItem}>
                        {this.props.selectedItemArray.map(picklistItem =>
                                                   <option
                                                       key={picklistItem[idKey]}
                                                       value={picklistItem[idKey]}>
                                                       {picklistItem[textKey]}
                                                   </option>)}
                    </select>
                </div>
            </div>
        );
    }
}

DndToggleBoxes.propTypes = {
    dataType: PropTypes.string.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onAddAllItems: PropTypes.func,
    onRemoveAllItems: PropTypes.func,
    unselectedItemArray: PropTypes.array.isRequired,
    selectedItemArray: PropTypes.array.isRequired,
    listOptionValueKey: PropTypes.string,
    listOptionTextKey: PropTypes.string,
    selectBoxSize: PropTypes.number,
    name: PropTypes.string.isRequired,
    showButtons: PropTypes.bool
};

export default DndToggleBoxes;