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
            editItem: Object.assign({}, util.objectModel.ITEM),
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
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'item':
                arrayItem = this.state.editItem;
                break;
            case 'normal':
                break;
            default:
                console.error('updateFormState no data-task');
        }
        let spell = util.common.formState.standard(event, this.state.spell, this.props.picklists, arrayItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item());
        newStateObj.spell = spell;
        newStateObj.editItem = newEditItem;
        return this.setState(newStateObj);
    }
    
    updateChildFormState(event) {
        let newStateObj = {};
        let newItem = {};
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'item':
                newItem = util.common.formState.standard(event, this.state.editItem, this.props.picklists);
                newStateObj.editProficiency = newItem;
                break;
            default:
                console.error('updateChildFormState no data-task');
        }
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
                    editItem={this.state.editItem}
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