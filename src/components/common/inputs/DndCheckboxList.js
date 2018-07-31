import React from 'react';
import PropTypes from 'prop-types';
import DndInputWrapper from './DndInputWrapper';

class DndCheckboxList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderCheckBox = this.renderCheckBox.bind(this);
    }
    
    renderCheckBox(value, picklistItem) {
        let wrapperClass = 'form-group form-horizontal row clearfix';
        let labelDivClass = '';
        let labelClass = 'col-sm-3 control-label';
        let checkInputDivClass = 'field col-sm-2';
        let textInputDivClass = 'field col-sm-7';
        let isChecked = false;
        let descriptionTextField = null;
        for (let e = 0; e < value.length; e++) {
            if (value[e].id == picklistItem.id) {
                isChecked = true;
                if (picklistItem.requireDescription) {
                    descriptionTextField = (
                        <textarea
                            name={this.props.name + '_' + this.props.textBoxKey + '_' + value[e].id}
                            className="form-control"
                            type="text"
                            value={value[e][this.props.textBoxKey]}
                            onChange={this.props.onChange}
                            datatype={this.props.dataType}
                            rows="4"
                            />
                    );
                }
            }
        }
        return (
            <div className={wrapperClass}>
                <div className={checkInputDivClass}>
                    <input
                        name={this.props.name}
                        type="checkbox"
                        className="form-control checkbox-inline"
                        value={picklistItem.id}
                        defaultChecked={isChecked}
                        onChange={this.props.onChange}
                        datatype={this.props.dataType}
                        />
                </div>
                <div className={labelDivClass}>
                    <label htmlFor={picklistItem.name} className={labelClass}>{picklistItem.name}</label>
                </div>
                <div className={textInputDivClass}>
                    {descriptionTextField}
                </div>
            </div>
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
                <div>
                    {this.props.picklist.map(picklistItem =>
                            <div key={picklistItem.id}>
                                 {this.renderCheckBox(this.props.value, picklistItem)}
                            </div>
                        )
                    }
                </div>
            </DndInputWrapper>
        );
    }
}

DndCheckboxList.propTypes = {
    dataType: PropTypes.string.isRequired,
    inputCols: PropTypes.number,
    label: PropTypes.string.isRequired,
    labelCols: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    picklist: PropTypes.array,
    value: PropTypes.array,
    textBoxKey: PropTypes.string
};

export default DndCheckboxList;