import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInputWrapper from './DndInputWrapper';
import DndList from './DndList';
import DndTags from './DndTags';
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
        let longValue = '';
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
        let buttonDisabled = false;
        let numberMinVal = this.props.numberMinVal ? this.props.numberMinVal : 0;
        let numberStepVal = this.props.numberStepVal ? this.props.numberStepVal : 1;
        let finalPicklist = this.props.picklist;
        let textAreaHeight = this.props.longStringHeight ? this.props.longStringHeight + 'px' : '210px';
        
        switch (this.props.dataType) {
            case util.datatypes.ARRAY.LIST.ADD.NEW:
            case util.datatypes.ARRAY.TAGS.ADD.PICKLIST:
                placeholderText = (this.props.placeholder && this.props.placeholder.length != 0) ? this.props.placeholder : 'SELECT ONE';
                if (this.props.dataType.split('NEW').length > 1) {
                    if (!this.props.childValue || this.props.childValue.length == 0) {
                        buttonDisabled = true;
                    }
                } else if (this.props.dataType.split('TAGS').length > 1) {
                    if (!this.props.childValue.name || this.props.childValue.name.length == 0) {
                        buttonDisabled = true;
                    }
                }
                if (this.props.dataType.split('PICKLIST').length > 1) {
                    finalPicklist = finalPicklist.filter(function(item) {
                        let showThis = true;
                        for (let q = 0; q < this.props.value.length; q++) {
                            if (this.props.value[q].id == item.id) {
                                showThis = false;
                            }
                        }
                        return showThis;
                    }.bind(this));
                }
                primaryInput = (this.props.dataType.split('NEW').length > 1) ? (
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
                ) : (
                    <select
                        value={this.props.childValue.id}
                        name={this.props.childName}
                        ref={this.props.childName}
                        className="form-control"
                        onChange={this.props.onChangeChild}
                        datatype={this.props.dataType}>
                        {this.renderSelectOneOption(placeholderText)}
                        {finalPicklist.map(function(picklistItem, idx) {
                            return (
                                <option
                                    key={idx}
                                    value={picklistItem.id}>
                                    {picklistItem.name}
                                </option>
                            );
                        }.bind(this))}
                    </select>
                );
                listInput = (this.props.dataType.split('TAGS').length > 1) ? (
                    <DndTags
                        name={this.props.name}
                        childName={this.props.childName}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        dataType={this.props.buttonDatatype}
                        startScrollingAt={this.props.listTableStartScrollingAt}
                        rowHeight={this.props.listTableRowHeight}
                        hideScrolling={this.props.listTableHideScrolling}
                        />
                ) : (
                    <DndList
                        name={this.props.name}
                        childName={this.props.childName}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        dataType={this.props.buttonDatatype}
                        startScrollingAt={this.props.listTableStartScrollingAt}
                        rowHeight={this.props.listTableRowHeight}
                        hideScrolling={this.props.listTableHideScrolling}
                        />
                );
                break;
            case util.datatypes.BOOL:
                primaryInput = (
                    <input
                        type="checkbox"
                        name={this.props.name}
                        ref={this.props.name}
                        checked={this.props.value}
                        datatype={this.props.dataType}
                        onChange={this.props.onChange}
                        className="form-control checkbox-inline"
                        readOnly={isReadOnly}
                        />
                );
                break;
            case util.datatypes.COMBO.DICE.PICKLIST:
                placeholderText = (this.props.placeholder && this.props.placeholder.length != 0) ? this.props.placeholder : 'SELECT ONE';
                primaryInput = (
                    <div className=" input-group input-inline">
                        <input
                            type="text"
                            name={this.props.name + '.dice'}
                            ref={this.props.name}
                            value={this.props.value.dice.rendered}
                            datatype={util.datatypes.SPECIAL.DICE}
                            onChange={this.props.onChange}
                            className="form-control"
                            readOnly={isReadOnly}
                            placeholder="Dice"
                            />
                        <select
                            value={this.props.childValue.id}
                            name={this.props.childName}
                            ref={this.props.childName}
                            className="form-control"
                            onChange={this.props.onChange}
                            datatype={util.datatypes.PICKLIST}>
                            {this.renderSelectOneOption(placeholderText)}
                            {finalPicklist.map(function(picklistItem, idx) {
                                return (
                                    <option
                                        key={idx}
                                        value={picklistItem.id}>
                                        {picklistItem.name}
                                    </option>
                                );
                            }.bind(this))}
                        </select>
                    </div>
                );
                break;
            case util.datatypes.NUMBER.DEC:
            case util.datatypes.NUMBER.INT:
                primaryInput = (
                    <input
                        type="number"
                        name={this.props.name}
                        ref={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        datatype={this.props.dataType}
                        onChange={this.props.onChange}
                        className="form-control"
                        step={numberStepVal}
                        min={numberMinVal}
                        readOnly={isReadOnly}
                        />
                );
                break;
            case util.datatypes.PICKLIST:
                placeholderText = (this.props.placeholder && this.props.placeholder.length != 0) ? this.props.placeholder : 'SELECT ONE';
                primaryInput = (
                    <select
                        value={this.props.value.id}
                        name={this.props.name}
                        ref={this.props.name}
                        className="form-control"
                        onChange={this.props.onChange}
                        datatype={this.props.dataType}>
                        {this.renderSelectOneOption(placeholderText)}
                        {finalPicklist.map(function(picklistItem, idx) {
                            return (
                                <option
                                    key={idx}
                                    value={picklistItem.id}>
                                    {picklistItem.name}
                                </option>
                            );
                        }.bind(this))}
                    </select>
                );
                break;
            case util.datatypes.SPECIAL.DICE:
                primaryInput = (
                    <input
                        type="text"
                        name={this.props.name}
                        ref={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.props.value.rendered}
                        datatype={this.props.dataType}
                        onKeyUp={this.props.onChange}
                        onChange={this.props.onChange}
                        className="form-control"
                        />
                );
                break;
            case util.datatypes.STRING.SHORT:
                primaryInput = (
                    <input
                        type="text"
                        name={this.props.name}
                        ref={this.props.name}
                        value={this.props.value}
                        datatype={this.props.dataType}
                        onChange={this.props.onChange}
                        className="form-control"
                        readOnly={isReadOnly}
                        placeholder={placeholderText}
                        />
                );
                break;
            case util.datatypes.STRING.HTML.LONG:
                if (this.props.value) {
                    longValue = this.props.value;
                } else {
                    textAreaHeight = '35px';
                }
                primaryInput = (
                    <div
                        id={this.props.name}
                        datatype={this.props.dataType}
                        className="form-control pre-scrollable"
                        style={{height: textAreaHeight}}
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: longValue }}
                        onBlur={this.props.onChange}
                        onClick={this.props.onChange}
                        onChange={this.props.onChange}
                        />
                );
                break;
            default:
                primaryInput = (<div>Need to add dataType to switch in DndInput</div>);
        }
        finalButtonType = (this.props.buttonType && this.props.buttonType.length != 0) ? this.props.buttonType : 'additem';
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
                        disabled={buttonDisabled}
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
    listTableStartScrollingAt: PropTypes.number,
    listTableRowHeight: PropTypes.number,
    listTableHideScrolling: PropTypes.bool,
    longStringHeight: PropTypes.number,
    name: PropTypes.string.isRequired,
    numberMaxVal: PropTypes.number,
    numberMinVal: PropTypes.number,
    numberStepVal: PropTypes.number,
    selectBoxSize: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func,
    picklist: PropTypes.array,
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

export default DndInput;