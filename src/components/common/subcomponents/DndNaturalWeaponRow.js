import React from 'react';
import PropTypes from 'prop-types';
import DndButton from '../buttons/DndButton';
import util from '../../../util/util';

class DndNaturalWeaponRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onRemove = this._onRemove.bind(this);
    }
    
    _onRemove(event) {
        event.preventDefault();
        const naturalWeapon = this.props.naturalWeapon;
        naturalWeapon.removeIndex = this.props.index;
        this.props.onRemoveNaturalWeapon(event, this.props.naturalWeapon);
    }
    
    render() {
        const displayText = util.format.forDisplay.obj.naturalWeapon(this.props.naturalWeapon);
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

DndNaturalWeaponRow.propTypes = {
    naturalWeapon: PropTypes.object.isRequired,
    onRemoveNaturalWeapon: PropTypes.func.isRequired,
    deleteButtonName: PropTypes.string,
    deleteButtonAction: PropTypes.string,
    index: PropTypes.number.isRequired
};

export default DndNaturalWeaponRow;