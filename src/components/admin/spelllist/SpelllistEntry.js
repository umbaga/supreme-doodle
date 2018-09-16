import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as spelllistActions from '../../../actions/admin/spelllistActions';
import SpelllistForm from './SpelllistForm';
import util from '../../../util/util';
import DndModal from '../../common/form/DndModal';

class SpelllistEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editItem: Object.assign({}, util.objectModel.ITEM),
            spelllist: this.props.spelllist,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelSpelllist = this.cancelSpelllist.bind(this);
        this.deleteSpelllist = this.deleteSpelllist.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveSpelllist = this.saveSpelllist.bind(this);
        this.saveAndNewSpelllist = this.saveAndNewSpelllist.bind(this);
        this.saveAndBackSpelllist = this.saveAndBackSpelllist.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateChildFormState = this.updateChildFormState.bind(this);
        this.setEditItemToNextSpellInCurrentList = this.setEditItemToNextSpellInCurrentList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.spelllist.id != nextProps.spelllist.id) {
            this.setState({spelllist: nextProps.spelllist});
        }
        this.setState({saving: false});
    }

    cancelSpelllist(event) {
        event.preventDefault();
        this.postAction();
    }

    deleteSpelllist(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteSpelllist(this.state.spelllist);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    saveSpelllist(event) {
        event.preventDefault();
        this.props.actions.upsertSpelllist(this.state.spelllist);
        let newSpelllist = util.common.resetObject.spelllist();
        this.setState({saving: true, spelllist: newSpelllist});
    }

    saveAndNewSpelllist(event) {
        this.saveSpelllist(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackSpelllist(event) {
        this.saveSpelllist(event);
        this.postAction();
    }
    
    updateFormState(event) {
        let arrayItem = null;
        let newEditItem = null;
        let newStateObj = {};
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'item':
                arrayItem = this.state.editItem;
                newEditItem = this.setEditItemToNextSpellInCurrentList(arrayItem);
                break;
            case 'normal':
                newEditItem = Object.assign({}, util.common.resetObject.item());
                break;
            default:
                console.error('updateFormState no data-task');
        }
        let spelllist = util.common.formState.standard(event, this.state.spelllist, this.props.picklists, arrayItem);
        newStateObj.spelllist = spelllist;
        newStateObj.editItem = newEditItem;
        return this.setState(newStateObj);
    }
    
    updateChildFormState(event) {
        let newStateObj = {};
        let newItem = {};
        switch (util.common.formState.functions.set.valueFromTarget(event, 'data-task').toLowerCase()) {
            case 'item':
                newItem = util.common.formState.standard(event, this.state.editItem, this.props.picklists);
                newStateObj.editItem = newItem;
                break;
            default:
                console.error('updateChildFormState no data-task');
        }
        return this.setState(newStateObj);
    }
    
    setEditItemToNextSpellInCurrentList(currentSpell) {
        let retVal = null;
        let spells = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.SPELL).filter(function(spell) {
            return currentSpell.level == spell.level;
        });
        let currentIndex = util.common.picklists.getIndexById(spells, currentSpell.id);
        let nextIndex = currentIndex + 1;
        retVal = (nextIndex < spells.length - 1) ? spells[nextIndex] : Object.assign({}, util.common.resetObject.item());
        return retVal;
    }
    
    render() {
        return (
            <DndModal
                headingCaption="Spelllist"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelSpelllist}
                onDelete={this.deleteSpelllist}
                onSave={this.saveAndBackSpelllist}
                onSaveNew={this.saveAndNewSpelllist}>
                <SpelllistForm
                    ref="form"
                    spelllist={this.state.spelllist}
                    picklists={this.props.picklists}
                    onSave={this.saveAndBackSpelllist}
                    onSaveNew={this.saveAndNewSpelllist}
                    onChange={this.updateFormState}
                    onChangeChild={this.updateChildFormState}
                    onCancel={this.cancelSpelllist}
                    onDelete={this.deleteSpelllist}
                    isCreate={this.state.isCreate}
                    saving={this.state.saving}
                    editItem={this.state.editItem}
                    />
            </DndModal>
        );
    }
}

SpelllistEntry.propTypes = {
    spelllist: PropTypes.object,
    spelllists: PropTypes.object,
    picklists: PropTypes.array,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool
};

function getSpelllistById(spelllists, id) {
    if (id != 0) {
        let spelllist = spelllists.find(spelllist => spelllist.id == id);
        return Object.assign({}, spelllist);
    } else {
        return Object.assign({}, util.objectModel.SPELLLIST);
    }
}

function mapStateToProps(state, ownProps) {
    let spelllist = Object.assign({}, util.objectModel.SPELLLIST);
    const spelllistId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (spelllistId && state.spelllists.length > 0) {
            spelllist = getSpelllistById(state.spelllists, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {spelllist: spelllist, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(spelllistActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpelllistEntry);