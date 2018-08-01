import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInputWrapper from './DndInputWrapper';
import DndList from './DndList';
import DndButton from '../buttons/DndButton';

class DndInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderSelectOneOption = this.renderSelectOneOption.bind(this);
    }
    
    setFocus() {
        this.refs[this.props.name].focus();
    }
    
    renderSelectOneOption(placeholderText) {
        if (this.props.hideSelectOneOption) {
            return null;
        } else {
            return (<option value="0">{placeholderText}</option>);
        }
    }
    
    render() {
        let primaryInput = null;
        let isReadOnly = this.props.isReadOnly ? this.props.isReadOnly : false;
        let hasButton = this.props.buttonOnClick ? true : false;
        let finalButtonType = 'additem';
        let placeholderText = (this.props.placeholder && this.props.placeholder.length != 0) ? this.props.placeholder : this.props.label;
        if (hasButton) {
            if (this.props.buttonType && this.props.buttonType.length != 0) {
                finalButtonType = this.props.buttonType;
            }
        }
        if (this.props.value == undefined) {
            console.error('props.value is undefined: ' + this.props.name);
        }
        if (this.props.dataType == undefined) {
            console.error('datatype undefined: ' + this.props.name);
        }
        let listInput = null;
        
        switch (this.props.dataType) {
            case util.datatypes.ARRAY.LIST.ADD.NEW:
                primaryInput = (
                    <input
                        type="text"
                        name={this.props.childName}
                        value={this.props.childValue}
                        datatype={this.props.dataType}
                        onChange={this.props.onChangeChild}
                        className="form-control"
                        readOnly={isReadOnly}
                        placeholder={placeholderText}
                        />
                );
                listInput = (
                    <DndList
                        name={this.props.name}
                        childName={this.props.childName}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        dataType={this.props.buttonDatatype}
                        />
                );
                break;
            case util.datatypes.BOOL:
                primaryInput = (<input
                                    type="checkbox"
                                    name={this.props.name}
                                    ref={this.props.name}
                                    checked={this.props.value}
                                    datatype={this.props.dataType}
                                    onChange={this.props.onChange}
                                    className="form-control checkbox-inline"
                                    readOnly={isReadOnly}
                                    />);
                break;
            case util.datatypes.STRING.SHORT:
                primaryInput = (<input
                                    type="text"
                                    name={this.props.name}
                                    ref={this.props.name}
                                    value={this.props.value}
                                    datatype={this.props.dataType}
                                    onChange={this.props.onChange}
                                    className="form-control"
                                    readOnly={isReadOnly}
                                    placeholder={placeholderText}
                                    />);
                break;
            default:
                primaryInput = (<div>Need to add dataType to switch in DndInput</div>);
        }
        const buttonType = (this.props.buttonType && this.props.buttonType.length) != 0 ? this.props.buttonType : 'additem';
        const finalInput = hasButton ? (
            <div className="input-group">
                {primaryInput}
                <span className="input-group-btn">
                    <DndButton
                        buttonType={finalButtonType}
                        onClick={this.props.buttonOnClick}
                        bsButtonStyle={this.props.bsButtonStyle}
                        name={this.props.name}
                        dataType={this.props.buttonDatatype.ADD}
                        />
                </span>
            </div>
        ) : primaryInput;
        
        if (this.props.hideLabel) {
            return (
                <div>
                    {finalInput}
                    {listInput}
                </div>
            );
        } else {
            return (
                <DndInputWrapper
                    label={this.props.label}
                    dataType={this.props.dataType}
                    inputCols={this.props.inputCols}
                    labelCols={this.props.labelCols}
                    stackLabel={this.props.stackLabel}
                    >
                    <div>
                        {finalInput}
                        {listInput}
                    </div>
                </DndInputWrapper>
            );
        }
    }
}

DndInput.propTypes = {
    bsButtonStyle: PropTypes.string,
    buttonDatatype: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    buttonOnClick: PropTypes.func,
    buttonType: PropTypes.string,
    childName: PropTypes.string,
    childValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool
    ]),
    dataType: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    hideLabel: PropTypes.bool,
    hideSelectOneOption: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    inputCols: PropTypes.number,
    label: PropTypes.string,
    labelCols: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func,
    placeholder: PropTypes.string,
    stackLabel: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array,
        PropTypes.bool
    ]).isRequired
};
/*
    numberMaxVal: PropTypes.number,
    numberMinVal: PropTypes.number,
    numberStepVal: PropTypes.number,
    picklist: PropTypes.array,
    selectBoxSize: PropTypes.number,
    */
export default DndInput;