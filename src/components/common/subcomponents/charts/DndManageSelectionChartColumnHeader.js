import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../../util/util';
import DndInput from '../../inputs/DndInput';

class DndManageSelectionChartColumnHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onChange = this._onChange.bind(this);
    }
    
    _onChange(event) {
        this.props.onChange(event);
        //this.props.onChange(event, this.props.entry);
    }
    
    render() {
        const chart = this.props.chart;
        const datatypes = util.hardCoded.picklist.datatypes;
        const types = this.props.types.filter(function(item) {
            return item.id != chart.selectionItemType.id;
        });
        
        return (
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    {chart.columns.map(function(column, idx) {
                        return (
                            <th key={idx}>
                                <DndInput
                                    name={'columns_' + idx.toString() + '_selectionItemDataType'}
                                    value={column.selectionItemDataType}
                                    onChange={this.props.onChange}
                                    dataType={util.datatypes.picklist.DATA_TYPE}
                                    picklist={datatypes}
                                    label="Data Type"
                                    stackLabel
                                    />
                            </th>
                        );
                    }.bind(this))}
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    {chart.columns.map(function(column, idx) {
                        /*
                        let inputValue = (column.selectionItemDataType.id == util.itemtypes.DATA_TYPE.PICKLIST) ? column.selectionItemType : column.selectionItemType.name;
                        let labelValue = (column.selectionItemDataType.id == util.itemtypes.DATA_TYPE.PICKLIST) ? 'Select Type' : 'Column Title';
                        let dataTypeValue = (column.selectionItemDataType.id == util.itemtypes.DATA_TYPE.PICKLIST) ? util.datatypes.picklist.GENERAL : util.datatypes.string.EMPTY_PICKLIST_ITEM;*/
                        let inputValue = column.selectionItemType;
                        let labelValue = 'Select Type';
                        let dataTypeValue = util.datatypes.picklist.GENERAL;
                        if (column.selectionItemDataType.id == util.itemtypes.DATA_TYPE.PICKLIST) {
                            return (
                                <th key={idx}>
                                    <DndInput
                                        name={'columns_' + idx.toString() + '_selectionItemType'}
                                        value={inputValue}
                                        onChange={this.props.onChange}
                                        dataType={dataTypeValue}
                                        picklist={types}
                                        label={labelValue}
                                        stackLabel
                                        />
                                </th>
                            );
                        }
                        return (<td key={idx}>&nbsp;</td>);
                    }.bind(this))}
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    {chart.columns.map(function(column, idx) {
                        let inputValue = column.title;
                        let labelValue = 'Column Title';
                        let dataTypeValue = util.datatypes.special.CHART_COLUMN_TITLE;
                        return (
                            <th key={idx}>
                                <DndInput
                                    name={'columns_' + idx.toString() + '_title'}
                                    value={inputValue}
                                    onChange={this.props.onChange}
                                    dataType={dataTypeValue}
                                    picklist={types}
                                    label={labelValue}
                                    stackLabel
                                    />
                            </th>
                        );
                    }.bind(this))}
                </tr>
            </thead>
        );
    }
}

DndManageSelectionChartColumnHeader.propTypes = {
    chart: PropTypes.object.isRequired,
    picklists: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired
};

export default DndManageSelectionChartColumnHeader;
