import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../../../util/util';
import DndInput from '../../../inputs/DndInput';

class DndStandardChartForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderEditChart = this.renderEditChart.bind(this);
    }
    
    renderEditChart(chart) {
        let renderThis = false;
        if (this.props.chart.columnCount > 0 && this.props.chart.rowCount > 0) {
            renderThis = true;
        }
        return renderThis ? (
            <table className="table table-sm table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        {chart.columns.map(column =>
                            <th
                                name={util.datatypes.special.CHART_COLUMN_TITLE}
                                datatype={util.datatypes.special.CHART_COLUMN_TITLE}
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
                            name={util.datatypes.special.CHART_ROW_TITLE}
                            datatype={util.datatypes.special.CHART_ROW_TITLE}
                            contentEditable
                            onBlur={this.props.onChange}
                        id={row.id + '_rows_title'}>
                            {row.title}
                        </th>
                        {chart.entries.filter(function(entry) {
                            return row.id == -1 * (entry.rowIndex + 1);
                        }).map(entry =>
                            <td
                                name={util.datatypes.special.CHART_ENTRY_DESCRIPTION}
                                datatype={util.datatypes.special.CHART_ENTRY_DESCRIPTION}
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
        ) : null;
    }
    
    render() {
        const chart = this.props.chart;
        return (
            <div>
                <div className="col-sm-6">
                    <DndInput
                        dataType={util.datatypes.special.CHART_ROW_COUNT}
                        label="Rows"
                        name="rowCount"
                        onChange={this.props.onChange}
                        value={chart.rowCount}
                        />
                </div>
                <div className="col-sm-6">
                    <DndInput
                        dataType={util.datatypes.special.CHART_COLUMN_COUNT}
                        label="Columns"
                        name="columnCount"
                        onChange={this.props.onChange}
                        value={chart.columnCount}
                        />
                </div>
                {this.renderEditChart(chart)}
            </div>
        );
    }
}

DndStandardChartForm.propTypes = {
    chart: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DndStandardChartForm;
