import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as equipmentActions from '../../../actions/admin/equipmentActions';
import EquipmentForm from './EquipmentForm';
import util from '../../../util/util';
import DndModal from '../../common/DndModal';

class EquipmentEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editItem: Object.assign({}, util.objectModel.ITEM),
            equipment: this.props.equipment,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelEquipment = this.cancelEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveEquipment = this.saveEquipment.bind(this);
        this.saveAndNewEquipment = this.saveAndNewEquipment.bind(this);
        this.saveAndBackEquipment = this.saveAndBackEquipment.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateItemFormState = this.updateItemFormState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.equipment.id != nextProps.equipment.id) {
            this.setState({equipment: nextProps.equipment});
        }
        this.setState({saving: false});
    }

    cancelEquipment(event) {
        event.preventDefault();
        this.postAction();
    }

    deleteEquipment(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteEquipment(this.state.equipment);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    saveEquipment(event) {
        event.preventDefault();
        let newEquipment = util.common.resetObject.equipment();
        this.setState({saving: true, equipment: newEquipment});
        this.props.actions.upsertEquipment(this.state.equipment);
    }

    saveAndNewEquipment(event) {
        this.saveEquipment(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackEquipment(event) {
        this.saveEquipment(event);
        this.postAction();
    }

    updateFormState(event) {
        let equipment = util.common.formState.standard(event, this.state.equipment, this.props.equipments, this.state.editItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item(equipment.items.length * -1));
        return this.setState({equipment: equipment, editItem: newEditItem});
    }

    updateItemFormState(event) {
        let editItem = util.common.formState.standard(event, this.state.editItem, this.props.equipments);
        return this.setState({editItem: editItem});
    }
    render() {
        return (
            <DndModal
                headingCaption="Equipment"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelEquipment}
                onDelete={this.deleteEquipment}
                onSave={this.saveAndBackEquipment}
                onSaveNew={this.saveAndNewEquipment}>
                <EquipmentForm
                    ref="form"
                    equipment={this.state.equipment}
                    picklists={this.props.picklists}
                    onSave={this.saveAndBackEquipment}
                    onSaveNew={this.saveAndNewEquipment}
                    onChange={this.updateFormState}
                    onChangeItem={this.updateItemFormState}
                    onCancel={this.cancelEquipment}
                    onDelete={this.deleteEquipment}
                    isCreate={this.state.isCreate}
                    equipments={this.props.equipments}
                    saving={this.state.saving}
                    editItem={this.state.editItem}
                    />
            </DndModal>
        );
    }
}

EquipmentEntry.propTypes = {
    equipment: PropTypes.object,
    equipments: PropTypes.object,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool,
    picklists: PropTypes.array
};

function getEquipmentById(equipments, id) {
    if (id != 0) {
        let equipment = equipments.find(equipment => equipment.id == id);
        return Object.assign({}, equipment);
    } else {
        return Object.assign({}, util.objectModel.EQUIPMENT);
    }
}

function mapStateToProps(state, ownProps) {
    let equipment = Object.assign({}, util.objectModel.EQUIPMENT);
    const equipmentId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (equipmentId && state.equipments.length > 0) {
            equipment = getEquipmentById(state.equipments, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {equipment: equipment, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(equipmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentEntry);