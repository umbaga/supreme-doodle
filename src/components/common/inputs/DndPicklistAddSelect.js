import React from 'react';
import PropTypes from 'prop-types';
import DndInputWrapper from './DndInputWrapper';
import DndButton from '../buttons/DndButton';

class DndPicklistAddSelect extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSelectMode: true
        };
        this._onClick = this._onClick.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onCancel = this._onCancel.bind(this);
        this._onExtraClick = this._onExtraClick.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderPostInputButtons = this.renderPostInputButtons.bind(this);
        this.renderPreInputButtons = this.renderPreInputButtons.bind(this);
    }

    toggleMode() {
        this.setState({isSelectMode: !this.state.isSelectMode});
    }
    
    _onClick() {
        if (typeof this.props.onAddItemClick === 'function') {
            this.props.onAddItemClick();
        }
        this.toggleMode();
    }
    
    _onSave() {
        if (typeof this.props.onSaveButtonClick === 'function') {
            this.props.onSaveButtonClick();
        }
        this.toggleMode();
    }
    
    _onCancel() {
        if (typeof this.props.onCancelButtonClick === 'function') {
            this.props.onCancelButtonClick();
        }
        this.toggleMode();
    }
    
    _onExtraClick() {
        if (typeof this.props.onExtraButtonClick === 'function') {
            this.props.onExtraButtonClick();
        }
    }
    
    renderInput() {
        return this.state.isSelectMode ? (
            <select
                value={this.props.value.id}
                name={this.props.name}
                ref={this.props.name}
                className="form-control"
                onChange={this.props.onChange}
                datatype={this.props.dataType}
                >
                <option value="0">SELECT ONE</option>
                {this.props.picklist.map(function(picklistItem, idx) {
                    return (<option
                             key={idx}
                             value={picklistItem.id}>
                             {picklistItem.name}
                         </option>);
                }.bind(this))}
            </select>
        ) : (
            <input
                type="text"
                className="form-control"
                onChange={this.props.onChange}
                value={this.props.value.name}
                name={this.props.name}
                ref={this.props.name}
                datatype={this.props.dataType}
                />
        );
    }
    /*
                {this.props.picklist.map(picklistItem =>
                         <option
                             key={picklistItem.id}
                             value={picklistItem.id}>
                             {picklistItem.name}
                         </option>)}*/
    renderPostInputButtons() {
        const saveButtonType = this.props.saveButtonType && this.props.saveButtonType.length != 0 ? this.props.saveButtonType : 'save';
        const extraButtonType = this.props.extraButtonType && this.props.extraButtonType.length != 0 ? this.props.extraButtonType : '';
        let finalSaveButtonStyle = '';
        let finalExtraButtonStyle = '';
        if (this.props.bsSaveButtonStyle && this.props.bsSaveButtonStyle.length != 0) {
            finalSaveButtonStyle = this.props.bsSaveButtonStyle;
        } else if (this.props.bsButtonStyle && this.props.bsButtonStyle.length != 0) {
            finalSaveButtonStyle = this.props.bsButtonStyle;
        } else {
            finalSaveButtonStyle = 'primary';
        }
        if (this.props.bsExtraButtonStyle && this.props.bsExtraButtonStyle.length != 0) {
            finalExtraButtonStyle = this.props.bsExtraButtonStyle;
        } else if (this.props.bsButtonStyle && this.props.bsButtonStyle.length != 0) {
            finalExtraButtonStyle = this.props.bsButtonStyle;
        } else {
            finalExtraButtonStyle = 'default';
        }
        if (this.state.isSelectMode) {
            if (typeof this.props.onExtraButtonClick === 'function') {
                return (
                    <span className="input-group-btn">
                        <DndButton
                            buttonType={extraButtonType}
                            onClick={this._onExtraClick}
                            bsButtonStyle={finalExtraButtonStyle}
                            />
                    </span>
                );
            }
        } else {
            return (
                <span className="input-group-btn">
                    <DndButton
                        buttonType={saveButtonType}
                        onClick={this._onSave}
                        bsButtonStyle={finalSaveButtonStyle}
                        />
                </span>
            );
        }
        return null;
    }
    
    renderPreInputButtons() {
        const addItemButtonType = this.props.addItemButtonType && this.props.addItemButtonType.length != 0 ? this.props.addItemButtonType : 'create';
        const cancelButtonType = this.props.cancelButtonType && this.props.cancelButtonType.length != 0 ? this.props.cancelButtonType : 'cancel';
        let finalAddItemButtonStyle = '';
        let finalCancelButtonStyle = '';
        if (this.props.bsAddItemButtonStyle && this.props.bsAddItemButtonStyle.length != 0) {
            finalAddItemButtonStyle = this.props.bsAddItemButtonStyle;
        } else if (this.props.bsButtonStyle && this.props.bsButtonStyle.length != 0) {
            finalAddItemButtonStyle = this.props.bsButtonStyle;
        } else {
            finalAddItemButtonStyle = 'default';
        }
        if (this.props.bsCancelButtonStyle && this.props.bsCancelButtonStyle.length != 0) {
            finalCancelButtonStyle = this.props.bsCancelButtonStyle;
        } else if (this.props.bsButtonStyle && this.props.bsButtonStyle.length != 0) {
            finalCancelButtonStyle = this.props.bsButtonStyle;
        } else {
            finalCancelButtonStyle = 'default';
        }
        return this.state.isSelectMode ? (
            <span className="input-group-btn">
                <DndButton
                    buttonType={addItemButtonType}
                    onClick={this._onClick}
                    bsButtonStyle={finalAddItemButtonStyle}
                    />
            </span>
        ) : (
            <span className="input-group-btn">
                <DndButton
                    buttonType={cancelButtonType}
                    onClick={this._onCancel}
                    bsButtonStyle={finalCancelButtonStyle}
                    />
            </span>
        );
    }
    
    render() {
        return (
            <DndInputWrapper
                label={this.props.label}
                dataType={this.props.dataType}
                inputCols={this.props.inputCols}
                labelCols={this.props.labelCols}
                >
                <div className="input-group">
                    {this.renderPreInputButtons()}
                    {this.renderInput()}
                    {this.renderPostInputButtons()}
                </div>
            </DndInputWrapper>
        );
    }
}

DndPicklistAddSelect.propTypes = {
    dataType: PropTypes.string.isRequired,
    inputCols: PropTypes.string,
    labelCols: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    picklist: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired,
    onAddItemClick: PropTypes.func,
    onCancelButtonClick: PropTypes.func,
    onExtraButtonClick: PropTypes.func,
    onSaveButtonClick: PropTypes.func.isRequired,
    addItemButtonType: PropTypes.string,
    cancelButtonType: PropTypes.string,
    extraButtonType: PropTypes.string,
    saveButtonType: PropTypes.string,
    bsButtonStyle: PropTypes.string,
    bsAddItemButtonStyle: PropTypes.string,
    bsCancelButtonStyle: PropTypes.string,
    bsExtraButtonStyle: PropTypes.string,
    bsSaveButtonStyle: PropTypes.string
};

export default DndPicklistAddSelect;