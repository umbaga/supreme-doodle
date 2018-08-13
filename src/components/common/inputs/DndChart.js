import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndButton from '../buttons/DndButton';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndInput from './DndInput';

class DndChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderCellInput = this.renderCellInput.bind(this);
    }
    
    renderHeader(chart) {
        const dataTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.DATA_TYPE);
        const picklistTypes = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.PICKLIST);
        
        return (
            <thead>
                <tr>
                    <th className="pull-right">Select a data type for column:</th>
                    {chart.columns.map(function(column, idx) {
                        let dataTypeName = 'columns_idx_' + idx.toString() + '_idx_dataType';
                        return (
                            <th key={idx} className="tableChartEditingRow">
                                <DndInput
                                    dataTask="chart"
                                    onChange={this.props.onChangeChild}
                                    dataType={util.datatypes.SPECIAL.CHART.COLUMN.DATA_TYPE}
                                    hideLabel
                                    value={chart.columns[idx].dataType}
                                    name={dataTypeName}
                                    dataIndex={idx}
                                    picklist={dataTypes}
                                    />
                            </th>
                        );
                    }.bind(this))}
                    <th className="tableChartEditingButton"></th>
                </tr>
                <tr>
                    <th className="pull-right">Select picklist:</th>
                    {chart.columns.map(function(column, idx) {
                        let picklistName = 'columns_idx_' + idx.toString() + '_idx_selectItemType';
                        let picklistInput = null;
                        if (chart.columns[idx].dataType.id == util.itemtypes.TYPE.DATA_TYPE.PICKLIST) {
                            picklistInput = (
                                <DndInput
                                    dataTask="chart"
                                    onChange={this.props.onChangeChild}
                                    dataType={util.datatypes.SPECIAL.CHART.COLUMN.PICKLIST}
                                    hideLabel
                                    value={chart.columns[idx].selectItemType}
                                    name={picklistName}
                                    dataIndex={idx}
                                    picklist={picklistTypes}
                                    />
                            );
                        }
                        return (
                            <th key={idx} className="tableChartEditingRow">
                                {picklistInput}
                            </th>
                        );
                    }.bind(this))}
                    <th className="tableChartEditingButton"></th>
                </tr>
                <tr>
                    <th className="tableChartEditingRow">
                        <DndDataEntryButtonBar
                            dataTask="chart"
                            onSave={this.props.onChange}
                            onCancel={this.props.onChangeChild}
                            cancelAction={util.datatypes.ACTION.CHART.CANCEL}
                            pullLeft
                            saveDisabled={!util.validation.isReadyToSave.chart(chart)}
                            />
                    </th>
                    {chart.columns.map(function(column, idx) {
                        return (
                            <th
                                key={idx}
                                className="tableChartEditing"
                                name={'columns_idx_' + idx.toString() + '_idx_text'}
                                datatype={util.datatypes.SPECIAL.CHART.COLUMN.STRING}
                                contentEditable
                                onBlur={this.props.onChangeChild}
                                id={'columns_idx_' + idx.toString() + '_idx_text'}
                                data-task="chart"
                                >
                                {column.text}
                            </th>
                        );
                    }.bind(this))}
                    <th className="tableChartEditingButton">
                        <DndButton
                            dataTask="chart"
                            dataType={util.datatypes.ACTION.CHART.COLUMN.ADD}
                            buttonType="additem"
                            onClick={this.props.onChangeChild}
                            name="columns"
                            />
                    </th>
                </tr>
            </thead>
        );
    }
    
    renderFooter(chart) {
        let retVal = (<tfoot><tr><td>&nbsp;</td></tr></tfoot>);
        if (chart.type.id == util.itemtypes.TYPE.CHART.STANDARD || (chart.type.id == util.itemtypes.TYPE.CHART.SELECT && chart.isNewType)) {
            retVal = (
                <tfoot>
                    <tr>
                        <td className="tableChartEditingRow">
                            <DndButton
                                dataTask="chart"
                                dataType={util.datatypes.ACTION.CHART.ROW.ADD}
                                buttonType="additem"
                                onClick={this.props.onChangeChild}
                                name="rows"
                                />
                        </td>
                        {chart.columns.map(function(column, idx) {
                            if (chart.columns.length == 1) {
                                return (<td className="tableChartEditing" key={idx}>&nbsp;</td>);
                            } else {
                                return (
                                    <td key={idx} className="tableChartEditing">
                                        <DndButton
                                            dataTask="chart"
                                            dataType={util.datatypes.ACTION.CHART.COLUMN.REMOVE}
                                            buttonType="removeitem"
                                            onClick={this.props.onChangeChild}
                                            name="columns"
                                            selectedIndex={idx}
                                            />
                                    </td>
                                );
                            }
                        }.bind(this))}
                        <th className="tableChartEditingButton">&nbsp;</th>
                    </tr>
                </tfoot>
            );
        }
        return retVal;
    }
    
    renderCellInput(item, currentIndex, dataType) {
        let retVal = null;
        let columnPicklist = null;
        switch (dataType.id) {
            case util.itemtypes.TYPE.DATA_TYPE.STRING:
                retVal = (
                    <td
                        key={currentIndex}
                        className="tableChartEditing"
                        name={'entries_idx_' + currentIndex.toString() + '_idx_text'}
                        datatype={util.datatypes.SPECIAL.CHART.ROW.STRING}
                        contentEditable
                        onBlur={this.props.onChangeChild}
                        id={'entries_idx_' + currentIndex.toString() + '_idx_text'}
                        data-task="chart">
                        {item.text}
                    </td>
                );
                break;
            case util.itemtypes.TYPE.DATA_TYPE.BOOL:
                retVal = (
                    <td key={currentIndex}>
                        <DndInput
                            name={'entries_idx_' + currentIndex.toString() + '_idx_value'}
                            dataType={util.datatypes.SPECIAL.CHART.ENTRY.BOOL}
                            value={item.value}
                            onChange={this.props.onChangeChild}
                            hideLabel
                            dataTask="chart"
                            />
                    </td>
                );
                break;
            case util.itemtypes.TYPE.DATA_TYPE.NUMBER:
                retVal = (
                    <td key={currentIndex}>
                        <DndInput
                            name={'entries_idx_' + currentIndex.toString() + '_idx_value'}
                            dataType={util.datatypes.SPECIAL.CHART.ENTRY.NUMBER}
                            value={item.value}
                            onChange={this.props.onChangeChild}
                            hideLabel
                            dataTask="chart"
                            />
                    </td>
                );
                break;
            case util.itemtypes.TYPE.DATA_TYPE.PICKLIST:
                columnPicklist = util.common.picklists.getPicklistItems(this.props.picklists, this.props.value.columns[currentIndex].selectItemType.id);
                retVal = (
                    <td key={currentIndex}>
                        <DndInput
                            name={'entries_idx_' + currentIndex.toString() + '_idx_selectedItem'}
                            dataType={util.datatypes.SPECIAL.CHART.ENTRY.PICKLIST}
                            value={item.selectedItem}
                            onChange={this.props.onChangeChild}
                            hideLabel
                            dataTask="chart"
                            picklist={columnPicklist}
                            />
                    </td>
                );
                break;
            default:
                console.error('missing datatype in rneder table cell switch');
        }
        return retVal;
    }
    
    render() {
        const chart = this.props.value;
        return (
            <table className="table-sm table-striped table-hover tableBodyScroll tableChartEditing">
                {this.renderHeader(chart)}
                <tbody className="tableNoPadding">
                    {chart.rows.map(function(row, idx) {
                        let buttonCell = null;
                        if (chart.rowCount > 1) {
                            buttonCell = (
                                <DndButton
                                    dataTask="chart"
                                    dataType={util.datatypes.ACTION.CHART.ROW.REMOVE}
                                    buttonType="removeitem"
                                    onClick={this.props.onChangeChild}
                                    name="rows"
                                    selectedIndex={idx}
                                    />
                            );
                        }
                        return (
                            <tr key={idx}>
                                <th
                                    className="tableChartEditing"
                                    name={'rows_idx_' + idx.toString() + '_idx_text'}
                                    datatype={util.datatypes.SPECIAL.CHART.ROW.STRING}
                                    contentEditable
                                    onBlur={this.props.onChangeChild}
                                    id={'rows_idx_' + idx.toString() + '_idx_text'}
                                    data-task="chart"
                                    >
                                    {row.text}
                                </th>
                                {chart.entries.filter(function(entry) {
                                    return entry.rowIndex == row.rowIndex;
                                }).sort(function(a, b) {
                                    return a.columnIndex - b.columnIndex;
                                }).map(function(entry, idx2) {
                                    let currentIndex = (idx2 * chart.rows.length) + idx;
                                    let columnDataType = chart.columns[idx2].dataType;
                                    return this.renderCellInput(entry, currentIndex, columnDataType);
                                }.bind(this))}
                                <td className="tableChartEditingButton">
                                    {buttonCell}
                                </td>
                            </tr>
                        );
                    }.bind(this))}
                </tbody>
                {this.renderFooter(chart)}
            </table>
        );
    }
}

DndChart.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired
};

export default DndChart;