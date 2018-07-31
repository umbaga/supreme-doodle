import React from 'react';
import PropTypes from 'prop-types';
import DndButton from '../buttons/DndButton';
import util from '../../../util/util';

class DndPrerequisiteRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onRemove = this._onRemove.bind(this);
    }
    
    _onRemove(event) {
        event.preventDefault();
        this.props.onRemovePrerequisite(event, this.props.prerequisite);
    }
    
    render() {
        const displayText = util.format.forDisplay.obj.prerequisite(this.props.prerequisite);
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

DndPrerequisiteRow.propTypes = {
    prerequisite: PropTypes.object.isRequired,
    onRemovePrerequisite: PropTypes.func.isRequired,
    deleteButtonName: PropTypes.string,
    deleteButtonAction: PropTypes.string
};

export default DndPrerequisiteRow;