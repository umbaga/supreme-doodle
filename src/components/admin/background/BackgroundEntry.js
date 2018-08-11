import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as backgroundActions from '../../../actions/admin/backgroundActions';
import BackgroundForm from './BackgroundForm';
import util from '../../../util/util';
import DndModal from '../../common/DndModal';

class BackgroundEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editTrinket: Object.assign({}, util.objectModel.TRINKET),
            editEquipment: Object.assign({}, util.objectModel.ASSIGNED_EQUIPMENT),
            editProficiency: Object.assign({}, util.objectModel.PROFICIENCY),
            editProficiencyCategory: Object.assign({}, util.objectModel.SELECT.PROFICIENCY.CATEGORY),
            editProficiencyList: Object.assign({}, util.objectModel.SELECT.PROFICIENCY.LIST),
            editChart: Object.assign({}, util.objectModel.CHART),
            background: this.props.background,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelBackground = this.cancelBackground.bind(this);
        this.deleteBackground = this.deleteBackground.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveBackground = this.saveBackground.bind(this);
        this.saveAndNewBackground = this.saveAndNewBackground.bind(this);
        this.saveAndBackBackground = this.saveAndBackBackground.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateChildFormState = this.updateChildFormState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.background.id != nextProps.background.id) {
            this.setState({background: nextProps.background});
        }
        this.setState({saving: false});
    }

    cancelBackground(event) {
        event.preventDefault();
        this.postAction();
    }

    deleteBackground(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteBackground(this.state.background);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    saveBackground(event) {
        event.preventDefault();
        this.props.actions.upsertBackground(this.state.background);
        let newBackground = util.common.resetObject.background();
        this.setState({saving: true, background: newBackground});
    }

    saveAndNewBackground(event) {
        this.saveBackground(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackBackground(event) {
        this.saveBackground(event);
        this.postAction();
    }

    updateFormState(event) {
        let arrayItem = null;
        let newStateObj = {};
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'chart':
                arrayItem = this.state.editChart;
                break;
            case 'proficiency':
                arrayItem = this.state.editProficiency;
                break;
            case 'proficiencycategory':
                arrayItem = this.state.editProficiencyCategory;
                break;
            case 'proficiencylist':
                arrayItem = this.state.editProficiencyList;
                break;
            case 'assignedequipment':
                arrayItem = this.state.editEquipment;
                break;
            case 'assignedequipment-trinket':
                arrayItem = this.state.editTrinket;
            case 'normal':
                break;
            default:
                console.error('updateFormState no data-task');
        }
        let background = util.common.formState.standard(event, this.state.background, this.props.picklists, arrayItem);
        let newEditTrinket = Object.assign({}, util.common.resetObject.trinket(background.equipment.assigned.length * -1));
        let newEditEquipment = Object.assign({}, util.common.resetObject.assignedEquipment());
        let newEditProficiency = Object.assign({}, util.common.resetObject.proficiency());
        let newEditProficiencyCategory = Object.assign({}, util.common.resetObject.select.proficiency.category());
        let newEditProficiencyList = Object.assign({}, util.common.resetObject.select.proficiency.list());
        let newEditChart = Object.assign({}, util.common.resetObject.chart(background.charts.length));
        newStateObj.background = background;
        newStateObj.editTrinket = newEditTrinket;
        newStateObj.editEquipment = newEditEquipment;
        newStateObj.eeditProficiency = newEditProficiency;
        newStateObj.editProficiencyCategory = newEditProficiencyCategory;
        newStateObj.editProficiencyList = newEditProficiencyList;
        newStateObj.editChart = newEditChart;
        return this.setState(newStateObj);
    }
    
    updateChildFormState(event) {
        let newStateObj = {};
        let newItem = {};
        console.log(util.common.formState.functions.set.valueFromTarget(event, 'data-task'));
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'chart':
                newItem = util.common.formState.standard(event, this.state.editChart, this.props.picklists);
                newStateObj.editChart = newItem;
                break;
            case 'proficiency':
                newItem = util.common.formState.standard(event, this.state.editProficiency, this.props.picklists);
                newStateObj.editProficiency = newItem;
                break;
            case 'proficiencycategory':
                newItem = util.common.formState.standard(event, this.state.editProficiencyCategory, this.props.picklists);
                newStateObj.editProficiencyCategory = newItem;
                break;
            case 'proficiencylist':
                newItem = util.common.formState.standard(event, this.state.editProficiencyList, this.props.picklists, this.state.editProficiency);
                newStateObj.editProficiencyList = newItem;
                break;
            case 'assignedequipment':
                newItem = util.common.formState.standard(event, this.state.editEquipment, this.props.picklists);
                newStateObj.editEquipment = newItem;
                break;
            case 'assignedequipment-trinket':
                newItem = util.common.formState.standard(event, this.state.editTrinket, this.props.picklists);
                newStateObj.editTrinket = newItem;
                break;
            default:
                console.error('updateChildFormState no data-task');
        }
        return this.setState(newStateObj);
    }
    
    render() {
        return (
            <DndModal
                headingCaption="Background"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelBackground}
                onDelete={this.deleteBackground}
                onSave={this.saveAndBackBackground}
                onSaveNew={this.saveAndNewBackground}>
                <BackgroundForm
                    ref="form"
                    background={this.state.background}
                    picklists={this.props.picklists}
                    onSave={this.saveAndBackBackground}
                    onSaveNew={this.saveAndNewBackground}
                    onChange={this.updateFormState}
                    onCancel={this.cancelBackground}
                    onDelete={this.deleteBackground}
                    isCreate={this.state.isCreate}
                    backgrounds={this.props.backgrounds}
                    saving={this.state.saving}
                    editTrinket={this.state.editTrinket}
                    editEquipment={this.state.editEquipment}
                    editProficiency={this.state.editProficiency}
                    editProficiencyCategory={this.state.editProficiencyCategory}
                    editProficiencyList={this.state.editProficiencyList}
                    editChart={this.state.editChart}
                    onChangeChild={this.updateChildFormState}
                    />
            </DndModal>
        );
    }
}

BackgroundEntry.propTypes = {
    background: PropTypes.object,
    backgrounds: PropTypes.object,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool,
    picklists: PropTypes.array
};

function getBackgroundById(backgrounds, id) {
    if (id != 0) {
        let background = backgrounds.find(background => background.id == id);
        return Object.assign({}, background);
    } else {
        return Object.assign({}, util.objectModel.BACKGROUND);
    }
}

function mapStateToProps(state, ownProps) {
    let background = Object.assign({}, util.objectModel.BACKGROUND);
    const backgroundId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (backgroundId && state.backgrounds.length > 0) {
            background = getBackgroundById(state.backgrounds, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {background: background, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(backgroundActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundEntry);