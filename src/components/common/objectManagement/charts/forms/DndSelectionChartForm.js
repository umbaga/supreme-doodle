import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../../../util/util';
import DndButton from '../../../buttons/DndButton';
import DndInput from '../../../inputs/DndInput';
import DndManageSelectionChartRow from '../../../subcomponents/charts/DndManageSelectionChartRow';
import DndManageSelectionChartColumnHeader from '../../../subcomponents/charts/DndManageSelectionChartColumnHeader';

class DndSelectionChartForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderEditChart = this.renderEditChart.bind(this);
        this.renderChartTypeInput = this.renderChartTypeInput.bind(this);
        this.renderColumnRowCount = this.renderColumnRowCount.bind(this);
        this.renderExpandButton = this.renderExpandButton.bind(this);
        this.renderChartForm = this.renderChartForm.bind(this);
    }
    
    renderChartTypeInput(chart, types) {
        if (chart.isCreateNewItemType) {
            return (
                <DndInput
                    label="New Type Name"
                    name="selectionItemType"
                    value={chart.selectionItemType.name}
                    onChange={this.props.onChange}
                    dataType={util.datatypes.string.EMPTY_PICKLIST_ITEM}
                    />
            );
        } else {
            return (
                <DndInput
                    label="Select Type"
                    name="selectionItemType"
                    value={chart.selectionItemType}
                    onChange={this.props.onChange}
                    dataType={util.datatypes.picklist.GENERAL}
                    picklist={types}
                    />
            );
        }
    }
    
    renderColumnRowCount(chart) {
        const colVal = chart.isCreateNewItemType ? '6' : '5';
        if (chart.selectionItemType && chart.selectionItemType.name && chart.selectionItemType.name.length != 0) {
            return (
                <div>
                    <div className={'col-sm-' + colVal}>
                        <DndInput
                            dataType={util.datatypes.special.CHART_ROW_COUNT}
                            label="Rows"
                            name="rowCount"
                            onChange={this.props.onChange}
                            value={chart.rowCount}
                            />
                    </div>
                    {this.renderExpandButton(chart)}
                    <div className={'col-sm-' + colVal}>
                        <DndInput
                            dataType={util.datatypes.special.CHART_COLUMN_COUNT}
                            label="Columns"
                            name="columnCount"
                            onChange={this.props.onChange}
                            value={chart.columnCount}
                            />
                    </div>
                </div>
            );
        }
        return null;
    }

    renderChartForm(chart, types) {
        //TODO: Every row has either textbox or picklist depending on create/select item.
        //TODO: Every Column Header has checkbox for select item type or type a column title
        //TODO: Every entry has either a picklist (for item ttpe) or textbox (for column title)
        if (chart.title && chart.title.length != 0) {
            return (
                <div>
                    <DndInput
                        label="Create new type"
                        name="isCreateNewItemType"
                        value={chart.isCreateNewItemType}
                        onChange={this.props.onChange}
                        dataType={util.datatypes.bool.BOOL}
                        />
                    {this.renderChartTypeInput(chart, types)}
                    {this.renderColumnRowCount(chart)}
                </div>
            );
        }
        return null;
    }
    
    renderExpandButton(chart) {
        if (!chart.isCreateNewItemType) {
            return (
                <div className="col-sm-2">
                    <DndButton
                        buttonType="fill"
                        dataType={util.datatypes.action.CHART.EXPAND_SELECTION}
                        onClick={this.props.onChange}
                        />
                </div>
            );
        }
        return null;
    }
    
    renderEditChart(chart, rowTypeItems, types) {
        if (chart && chart.rowCount != 0 && chart.columCount != 0) {
            return (
                <table>
                    <DndManageSelectionChartColumnHeader
                        chart={chart}
                        onChange={this.props.onChange}
                        picklists={this.props.picklists}
                        types={types}
                        />
                    <tbody>
                        {chart.rows.map(function(row, idx) {
                            return (
                                <DndManageSelectionChartRow
                                    key={idx}
                                    chart={chart}
                                    row={row}
                                    rowPicklist={rowTypeItems}
                                    picklists={this.props.picklists}
                                    onChange={this.props.onChange}
                                    />
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            );
        }
        return null;
    }
    
    render() {
        const chart = this.props.chart;
        const types = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.TYPE);
        const rowTypeItems = (chart.selectionItemType.id == 0) ? [] : util.common.picklists.getPicklistItems(this.props.picklists, chart.selectionItemType.id);
        
        return (
            <div>
                {this.renderChartForm(chart, types)}
                {this.renderEditChart(chart, rowTypeItems, types)}
            </div>
        );
    }
}

DndSelectionChartForm.propTypes = {
    chart: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array
};

export default DndSelectionChartForm;
