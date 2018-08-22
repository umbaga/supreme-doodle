import React from 'react';
import PropTypes from 'prop-types';
import DndInput from '../DndInput';
import DndNestedCheckbox from '../DndNestedCheckbox';
import DndList from '../DndList';
import DndChart from '../DndChart';
import DndFieldset from '../../form/DndFieldset';
import util from '../../../../util/util';

class DndManageCharts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderDescription = this.renderDescription.bind(this);
        this.renderColumnsAndRows = this.renderColumnsAndRows.bind(this);
        this.renderRowDeterminationInput = this.renderRowDeterminationInput.bind(this);
    }
    
    renderTitle(chart) {
        return (chart.type.id != 0) ? (
            <div className="col-md-6">
                <DndInput
                    name="title"
                    label="Title"
                    dataType={util.datatypes.STRING.SHORT}
                    onChange={this.props.onChangeChild}
                    dataTask="chart"
                    value={chart.title}
                    stackLabel
                    />
            </div>
        ) : '';
    }
    
    renderDescription(chart) {
        return (chart.type.id != 0) ? (
            <div className="col-md-12">
                <DndInput
                    name="description"
                    label="Description"
                    dataType={util.datatypes.STRING.HTML.LONG}
                    onChange={this.props.onChangeChild}
                    dataTask="chart"
                    value={chart.description}
                    stackLabel
                    notCollapsible
                    longStringHeight={185}
                    />
            </div>
        ) : '';
    }
    
    renderColumnsAndRows(chart, picklistTypes) {
        return (chart.type.id != 0) ? (
            <fragment>
                {this.renderRowDeterminationInput(chart, picklistTypes)}
                <div className="col-md-6">
                    <DndInput
                        name="rowCount"
                        label="Rows"
                        dataType={util.datatypes.SPECIAL.CHART.ROW.COUNT}
                        onChange={this.props.onChangeChild}
                        dataTask="chart"
                        value={chart.rowCount}
                        isReadOnly={chart.type.id == util.itemtypes.TYPE.CHART.DICE}
                        stackLabel
                        />
                </div>
                <div className="col-md-6">
                    <DndInput
                        name="columnCount"
                        label="Columns"
                        dataType={util.datatypes.SPECIAL.CHART.COLUMN.COUNT}
                        onChange={this.props.onChangeChild}
                        dataTask="chart"
                        value={chart.columnCount}
                        stackLabel
                        />
                </div>
            </fragment>
        ) : '';
    }
    
    renderRowDeterminationInput(chart, picklistTypes) {
        let retVal = null;
        if (chart.type.id == util.itemtypes.TYPE.CHART.DICE) {
            retVal = (
                <div className="col-md-12">
                    <DndInput
                        name="dice"
                        label="Dice"
                        dataType={util.datatypes.SPECIAL.DICE}
                        onChange={this.props.onChangeChild}
                        dataTask="chart"
                        value={chart.dice}
                        buttonType="fill"
                        buttonDatatype={util.datatypes.ACTION.CHART}
                        buttonOverwriteAction="EXPAND"
                        buttonOnClick={this.props.onChangeChild}
                        buttonDisabled={!util.datatypes.compareDataType(chart.dice.rendered, util.datatypes.SPECIAL.DICE, [0, 1, 2])}
                        stackLabel
                        />
                </div>
            );
        } else if (chart.type.id == util.itemtypes.TYPE.CHART.SELECT) {
            let whichControl = (chart.isNewType) ? (
                <DndInput
                    name="picklist"
                    label="Type"
                    dataType={util.datatypes.STRING.SHORT}
                    onChange={this.props.onChangeChild}
                    dataTask="chart"
                    value={chart.picklist.name}
                    placeholder="New Type Name"
                    hideLabel
                    />
            ) : (
                <DndInput
                    name="picklist"
                    label="Type"
                    dataType={util.datatypes.PICKLIST}
                    onChange={this.props.onChangeChild}
                    dataTask="chart"
                    value={chart.picklist}
                    picklist={picklistTypes}
                    buttonType="fill"
                    buttonDatatype={util.datatypes.ACTION.CHART}
                    buttonOverwriteAction="EXPAND"
                    buttonOnClick={this.props.onChangeChild}
                    buttonDisabled={chart.picklist.id == 0}
                    hideLabel
                    />
            );
            retVal = (
                <div className="col-md-12">
                    <DndNestedCheckbox
                        value={chart.isNewType}
                        label="(Is New) Item Type"
                        stackLabel
                        onChange={this.props.onChangeChild}
                        name="isNewType"
                        dataTask="chart"
                        >
                        {whichControl}
                    </DndNestedCheckbox>
                </div>
            );
        }
        return retVal;
    }
        
    render() {
        const chart = this.props.editChart;
        const charts = this.props.value.sort(function(a, b) {
            return a.orderIndex - b.orderIndex;
        });
        const picklists = this.props.picklists;
        const chartTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.CHART);
        const picklistTypes = util.common.picklists.getPicklistItems(picklists, util.itemtypes.TYPE.ITEM.PICKLIST);
        let finalChart = (util.validation.isReadyToShow.chart(chart)) ? (
            <div className="col-md-12">
                <DndChart
                    onSave={this.props.onChange}
                    onChange={this.props.onChange}
                    onChangeChild={this.props.onChangeChild}
                    picklists={picklists}
                    value={chart}
                    />
            </div>
        ) : null;
        return (
            <fragment>
                <DndFieldset
                    legend="New Chart Entry"
                    collapsible
                    startCollapsed={charts.length != 0}
                    >
                    <div className="col-md-12">
                        <div className="col-md-6">
                            <div className="col-md-6">
                                <DndInput
                                    name="type"
                                    label="Type (Row Definition)"
                                    dataType={util.datatypes.PICKLIST}
                                    onChange={this.props.onChangeChild}
                                    dataTask="chart"
                                    picklist={chartTypes}
                                    value={chart.type}
                                    stackLabel
                                    />
                            </div>
                            {this.renderTitle(chart)}
                            {this.renderColumnsAndRows(chart, picklistTypes)}
                        </div>
                        <div className="col-md-6">
                            {this.renderDescription(chart)}
                        </div>
                    </div>
                    {finalChart}
                </DndFieldset>
                <DndFieldset
                    legend="Exisitng Charts"
                    collapsible
                    startCollapsed={charts.length == 0}
                    >
                    <DndList
                        name="charts"
                        value={charts}
                        dataTask="chart"
                        dataType={util.datatypes.ACTION.CHART}
                        childName="title"
                        onChange={this.props.onChange}
                        onChangeChild={this.props.onChangeChild}
                        isCollapsible
                        childObjectKeys={['displayObject']}
                        childObjectValues={['value']}
                        isOrdering
                        />
                </DndFieldset>
            </fragment>
        );
    }
}

DndManageCharts.propTypes = {
    editChart: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired
};

export default DndManageCharts;