import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndCollapsibleTableRow from '../subcomponents/DndCollapsibleTableRow';

class _DndManageCharts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showThisId: null
        };
        this.renderEditChart = this.renderEditChart.bind(this);
        this.renderChartList = this.renderChartList.bind(this);
        this.setShowThisId = this.setShowThisId.bind(this);
    }
    
    renderEditChart() {
        let renderThis = false;
        const chart = this.props.chart;
        if (this.props.chart.columnCount > 0 && this.props.chart.rowCount > 0) {
            renderThis = true;
        }
        return renderThis ? (
            <div className="col-sm-12">
                <DndInput
                    name="title"
                    label="Title"
                    value={chart.title}
                    dataType={util.datatypes.string.STRING}
                    onChange={this.props.onChange}
                    />
                <table className="table table-sm table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            {chart.columns.map(column =>
                                <th
                                    contentEditable
                                    onBlur={this.props.onChange}
                                    key={column.id}
                                    id={column.id + '_columns_title'}>
                                                   {column.title}
                                               </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {chart.rows.map(row =>
                        <tr
                            key={row.id}>
                            <th
                                    contentEditable
                                    onBlur={this.props.onChange}
                            id={row.id + '_rows_title'}>
                                {row.title}
                            </th>
                            {chart.entries.filter(function(entry) {
                                return row.id == -1 * (entry.rowIndex + 1);
                            }).map(entry =>
                                <td
                                    contentEditable
                                    onBlur={this.props.onChange}
                                    id={entry.id + '_entries_description'}
                                    key={entry.id}>
                                       {entry.description}
                                </td>
                            )}
                        </tr>)}
                    </tbody>
                </table>
                <DndInput
                    name="description"
                    label="Description"
                    value={chart.description}
                    dataType={util.datatypes.string.DESCRIPTION}
                    onChange={this.props.onChange}
                    />
            </div>
        ) : null;
    }
    
    setShowThisId(chart) {
        let newId = null;
        if (this.state.showThisId != chart.id) {
            newId = chart.id;
        }
        this.setState({showThisId: newId});
    }
    
    renderChartRows(chart) {
        return (
            <tbody>
                {chart.rows.map(row =>
                           <tr key={row.id}>
                                <th>{row.title}</th>
                                {chart.entries.filter(function(entry) {
                                    return row.rowIndex == entry.rowIndex;
                                }).map(entry =>
                                    <td key={entry.id}>{entry.description}</td>
                                )}
                            </tr>
                           )}
            </tbody>
        );
    }
    
    renderChartList(charts) {
        if (charts && charts.length) {
            return (
                <fieldset>
                    <legend>Charts</legend>
                    <table className="table table-sm table-striped table-hover">
                        <tbody>
                            {charts.map(function(c) {
                                let boundClick = this.setShowThisId.bind(this, c);
                                return (
                                    <DndCollapsibleTableRow
                                        key={c.id}
                                        item={c}
                                        items={charts}
                                        onChangeOrder={this.props.onChangeChartOrder}
                                        onSelectItem={this.props.onSelectChart}
                                        onRemoveItem={this.props.onRemoveChart}
                                        boundClick={boundClick}
                                        showThisId={this.state.showThisId}
                                        >
                                        <thead>
                                            <tr>
                                                <th></th>
                                                {c.columns.map(column =>
                                                              <th key={column.id}>{column.title}</th>
                                                              )}
                                            </tr>
                                        </thead>
                                        {this.renderChartRows(c)}
                                    </DndCollapsibleTableRow>
                                );
                            }.bind(this))}
                        </tbody>
                    </table>
                </fieldset>
            );
        } else {
            return null;
        }
    }
    
    render() {
        const charts = this.props.charts;
        const chart = this.props.chart;
        return (
            <div>
                <div>
                    <div className="col-sm-6">
                        <DndInput
                            dataType={util.datatypes.number.INT}
                            name="columnCount"
                            label="Coulmns"
                            value={chart.columnCount}
                            onChange={this.props.onChange}
                            />
                    </div>
                    <div className="col-sm-6">
                        <DndInput
                            dataType={util.datatypes.number.INT}
                            name="rowCount"
                            label="Rows"
                            value={chart.rowCount}
                            onChange={this.props.onChange}
                            />
                    </div>
                    {this.renderEditChart()}
                    <DndDataEntryButtonBar
                        onCancel={this.props.onResetChart}
                        onSave={this.props.onAddChart}
                        />
                </div>
                <div>
                    {this.renderChartList(charts)}
                </div>
            </div>
        );
    }
}

_DndManageCharts.propTypes = {
    charts: PropTypes.array.isRequired,
    chart: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChartOrder: PropTypes.func.isRequired,
    onAddChart: PropTypes.func.isRequired,
    onAddColumn: PropTypes.func.isRequired,
    onAddRow: PropTypes.func.isRequired,
    onCreateChart: PropTypes.func.isRequired,
    onRemoveChart: PropTypes.func.isRequired,
    onRemoveColumn: PropTypes.func.isRequired,
    onRemoveRow: PropTypes.func.isRequired,
    onSelectChart: PropTypes.func.isRequired,
    onResetChart: PropTypes.func.isRequired
};

export default _DndManageCharts;
