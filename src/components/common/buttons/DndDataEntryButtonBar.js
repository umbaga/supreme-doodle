import React from 'react';
import PropTypes from 'prop-types';
import DndButton from './DndButton';
import { ButtonGroup } from 'react-bootstrap';

class DndDataEntryButtonBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderButton = this.renderButton.bind(this);
    }
    
    renderButton(onClickFunction, buttonType, action, name) {
        if (onClickFunction) {
            return (
                <DndButton
                    onClick={onClickFunction}
                    buttonType={buttonType}
                    dataType={action}
                    name={name}
                    />
            );
        }
        return null;
    }
    
    render() {
        let wrapperClass = 'form-group';
        const cancelButton = this.renderButton(this.props.onCancel, 'cancel', this.props.cancelAction, this.props.name);
        const deleteButton = this.renderButton(this.props.onDelete, 'delete', this.props.deleteAction, this.props.name);
        const resetButton = this.renderButton(this.props.onReset, 'reset', this.props.resetAction, this.props.name);
        const saveButton = this.renderButton(this.props.onSave, 'save', this.props.saveAction, this.props.name);
        const saveNewButton = this.renderButton(this.props.onSaveNew, 'savenew', this.props.saveAction, this.props.name);
        return (
            <div className={wrapperClass}>
                <div className="pull-right">
                    <ButtonGroup>
                        {deleteButton}
                        {resetButton}
                        {cancelButton}
                        {saveButton}
                        {saveNewButton}
                    </ButtonGroup>
                </div>
                <div>&nbsp;</div>
            </div>
        );
    }
}

DndDataEntryButtonBar.propTypes = {
    isCreate: PropTypes.bool,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onReset: PropTypes.func,
    onSave: PropTypes.func,
    onSaveNew: PropTypes.func,
    saving: PropTypes.bool,
    cancelAction: PropTypes.string,
    deleteAction: PropTypes.string,
    resetAction: PropTypes.string,
    saveAction: PropTypes.string,
    name: PropTypes.string
};

export default DndDataEntryButtonBar;
