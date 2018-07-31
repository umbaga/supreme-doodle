import React from 'react';
import PropTypes from 'prop-types';
import DndButton from '../buttons/DndButton';

class DndListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onRemove = this._onRemove.bind(this);
    }
    
    _onRemove(event) {
        event.preventDefault();
        let item = this.props.item;
        item.removeIndex = this.props.index;
        this.props.onRemoveItem(event, item);
    }
    
    render() {
        const displayText = this.props.displayValue;
        return (
            <tr>
                <td>{displayText}</td>
                <td>
                    <DndButton
                        buttonType="removeitem"
                        onClick={this._onRemove}
                        name={this.props.deleteButtonName}
                        dataType={this.props.deleteButtonAction}
                        />
                </td>
            </tr>
        );
    }
}

DndListRow.propTypes = {
    item: PropTypes.object.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    displayValue: PropTypes.string,
    deleteButtonName: PropTypes.string,
    deleteButtonAction: PropTypes.string,
    index: PropTypes.number.isRequired
};

export default DndListRow;