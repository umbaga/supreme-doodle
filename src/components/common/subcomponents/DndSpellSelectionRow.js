import React from 'react';
import PropTypes from 'prop-types';
import DndButton from '../buttons/DndButton';
import util from '../../../util/util';

class DndSpellSelectionRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onRemove = this._onRemove.bind(this);
    }
    
    _onRemove(event) {
        event.preventDefault();
        this.props.onRemove(event, this.props.spellSelection);
    }
    
    render() {
        const displayText = util.format.forDisplay.obj.spellSelection(this.props.spellSelection);
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

DndSpellSelectionRow.propTypes = {
    spellSelection: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    deleteButtonName: PropTypes.string,
    deleteButtonAction: PropTypes.string
};

export default DndSpellSelectionRow;