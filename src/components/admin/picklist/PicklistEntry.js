import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as picklistActions from '../../../actions/admin/picklistActions';
import PicklistForm from './PicklistForm';
import util from '../../../util/util';
import DndModal from '../../common/DndModal';

class PicklistEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editItem: Object.assign({}, util.objectModel.ITEM),
            picklist: this.props.picklist,
            isCreate: this.props.isCreate,
            canEdit: this.props.canEdit,
            saving: false
        };
        this.cancelPicklist = this.cancelPicklist.bind(this);
        this.deletePicklist = this.deletePicklist.bind(this);
        this.postAction = this.postAction.bind(this);
        this.savePicklist = this.savePicklist.bind(this);
        this.saveAndNewPicklist = this.saveAndNewPicklist.bind(this);
        this.saveAndBackPicklist = this.saveAndBackPicklist.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.updateItemFormState = this.updateItemFormState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.picklist.id != nextProps.picklist.id) {
            this.setState({picklist: nextProps.picklist});
        }
        this.setState({saving: false});
    }

    cancelPicklist(event) {
        event.preventDefault();
        this.postAction();
    }

    deletePicklist(event) {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deletePicklist(this.state.picklist);
            this.postAction();
        }
    }

    postAction() {
        this.props.closeModal();
    }

    savePicklist(event) {
        event.preventDefault();
        let newPicklist = util.common.resetObject.picklist();
        this.setState({saving: true, picklist: newPicklist});
        this.props.actions.upsertPicklist(this.state.picklist);
    }

    saveAndNewPicklist(event) {
        this.savePicklist(event);
        this.refs.form.refs.name.setFocus();
    }

    saveAndBackPicklist(event) {
        this.savePicklist(event);
        this.postAction();
    }

    updateFormState(event) {
        let picklist = util.common.formState.standard(event, this.state.picklist, this.props.picklists, this.state.editItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item(picklist.items.length * -1));
        return this.setState({picklist: picklist, editItem: newEditItem});
    }

    updateItemFormState(event) {
        let editItem = util.common.formState.standard(event, this.state.editItem, this.props.picklists);
        return this.setState({editItem: editItem});
    }
    render() {
        return (
            <DndModal
                headingCaption="Picklist"
                closeModal={this.props.closeModal}
                isCreate={this.props.isCreate}
                canEdit={this.props.canEdit}
                openModal={this.props.openModal}
                showModal={this.props.showModal}
                onCancel={this.cancelPicklist}
                onDelete={this.deletePicklist}
                onSave={this.saveAndBackPicklist}
                onSaveNew={this.saveAndNewPicklist}>
                <PicklistForm
                    ref="form"
                    picklist={this.state.picklist}
                    onSave={this.saveAndBackPicklist}
                    onSaveNew={this.saveAndNewPicklist}
                    onChange={this.updateFormState}
                    onChangeItem={this.updateItemFormState}
                    onCancel={this.cancelPicklist}
                    onDelete={this.deletePicklist}
                    isCreate={this.state.isCreate}
                    picklists={this.props.picklists}
                    saving={this.state.saving}
                    editItem={this.state.editItem}
                    />
            </DndModal>
        );
    }
}

PicklistEntry.propTypes = {
    picklist: PropTypes.object,
    actions: PropTypes.object,
    canEdit: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool,
    picklists: PropTypes.array
};

function getPicklistById(picklists, id) {
    if (id != 0) {
        let picklist = picklists.find(picklist => picklist.id == id);
        return Object.assign({}, picklist);
    } else {
        return Object.assign({}, util.objectModel.PICKLIST);
    }
}

function mapStateToProps(state, ownProps) {
    let picklist = Object.assign({}, util.objectModel.PICKLIST);
    const picklistId = ownProps.selectedId;
    let isCreate = true;
    if (ownProps.selecetdId != 0) {
        if (picklistId && state.picklists.length > 0) {
            picklist = getPicklistById(state.picklists, ownProps.selectedId);
            isCreate = false;
        }
    }
    return {picklist: picklist, isCreate: isCreate};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(picklistActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PicklistEntry);