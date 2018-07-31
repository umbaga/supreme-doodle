import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../../util/util';
import DndInput from '../../inputs/DndInput';

class DndManageSelectionChartRow extends React.Component {
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
        const row = this.props.row;
        let dataType = (this.props.rowPicklist.length != 0) ? util.datatypes.picklist.SELECTION_CHART_ROW : util.datatypes.string.EMPTY_PICKLIST_ITEM;
        return (
            <tr>
                <th>
                    <DndInput
                        name={'rows_' + row.orderIndex.toString() + '_selectionItem'}
                        value={row.selectionItem}
                        onChange={this.props.onChange}
                        dataType={dataType}
                        picklist={this.props.rowPicklist}
                        hideLabel
                        />
                </th>
                {chart.columns.map(function(column, idx) {
                    let entry = chart.entries.filter(function(entry) {
                        return entry.rowIndex == row.orderIndex && entry.columnIndex == column.orderIndex;
                    })[0];
                    let name = 'entries_' + row.orderIndex.toString() + '_' + column.orderIndex.toString();
                    name += (column.selectionItemDataType.id == util.itemtypes.DATA_TYPE.PICKLIST) ? '_selectionItem' : '_description';
                    let value = (column.selectionItemDataType.id == util.itemtypes.DATA_TYPE.PICKLIST) ? entry.selectionItem : entry.description;
                    let datatype = (column.selectionItemDataType.id == util.itemtypes.DATA_TYPE.PICKLIST) ? util.datatypes.picklist.GENERAL : util.datatypes.string.EMPTY_PICKLIST_ITEM;
                    let picklist = util.common.picklists.getPicklistItems(this.props.picklists, column.selectionItemType.id);
                    return (
                        <th key={idx}>
                            <DndInput
                                name={name}
                                value={value}
                                dataType={datatype}
                                picklist={picklist}
                                onChange={this.props.onChange}
                                hideLabel
                                />
                        </th>
                    );
                }.bind(this))}
            </tr>
        );
    }
}

DndManageSelectionChartRow.propTypes = {
    chart: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    rowPicklist: PropTypes.array.isRequired,
    picklists: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DndManageSelectionChartRow;
