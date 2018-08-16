import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndButton from '../buttons/DndButton';
import DndListItemButtonBar from '../buttons/DndListItemButtonBar';

class DndList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._renderName = this._renderName.bind(this);
        this._onChangeWithIndex = this._onChangeWithIndex.bind(this);
        this.renderAuxiliaryInputs = this.renderAuxiliaryInputs.bind(this);
        this.renderButtonInput = this.renderButtonInput.bind(this);
    }
    
    _renderName(str, val) {
        if (this.props.renderNameFunction !== undefined) {
            if (typeof this.props.renderNameFunction == 'function') {
                return this.props.renderNameFunction(val);
            }
        }
        return str;
    }
    
    _onChangeWithIndex(event) {
        this.props.onChange(event, event.target.getAttribute('data-selectedIndex'));
    }
    
    renderAuxiliaryInputs(idx) {
        if (this.props.childAuxiliaryDatatypes && this.props.childAuxiliaryDatatypes.length != 0) {
            return this.props.childAuxiliaryDatatypes.map(function(datatype, idx2) {
                switch (datatype) {
                    case util.datatypes.NUMBER.INT:
                        return (
                            <td key={idx2}>
                                <input
                                    type="number"
                                    name={this.props.name + '_idx_' + idx.toString() + '_idx_' + this.props.childAuxiliaryNames[idx2]}
                                    value={this.props.value[idx][this.props.childAuxiliaryNames[idx2]]}
                                    datatype={datatype}
                                    onChange={this._onChangeWithIndex}
                                    className="form-control dnd-input-number"
                                    min="1"
                                    data-selectedIndex={idx}
                                    />
                            </td>
                        );
                    default:
                        return (<td key={idx2}>Missing datatype in List Input</td>);
                }
            }.bind(this));
        } else {
            return null;
        }
    }
    
    renderButtonInput(item, idx, buttonType, buttonOnClick, buttonDatatype, dataTask, bsButtonStyle, isEditable) {
        if (isEditable) {
            return (
                <DndListItemButtonBar
                    deleteAction={buttonDatatype.REMOVE}
                    editAction={buttonDatatype.SELECT}
                    onDelete={buttonOnClick}
                    onEdit={this.props.onChangeChild}
                    name={this.props.name}
                    listItem={item}
                    dataTask={dataTask}
                    selectedIndex={idx}
                    returnCompleteObject
                    />
            );
        } else {
            return (
                <DndButton
                    buttonType={buttonType}
                    onClick={buttonOnClick}
                    name={this.props.name}
                    dataType={buttonDatatype.REMOVE}
                    selectedIndex={idx}
                    dataTask={dataTask}
                    bsButtonStyle={bsButtonStyle}
                    />
            );
        }
    }
    
    render() {
        let isCollapsible = (this.props.isCollapsible) ? this.props.isCollapsible : false;
        let isEditable = (this.props.isEditable) ? this.props.isEditable : false;
        let isOrdering = (this.props.isOrdering) ? this.props.isOrdering : false;
        let buttonDatatype = (this.props.buttonDatatype) ? this.props.buttonDatatype : this.props.dataType;
        let buttonOnClick = (this.props.buttonOnClick) ? this.props.buttonOnClick : this.props.onChange;
        let bsButtonStyle = this.props.bsButtonStyle;
        
        let dataTask = (this.props.dataTask) ? this.props.dataTask : 'normal';
        let buttonType = 'removeitem';
        if (this.props.buttonType && this.props.buttonType.length != 0) {
            buttonType = this.props.buttonType;
        }
        let scrollingStyle = {};
        if (!this.props.hideScrolling) {
            let rowHeight = 50;
            let rowCount = 6;
            if (this.props.rowHeight) {
                rowHeight = this.props.rowHeight;
            }
            if (this.props.startScrollingAt) {
                rowCount = this.props.startScrollingAt;
            }
            if (this.props.value.length > rowCount) {
                scrollingStyle = util.styles.scrolling.list;
                scrollingStyle.height = (rowHeight * rowCount).toString() + 'px';
            }
        }
        return (
            <div style={scrollingStyle}>
                <table className="table table-sm table-striped table-hover">
                    <tbody>
                        {this.props.value.map(function(item, idx) {
                            return (
                                <tr key={idx}>
                                    {this.renderAuxiliaryInputs(idx)}
                                    <td>{this._renderName(item[this.props.childName], item)}</td>
                                    <td width="75px">
                                        <div className="pull-right">
                                            {this.renderButtonInput(item, idx, buttonType, buttonOnClick, buttonDatatype, dataTask, bsButtonStyle, isEditable)}
                                        </div>
                                    </td>
                                </tr>
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
}

DndList.propTypes = {
    bsButtonStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    buttonDatatype: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    buttonOnClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
    ]),
    buttonType: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    childAuxiliaryDatatypes: PropTypes.array,
    childAuxiliaryNames: PropTypes.array,
    childAuxiliaryValues: PropTypes.array,
    childName: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    dataTask: PropTypes.string,
    dataType: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]).isRequired,
    hideScrolling: PropTypes.bool,
    isCollapsible: PropTypes.bool,
    isEditable: PropTypes.bool,
    isOrdering: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func,
    renderNameFunction: PropTypes.func,
    rowHeight: PropTypes.number,
    startScrollingAt: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.object,
        PropTypes.string
    ]).isRequired
};

export default DndList;