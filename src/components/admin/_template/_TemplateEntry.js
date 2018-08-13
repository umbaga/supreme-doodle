import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _templateActions from '../../../actions/admin/_templateActions';
import _TemplateForm from './_TemplateForm';
import util from '../../../util/util';
import DndModal from '../../common/form/DndModal';

class _TemplateEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editItem: Object.assign({}, util.objectModel.ITEM),
            _template: this.props._template,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancel_Template = this.cancel_Template.bind(this);
        this.delete_Template = this.delete_Template.bind(this);
        this.postAction = this.postAction.bind(this);
        this.save_Template = this.save_Template.bind(this);
        this.saveAndNew_Template = this.saveAndNew_Template.bind(this);
        this.saveAndBack_Template = this.saveAndBack_Template.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateItemFormState = this.updateItemFormState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props._template.id != nextProps._template.id) {
            this.setState({_template: nextProps._template});
        }
        this.setState({saving: false});
    }

    cancel_Template(event) {
        event.preventDefault();
        this.postAction();
    }

    delete_Template(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.delete_Template(this.state._template);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    save_Template(event) {
        event.preventDefault();
        this.props.actions.upsert_Template(this.state._template);
        let new_Template = util.common.resetObject._template();
        this.setState({saving: true, _template: new_Template});
    }

    saveAndNew_Template(event) {
        this.save_Template(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBack_Template(event) {
        this.save_Template(event);
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
        let _template = util.common.formState.standard(event, this.state._template, this.props.picklists, arrayItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item());
        newStateObj._template = _template;
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
                headingCaption="_Template"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancel_Template}
                onDelete={this.delete_Template}
                onSave={this.saveAndBack_Template}
                onSaveNew={this.saveAndNew_Template}>
                <_TemplateForm
                    ref="form"
                    _template={this.state._template}
                    picklists={this.props.picklists}
                    onSave={this.saveAndBack_Template}
                    onSaveNew={this.saveAndNew_Template}
                    onChange={this.updateFormState}
                    onChangeItem={this.updateItemFormState}
                    onCancel={this.cancel_Template}
                    onDelete={this.delete_Template}
                    isCreate={this.state.isCreate}
                    saving={this.state.saving}
                    editItem={this.state.editItem}
                    />
            </DndModal>
        );
    }
}

_TemplateEntry.propTypes = {
    _template: PropTypes.object,
    picklists: PropTypes.object,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool
};

function get_TemplateById(_templates, id) {
    if (id != 0) {
        let _template = _templates.find(_template => _template.id == id);
        return Object.assign({}, _template);
    } else {
        return Object.assign({}, util.objectModel._TEMPLATE);
    }
}

function mapStateToProps(state, ownProps) {
    let _template = Object.assign({}, util.objectModel._TEMPLATE);
    const _templateId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (_templateId && state._templates.length > 0) {
            _template = get_TemplateById(state._templates, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {_template: _template, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_templateActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(_TemplateEntry);