import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';

class DndInputWrapper extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        let wrapperClass = 'form-group form-horizontal row';
        let finalLabelCols = 4;
        if (this.props.dataType == util.datatypes.BOOL) {
            finalLabelCols = 8;
        }
        if (this.props.labelCols) {
            finalLabelCols = this.props.labelCols;
        }
        if (this.props.dataType == util.datatypes.BOOL) {
            finalInputCols = 1;
        }
        let finalInputCols = 12 - finalLabelCols;
        if (this.props.inputCols) {
            finalInputCols = this.props.inputCols;
        }

        let labelClass = 'col-sm-' + finalLabelCols + ' control-label';
        let labelDivClass = 'align-middle';
        let inputDivClass = 'field col-sm-' + finalInputCols + '';
        if (this.props.stackLabel) {
            labelClass = 'col-lg-' + finalLabelCols + ' control-label';
            inputDivClass = 'field col-lg-' + finalInputCols + '';
        }
        return (
            <div className={wrapperClass}>
                <div className={labelDivClass}>
                    <label htmlFor={this.props.name} className={labelClass}>{this.props.label}</label>
                </div>
                <div className={inputDivClass}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

DndInputWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    dataType: PropTypes.string,
    inputCols: PropTypes.number,
    labelCols: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    stackLabel: PropTypes.bool
};

export default DndInputWrapper;