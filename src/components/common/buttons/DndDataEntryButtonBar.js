import React from 'react';
import PropTypes from 'prop-types';
import DndButton from './DndButton';
import { ButtonGroup } from 'react-bootstrap';

class DndDataEntryButtonBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderButton = this.renderButton.bind(this);
    }
    
    renderButton(onClickFunction, buttonType, action, name, dataTask, disabled) {
        if (onClickFunction) {
            return (
                <DndButton
                    onClick={onClickFunction}
                    buttonType={buttonType}
                    dataType={action}
                    name={name}
                    dataTask={dataTask}
                    disbaled={disabled}
                    />
            );
        }
        return null;
    }
    
    render() {
        let wrapperClass = 'form-group';
        let cancelDataTask = (this.props.cancelDataTask) ? this.props.cancelDataTask : (this.props.dataTask) ? this.props.dataTask : 'normal';
        let deleteDataTask = (this.props.deleteDataTask) ? this.props.deleteDataTask : (this.props.dataTask) ? this.props.dataTask : 'normal';
        let resetDataTask = (this.props.resetDataTask) ? this.props.resetDataTask : (this.props.dataTask) ? this.props.dataTask : 'normal';
        let saveDataTask = (this.props.saveDataTask) ? this.props.saveDataTask : (this.props.dataTask) ? this.props.dataTask : 'normal';
        let saveDisabled = (this.props.saveDisabled) ? this.props.saveDisabled : false;
        const cancelButton = this.renderButton(this.props.onCancel, 'cancel', this.props.cancelAction, this.props.name, cancelDataTask, false);
        const deleteButton = this.renderButton(this.props.onDelete, 'delete', this.props.deleteAction, this.props.name, deleteDataTask, false);
        const resetButton = this.renderButton(this.props.onReset, 'reset', this.props.resetAction, this.props.name, resetDataTask, false);
        const saveButton = this.renderButton(this.props.onSave, 'save', this.props.saveAction, this.props.name, saveDataTask, false);
        const saveNewButton = this.renderButton(this.props.onSaveNew, 'savenew', this.props.saveAction, this.props.name, saveDataTask, saveDisabled);
        let pullClass = (this.props.pullLeft) ? 'pull-left' : 'pull-right';
        return (
            <div className={wrapperClass}>
                <div className={pullClass}>
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
    cancelAction: PropTypes.string,
    cancelDataTask: PropTypes.string,
    dataTask: PropTypes.string,
    deleteAction: PropTypes.string,
    deleteDataTask: PropTypes.string,
    isCreate: PropTypes.bool,
    name: PropTypes.string,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onReset: PropTypes.func,
    onSave: PropTypes.func,
    onSaveNew: PropTypes.func,
    resetAction: PropTypes.string,
    resetDataTask: PropTypes.string,
    pullLeft: PropTypes.bool,
    saveAction: PropTypes.string,
    saveDataTask: PropTypes.string,
    saveDisabled: PropTypes.bool,
    saving: PropTypes.bool
};

export default DndDataEntryButtonBar;
