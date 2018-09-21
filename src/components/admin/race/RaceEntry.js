import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as raceActions from '../../../actions/admin/raceActions';
import RaceForm from './RaceForm';
import util from '../../../util/util';
import DndModal from '../../common/form/DndModal';

class RaceEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editChart: Object.assign({}, util.objectModel.CHART),
            editMechanic: Object.assign({}, util.objectModel.MECHANIC),
            editMonsterTag: Object.assign({}, util.objectModel.ITEM),
            editMovement: Object.assign({}, util.objectModel.ITEM_WITH_VALUE),
            editNaturalWeapon: Object.assign({}, util.objectModel.NATURAL_WEAPON),
            editProficiency: Object.assign({}, util.objectModel.PROFICIENCY),
            editProficiencyCategory: Object.assign({}, util.objectModel.SELECT.PROFICIENCY.CATEGORY),
            editProficiencyList: Object.assign({}, util.objectModel.SELECT.PROFICIENCY.LIST),
            editSense: Object.assign({}, util.objectModel.ITEM_WITH_VALUE),
            editSpellcastingGroup: Object.assign({}, util.objectModel.SPELLCASTING_GROUP),
            editSupplementalDescription: Object.assign({}, util.objectModel.SUPPLEMENTAL_DESCRIPTION),
            race: this.props.race,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelRace = this.cancelRace.bind(this);
        this.deleteRace = this.deleteRace.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveRace = this.saveRace.bind(this);
        this.saveAndNewRace = this.saveAndNewRace.bind(this);
        this.saveAndBackRace = this.saveAndBackRace.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateChildFormState = this.updateChildFormState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.race.id != nextProps.race.id) {
            this.setState({race: nextProps.race});
        }
        this.setState({saving: false});
    }

    cancelRace(event) {
        event.preventDefault();
        this.postAction();
    }

    deleteRace(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteRace(this.state.race);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    saveRace(event) {
        event.preventDefault();
        this.props.actions.upsertRace(this.state.race);
        let newRace = util.common.resetObject.race();
        this.setState({saving: true, race: newRace});
    }

    saveAndNewRace(event) {
        this.saveRace(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackRace(event) {
        this.saveRace(event);
        this.postAction();
    }
    
    updateFormState(event) {
        let arrayItem = null;
        let newStateObj = {};
        let saveItem = null;
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task')) {
            case 'chart':
                arrayItem = this.state.editChart;
                break;
            case 'mechanic':
                arrayItem = this.state.editMechanic;
                break;
            case 'monster-tag':
                arrayItem = this.state.editMonsterTag;
                break;
            case 'movement':
                arrayItem = this.state.editMovement;
                break;
            case 'natural-weapon':
                arrayItem = this.state.editNaturalWeapon;
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
            case 'sense':
                arrayItem = this.state.editSense;
                break;
            case 'spellcasting-group':
                arrayItem = this.state.editSpellcastingGroup;
                break;
            case 'supplementaldescription':
                arrayItem = this.state.editSupplementalDescription;
                break;
            case 'normal':
                break;
            default:
                if (util.common.formState.functions.set.valueFromTarget(event, 'data-task').constructor === String) {
                    console.error('updateFormState no data-task');
                }
        }
        saveItem = util.common.formState.standard(event, this.state.race, this.props.picklists, arrayItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item());
        newStateObj.race = saveItem;
        newStateObj.editItem = newEditItem;
        newStateObj.editChart = Object.assign({}, util.common.resetObject.chart(saveItem.charts.length));
        newStateObj.editMechanic = Object.assign({}, util.common.resetObject.mechanic(saveItem.mechanics.length));
        newStateObj.editMovement = Object.assign({}, util.common.resetObject.itemWithValue());
        newStateObj.editNaturalWeapon = Object.assign({}, util.common.resetObject.naturalWeapon());
        newStateObj.editProficiency = Object.assign({}, util.common.resetObject.proficiency());
        newStateObj.editProficiencyCategory = Object.assign({}, util.common.resetObject.select.proficiency.category());
        newStateObj.editProficiencyList = Object.assign({}, util.common.resetObject.select.proficiency.list());
        newStateObj.editSense = Object.assign({}, util.common.resetObject.itemWithValue());
        newStateObj.editSpellcastingGroup = Object.assign({}, util.common.resetObject.spellcastingGroup());
        newStateObj.editSupplementalDescription = Object.assign({}, util.common.resetObject.supplementalDescription(saveItem.supplementalDescriptions.length));
        return this.setState(newStateObj);
    }
    
    updateChildFormState(event) {
        let newStateObj = {};
        let newItem = {};
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task')) {
            case 'chart':
                newItem = util.common.formState.standard(event, this.state.editChart, this.props.picklists, this.state.race.charts);
                newStateObj.editChart = newItem;
                break;
            case 'mechanic':
                newItem = util.common.formState.standard(event, this.state.editMechanic, this.props.picklists, this.state.race.mechanics);
                newStateObj.editMechanic = newItem;
                break;
            case 'monster-tag':
                newItem = util.common.formState.standard(event, this.state.editMonsterTag, this.props.picklists);
                newStateObj.editMonsterTag = newItem;
                break;
            case 'movement':
                newItem = util.common.formState.standard(event, this.state.editMovement, this.props.picklists);
                newStateObj.editMovement = newItem;
                break;
            case 'natural-weapon':
                newItem = util.common.formState.standard(event, this.state.editNaturalWeapon, this.props.picklists);
                newStateObj.editNaturalWeapon = newItem;
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
            case 'sense':
                newItem = util.common.formState.standard(event, this.state.editSense, this.props.picklists);
                newStateObj.editSense = newItem;
                break;
            case 'spellcasting-group':
                newItem = util.common.formState.standard(event, this.state.editSpellcastingGroup, this.props.picklists);
                newStateObj.editSpellcastingGroup = newItem;
                break;
            case 'supplementaldescription':
                newItem = util.common.formState.standard(event, this.state.editSupplementalDescription, this.props.picklists, this.state.race.supplementalDescriptions);
                newStateObj.editSupplementalDescription = newItem;
                break;
            default:
                console.error('updateChildFormState no data-task');
        }
        return this.setState(newStateObj);
    }
    render() {
        return (
            <DndModal
                headingCaption="Race"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelRace}
                onDelete={this.deleteRace}
                onSave={this.saveAndBackRace}
                onSaveNew={this.saveAndNewRace}>
                <RaceForm
                    ref="form"
                    race={this.state.race}
                    races={this.props.races}
                    picklists={this.props.picklists}
                    onSave={this.saveAndBackRace}
                    onSaveNew={this.saveAndNewRace}
                    onChange={this.updateFormState}
                    onChangeChild={this.updateChildFormState}
                    onCancel={this.cancelRace}
                    onDelete={this.deleteRace}
                    isCreate={this.state.isCreate}
                    saving={this.state.saving}
                    editChart={this.state.editChart}
                    editMechanic={this.state.editMechanic}
                    editMonsterTag={this.state.editMonsterTag}
                    editMovement={this.state.editMovement}
                    editNaturalWeapon={this.state.editNaturalWeapon}
                    editProficiency={this.state.editProficiency}
                    editProficiencyCategory={this.state.editProficiencyCategory}
                    editProficiencyList={this.state.editProficiencyList}
                    editSense={this.state.editSense}
                    editSpellcastingGroup={this.state.editSpellcastingGroup}
                    editSupplementalDescription={this.state.editSupplementalDescription}
                    />
            </DndModal>
        );
    }
}

RaceEntry.propTypes = {
    race: PropTypes.object,
    races: PropTypes.array,
    picklists: PropTypes.array,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool
};

function getRaceById(races, id) {
    if (id != 0) {
        let race = races.find(race => race.id == id);
        return Object.assign({}, race);
    } else {
        return Object.assign({}, util.objectModel.RACE);
    }
}

function mapStateToProps(state, ownProps) {
    let race = Object.assign({}, util.objectModel.RACE);
    const raceId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (raceId && state.races.length > 0) {
            race = getRaceById(state.races, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {race: race, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(raceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceEntry);