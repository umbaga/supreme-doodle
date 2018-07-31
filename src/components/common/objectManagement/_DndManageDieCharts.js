import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndButton from '../buttons/DndButton';
import DndInput from '../inputs/DndInput';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';
import DndManageDieChartEntry from '../subcomponents/charts/DndManageDieChartEntry';
import DndListItemButtonBar from '../buttons/DndListItemButtonBar';
import DndIncrementButtons from '../buttons/DndIncrementButtons';
import { Panel } from 'react-bootstrap';

class _DndManageDieCharts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showThisId: null
        };
        this.renderCharts = this.renderCharts.bind(this);
        this.renderManageChartEntries = this.renderManageChartEntries.bind(this);
        this.renderChartHeader = this.renderChartHeader.bind(this);
        this.setShowThisId = this.setShowThisId.bind(this);
    }
    
    setShowThisId(chart) {
        let newId = null;
        if (this.state.showThisId != chart.id) {
            newId = chart.id;
        }
        this.setState({showThisId: newId});
    }
    
    renderCharts(charts) {
        return charts && charts.length != 0 ? (
            <fieldset>
                <legend>Charts</legend>
                <table className="table table-sm table-striped table-hover">
                    <tbody>
                        {charts.map(function (c) {
                            let boundClick = this.setShowThisId.bind(this, c);
                            return (
                                <tr key={c.id}>
                                    <td>
                                        <DndButton
                                            buttonType={c.id == this.state.showThisId ? 'collapse' : 'expand'}
                                            onClick={boundClick}
                                            />
                                    </td>
                                    <td>
                                        {c.title}
                                        <Panel collapsible expanded={this.state.showThisId == c.id}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>{util.format.forDisplay.string.dieRoll(c.dieRoll, true)}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {c.entries.map(entry =>
                                                        <tr key={c.id + '-' + entry.id}>
                                                            <td>{util.format.forDisplay.string.dieRollValueRange(entry)}</td>
                                                            <td>{entry.description}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </Panel>
                                    </td>
                                    <td>
                                        <DndIncrementButtons
                                            item={c}
                                            items={charts}
                                            onMoveItem={this.props.onChangeChartOrder}
                                            />
                                    </td>
                                    <td>
                                        <DndListItemButtonBar
                                            listItem={c}
                                            onEdit={this.props.onSelectChart}
                                            onDelete={this.props.onRemoveChart}
                                            />
                                    </td>
                                </tr>
                            );
                        }.bind(this))}
                    </tbody>
                </table>
            </fieldset>
        ) : null;
    }
    renderChartHeader(chart) {
        return (
            <tr key={chart.id}>
                <td>
                    {chart.title}
                </td>
                <td>
                    <DndListItemButtonBar
                        listItem={chart}
                        onEdit={this.props.onSelectChart}
                        onDelete={this.props.onRemoveChart}
                        />
                </td>
            </tr>
        );
    }
    
    renderManageChartEntries(chart) {
        return chart && chart.title && chart.title.length && chart.dieRoll && util.datatypes.compareDataType(chart.dieRoll.rendered, util.datatypes.special.DICE_ROLL) ? (
            <div>
                <div>
                    <DndButton
                        buttonType="fill"
                        onClick={this.props.onClickExpand}
                        />
                </div>
                <div>
                    {chart.entries.map(entry =>
                                       <DndManageDieChartEntry
                                           key={entry.id}
                                           chart={chart}
                                           entry={entry}
                                           onChangeChart={this.props.onChangeChart}
                                           onRemoveEntry={this.props.onRemoveEntry}
                                           />
                                      )}
                </div>
            </div>
        ) : null;
    }
    /*
                <table>
                    <tbody>
                        {chart.entries.map(entry =>
                            <DndManageDieChartEntry
                                key={entry.id}
                                chart={chart}
                                entry={entry}
                                onChangeChart={this.props.onChangeChart}
                                onRemoveEntry={this.props.onRemoveEntry}
                                />
                        )}
                    </tbody>
                </table>*/
    render() {
        const charts = this.props.charts;
        const chart = this.props.chart;
        return (
            <div>
                <fieldset>
                    <legend>New Chart</legend>
                    <div className="col-md-6">
                        <DndInput
                            name="title"
                            label="Title"
                            dataType={util.datatypes.string.STRING}
                            value={chart.title}
                            onChange={this.props.onChangeChart}
                            />
                    </div>
                    <div className="col-md-6">
                        <DndInput
                            name="dieRoll"
                            label="Die Roll"
                            dataType={util.datatypes.special.DICE_ROLL}
                            value={chart.dieRoll}
                            onChange={this.props.onChangeChart}
                            />
                    </div>
                    <div className="col-md-12">
                        <DndInput
                            name="description"
                            label="Description"
                            dataType={util.datatypes.string.DESCRIPTION}
                            value={chart.description}
                            onChange={this.props.onChangeChart}
                            />
                    </div>
                    {this.renderManageChartEntries(chart)}
                    <div>
                        <DndDataEntryButtonBar
                            onReset={this.props.onResetChart}
                            onSave={this.props.onAddChart}
                            />
                    </div>
                </fieldset>
                {this.renderCharts(charts)}
            </div>
        );
    }
}

_DndManageDieCharts.propTypes = {
    charts: PropTypes.array.isRequired,
    chart: PropTypes.object.isRequired,
    onAddChart: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChart: PropTypes.func.isRequired,
    onRemoveChart: PropTypes.func.isRequired,
    onResetChart: PropTypes.func.isRequired,
    onSelectChart: PropTypes.func.isRequired,
    onRemoveEntry: PropTypes.func.isRequired,
    onChangeChartOrder: PropTypes.func.isRequired,
    onClickExpand: PropTypes.func.isRequired
};

export default _DndManageDieCharts;
