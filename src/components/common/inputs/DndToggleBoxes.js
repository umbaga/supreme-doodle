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
                        {util.common.picklists.filterPicklistByAssigned(this.props.unselectedItemArray, this.props.selectedItemArray).map(function(picklistItem) {
                            return (
                                <option
                                    key={picklistItem[idKey]}
                                    value={picklistItem[idKey]}
                                    >
                                    {picklistItem[textKey]}
                                </option>
                            
                            );
                        }.bind(this))}
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
                        {this.props.selectedItemArray.map(function(picklistItem) {
                            return (
                                <option
                                    key={picklistItem[idKey]}
                                    value={picklistItem[idKey]}
                                    >
                                    {picklistItem[textKey]}
                                </option>
                            );
                        }.bind(this))}
                    </select>
                </div>
            </div>
        );
    }
}

DndToggleBoxes.propTypes = {
    dataType: PropTypes.string.isRequired,
    listOptionTextKey: PropTypes.string,
    listOptionValueKey: PropTypes.string,
    name: PropTypes.string.isRequired,
    onAddAllItems: PropTypes.func,
    onAddItem: PropTypes.func.isRequired,
    onRemoveAllItems: PropTypes.func,
    onRemoveItem: PropTypes.func.isRequired,
    selectBoxSize: PropTypes.number,
    selectedItemArray: PropTypes.array.isRequired,
    showButtons: PropTypes.bool,
    unselectedItemArray: PropTypes.array.isRequired
};

export default DndToggleBoxes;