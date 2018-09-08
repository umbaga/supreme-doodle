import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as spellActions from '../../../actions/admin/spellActions';
import SpellForm from './SpellForm';
import util from '../../../util/util';
import DndModal from '../../common/form/DndModal';

class SpellEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editChart: Object.assign({}, util.objectModel.CHART),
            editItem: Object.assign({}, util.objectModel.ITEM),
            editMechanic: Object.assign({}, util.objectModel.MECHANIC),
            editSupplementalDamage: Object.assign({}, util.objectModel.DAMAGE),
            editSupplementalDescription: Object.assign({}, util.objectModel.SUPPLEMENTAL_DESCRIPTION),
            spell: this.props.spell,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelSpell = this.cancelSpell.bind(this);
        this.deleteSpell = this.deleteSpell.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveSpell = this.saveSpell.bind(this);
        this.saveAndNewSpell = this.saveAndNewSpell.bind(this);
        this.saveAndBackSpell = this.saveAndBackSpell.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateChildFormState = this.updateChildFormState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.spell.id != nextProps.spell.id) {
            this.setState({spell: nextProps.spell});
        }
        this.setState({saving: false});
    }

    cancelSpell(event) {
        event.preventDefault();
        this.postAction();
    }

    deleteSpell(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteSpell(this.state.spell);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    saveSpell(event) {
        event.preventDefault();
        this.props.actions.upsertSpell(this.state.spell);
        let newSpell = util.common.resetObject.spell();
        this.setState({saving: true, spell: newSpell});
    }

    saveAndNewSpell(event) {
        this.saveSpell(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackSpell(event) {
        this.saveSpell(event);
        this.postAction();
    }
    
    updateFormState(event) {
        let arrayItem = null;
        let newStateObj = {};
        let saveItem = null;
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'chart':
                arrayItem = this.state.editChart;
                break;
            case 'damage-condition':
            case 'damage-type':
                arrayItem = this.state.editItem;
                break;
            case 'mechanic':
                arrayItem = this.state.editMechanic;
                break;
            case 'supplementaldamage':
                arrayItem = this.state.editSupplementalDamage;
                break;
            case 'supplementaldescription':
                arrayItem = this.state.editSupplementalDescription;
                break;
            case 'normal':
                break;
            default:
                console.error('updateFormState no data-task');
        }
        saveItem = util.common.formState.standard(event, this.state.spell, this.props.picklists, arrayItem);
        newStateObj.editChart = Object.assign({}, util.common.resetObject.chart(saveItem.charts.length));
        newStateObj.editMechanic = Object.assign({}, util.common.resetObject.mechanic(saveItem.mechanics.length));
        newStateObj.editItem = Object.assign({}, util.common.resetObject.item(saveItem.damage.typeList.list.length + saveItem.damage.conditionList.list.length));
        newStateObj.editSupplementalDamage = Object.assign({}, util.common.resetObject.damage());
        newStateObj.editSupplementalDescription = Object.assign({}, util.common.resetObject.supplementalDescription(saveItem.supplementalDescriptions.length));
        newStateObj.spell = saveItem;
        console.log(saveItem);
        return this.setState(newStateObj);
    }
    
    updateChildFormState(event) {
        let newStateObj = {};
        let newItem = {};
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'chart':
                newItem = util.common.formState.standard(event, this.state.editChart, this.props.picklists, this.state.spell.charts);
                newStateObj.editChart = newItem;
                break;
            case 'damage-condition':
                newItem = util.common.formState.standard(event, this.state.editItem, this.props.picklists, this.state.spell.damage.conditionList.list);
                newStateObj.editItem = newItem;
                break;
            case 'damage-type':
                newItem = util.common.formState.standard(event, this.state.editItem, this.props.picklists, this.state.spell.damage.typeList.list);
                newStateObj.editItem = newItem;
                break;
            case 'mechanic':
                newItem = util.common.formState.standard(event, this.state.editMechanic, this.props.picklists, this.state.spell.mechanics);
                newStateObj.editMechanic = newItem;
                break;
            case 'supplementaldamage':
                newItem = util.common.formState.standard(event, this.state.editSupplementalDamage, this.props.picklists, this.state.spell.damage.supplemental);
                newStateObj.editSupplementalDamage = newItem;
                break;
            case 'supplementaldescription':
                newItem = util.common.formState.standard(event, this.state.editSupplementalDescription, this.props.picklists, this.state.spell.supplementalDescriptions);
                newStateObj.editSupplementalDescription = newItem;
                break;
            default:
                console.error('updateChildFormState no data-task');
        }
        console.log(newItem);
        return this.setState(newStateObj);
    }
    render() {
        return (
            <DndModal
                headingCaption="Spell"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelSpell}
                onDelete={this.deleteSpell}
                onSave={this.saveAndBackSpell}
                onSaveNew={this.saveAndNewSpell}>
                <SpellForm
                    ref="form"
                    spell={this.state.spell}
                    picklists={this.props.picklists}
                    onSave={this.saveAndBackSpell}
                    onSaveNew={this.saveAndNewSpell}
                    onChange={this.updateFormState}
                    onChangeChild={this.updateChildFormState}
                    onCancel={this.cancelSpell}
                    onDelete={this.deleteSpell}
                    isCreate={this.state.isCreate}
                    saving={this.state.saving}
                    editChart={this.state.editChart}
                    editItem={this.state.editItem}
                    editMechanic={this.state.editMechanic}
                    editSupplementalDamage={this.state.editSupplementalDamage}
                    editSupplementalDescription={this.state.editSupplementalDescription}
                    />
            </DndModal>
        );
    }
}

SpellEntry.propTypes = {
    spell: PropTypes.object,
    spells: PropTypes.object,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool,
    picklists: PropTypes.array
};

function getSpellById(spells, id) {
    if (id != 0) {
        let spell = spells.find(spell => spell.id == id);
        return Object.assign({}, spell);
    } else {
        return Object.assign({}, util.objectModel.SPELL);
    }
}

function mapStateToProps(state, ownProps) {
    let spell = Object.assign({}, util.objectModel.SPELL);
    const spellId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (spellId && state.spells.length > 0) {
            spell = getSpellById(state.spells, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {spell: spell, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(spellActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellEntry);