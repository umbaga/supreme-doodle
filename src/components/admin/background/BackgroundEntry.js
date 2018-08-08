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
            editItem: Object.assign({}, util.objectModel.ITEM),
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
        this.updateItemFormState = this.updateItemFormState.bind(this);
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
        let newBackground = util.common.resetObject.background();
        this.setState({saving: true, background: newBackground});
        this.props.actions.upsertBackground(this.state.background);
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
        let background = util.common.formState.standard(event, this.state.background, this.props.backgrounds, this.state.editItem);
        let newEditItem = Object.assign({}, util.common.resetObject.item(background.items.length * -1));
        return this.setState({background: background, editItem: newEditItem});
    }

    updateItemFormState(event) {
        let editItem = util.common.formState.standard(event, this.state.editItem, this.props.backgrounds);
        return this.setState({editItem: editItem});
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
                    onChangeItem={this.updateItemFormState}
                    onCancel={this.cancelBackground}
                    onDelete={this.deleteBackground}
                    isCreate={this.state.isCreate}
                    backgrounds={this.props.backgrounds}
                    saving={this.state.saving}
                    editItem={this.state.editItem}
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