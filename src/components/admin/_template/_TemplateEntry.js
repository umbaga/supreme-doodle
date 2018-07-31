import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _templateActions from '../../../actions/admin/_templateActions';

import _TemplateForm from './_TemplateForm';
import _TemplateDetails from './_TemplateDetails';
import util from '../../../util/util';
import DndModal from '../../common/DndModal';

class _TemplateEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            _template: this.props._template,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            selectedChartId: 0,
            saving: false,
            newMechanic: Object.assign({}, util.objectModel.MECHANIC),
            editDescription: Object.assign({}, util.objectModel.SUPPLEMENTAL_DESCRIPTION),
            selectedChartType: Object.assign({}, util.objectModel.CHART_TYPE),
            editChart: Object.assign({}, util.objectModel.CHART),
            editDamageGroupinf: Object.assign({}, util.objectModel.DAMAGE)
        };
        this.cancel_Template = this.cancel_Template.bind(this);
        this.delete_Template = this.delete_Template.bind(this);
        this.reset_Template = this.reset_Template.bind(this);
        this.postAction = this.postAction.bind(this);
        this.saveAndBack_Template = this.saveAndBack_Template.bind(this);
        this.saveAndNew_Template = this.saveAndNew_Template.bind(this);
        this.save_Template = this.save_Template.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props._template.id != nextProps._template.id) {
            this.setState({_template: nextProps._template});
        }
        this.setState({saving: false});
    }

    cancel_Template(event) {
        event.preventDefault();
        this.reset_Template();
        this.postAction();
    }

    delete_Template(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.delete_Template(this.state._template);
            this.postAction();
        }
    }

    reset_Template() {
        const blank_Template = Object.assign({}, util.objectModel._TEMPLATE);
        blank_Template.components = [];
        blank_Template.supplementalDescriptions = [];
        blank_Template.damage = {
            dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1},
            type: {id: 0, name: ''},
            attackRollType: {id: 0, name: ''},
            condition: {id: 0, name: ''},
            improvement: {
                dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1},
                levelCount: 0,
                projectileCount: 0
            },
            supplemental: [],
            applyAbilityScoreModifier: false,
            abilityScore: {id: 0, name: ''},
            maximum: {dice: {id: 0, dieCount: 0, dieType: 0, rendered: '', modifier: 0, multiplier: 1, divisor: 1}},
            projectileCount: 0
        };
        blank_Template.savingThrow = {
            abilityScore: {id: 0, name: ''},
            effect: {id: 0, name: ''}
        };
        blank_Template.charts = [];
        blank_Template.mechanics = {base: [], advancement: []};
        this.setState({_template: blank_Template});
    }
    
    postAction() {
        this.props.closeModal();
    }

    saveAndNew_Template(event) {
        this.save_Template(event);
        this.reset_Template();
        this.refs.form.refs.name.setFocus();
    }

    saveAndBack_Template(event) {
        this.save_Template(event);
        this.postAction();
    }

    save_Template(event) {
        event.preventDefault();
        this.props.actions.upsert_Template(this.state._template);
        this.reset_Template();
    }
    
    updateFormState(event) {
        const _template = util.common.formState.standard(event, this.state._template, this.props.picklists);
        return this.setState({_template: _template});
    }
    
    render() {
        const _template = this.state._template;
        const contents = this.props.canEdit ? (
            <_TemplateForm
                ref="form"
                _template={_template}
                isCreate={this.props.isCreate}
                picklists={this.props.picklists}
                saving={this.state.saving}
                onChange={this.updateFormState}
                />
        ) : (
            <_TemplateDetails
                _template={_template}
                picklists={this.props.picklists}
                />
        );
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
                {contents}
            </DndModal>
        );
    }
}

_TemplateEntry.propTypes = {
    _template: PropTypes.object,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool,
    picklists: PropTypes.array
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
        actions: bindActionCreators(Object.assign({}, _templateActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(_TemplateEntry);