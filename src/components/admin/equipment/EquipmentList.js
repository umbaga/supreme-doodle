import React from 'react';
import PropTypes from 'prop-types';
import EquipmentItem from './EquipmentItem';

class EquipmentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <tbody>
                {this.props.equipments.map(function(equipment, idx) {
                    return (
                        <EquipmentItem
                            key={idx}
                            equipment={equipment}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            />
                    );
                }.bind(this))}
            </tbody>
        );
    }
}

EquipmentList.propTypes = {
    equipments: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default EquipmentList;