import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as proficiencyActions from '../../../actions/admin/proficiencyActions';
import ProficiencyForm from './ProficiencyForm';
import util from '../../../util/util';
import DndModal from '../../common/DndModal';

class ProficiencyEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editItem: Object.assign({}, util.objectModel.ITEM),
            proficiency: this.props.proficiency,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelProficiency = this.cancelProficiency.bind(this);
        this.deleteProficiency = this.deleteProficiency.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveProficiency = this.saveProficiency.bind(this);
        this.saveAndNewProficiency = this.saveAndNewProficiency.bind(this);
        this.saveAndBackProficiency = this.saveAndBackProficiency.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateItemFormState = this.updateItemFormState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.proficiency.id != nextProps.proficiency.id) {
            this.setState({proficiency: nextProps.proficiency});
        }
        this.setState({saving: false});
    }

    cancelProficiency(event) {
        event.preventDefault();
        this.postAction();
    }

    deleteProficiency(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteProficiency(this.state.proficiency);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    saveProficiency(event) {
        event.preventDefault();
        let newProficiency = util.common.resetObject.proficiency();
        this.setState({saving: true, proficiency: newProficiency});
        this.props.actions.upsertProficiency(this.state.proficiency);
    }

    saveAndNewProficiency(event) {
        this.saveProficiency(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackProficiency(event) {
        this.saveProficiency(event);
        this.postAction();
    }

    updateFormState(event) {
        let proficiency = util.common.formState.standard(event, this.state.proficiency, this.props.proficiencies, this.state.editItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item(proficiency.language.dialects.length * -1));
        return this.setState({proficiency: proficiency, editItem: newEditItem});
    }

    updateItemFormState(event) {
        let editItem = util.common.formState.standard(event, this.state.editItem, this.props.proficiencies);
        return this.setState({editItem: editItem});
    }
    
    render() {
        const picklists = this.props.picklists;
        return (
            <DndModal
                headingCaption="Proficiency"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelProficiency}
                onDelete={this.deleteProficiency}
                onSave={this.saveAndBackProficiency}
                onSaveNew={this.saveAndNewProficiency}>
                <ProficiencyForm
                    ref="form"
                    proficiency={this.state.proficiency}
                    picklists={picklists}
                    onSave={this.saveAndBackProficiency}
                    onSaveNew={this.saveAndNewProficiency}
                    onChange={this.updateFormState}
                    onChangeItem={this.updateItemFormState}
                    onCancel={this.cancelProficiency}
                    onDelete={this.deleteProficiency}
                    isCreate={this.state.isCreate}
                    proficiencies={this.props.proficiencies}
                    saving={this.state.saving}
                    editItem={this.state.editItem}
                    />
            </DndModal>
        );
    }
}

ProficiencyEntry.propTypes = {
    proficiency: PropTypes.object,
    picklists: PropTypes.array,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool,
    proficiencies: PropTypes.array
};

function getProficiencyById(proficiencies, id) {
    if (id != 0) {
        let proficiency = proficiencies.find(proficiency => proficiency.id == id);
        return Object.assign({}, proficiency);
    } else {
        return Object.assign({}, util.objectModel.PROFICIENCY);
    }
}

function mapStateToProps(state, ownProps) {
    let proficiency = Object.assign({}, util.objectModel.PROFICIENCY);
    const proficiencyId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (proficiencyId && state.proficiencies.length > 0) {
            proficiency = getProficiencyById(state.proficiencies, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {proficiency: proficiency, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(proficiencyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProficiencyEntry);