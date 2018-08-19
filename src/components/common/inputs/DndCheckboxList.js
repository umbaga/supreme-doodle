import React from 'react';
import PropTypes from 'prop-types';
//import util from '../../../util/util';
import DndInput from './DndInput';

class DndCheckboxList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._renderLabel = this._renderLabel.bind(this);
        this.getCheckboxValue = this.getCheckboxValue.bind(this);
    }
    
    _renderLabel(item) {
        if (typeof this.props.displayPropertyFunction === 'function') {
            if (this.props.displayPropertyName && this.props.displayPropertyName.length != 0) {
                return this.props.displayPropertyFunction(item[this.props.displayPropertyName]);
            } else {
                return this.props.displayPropertyFunction(item);
            }
        } else {
            if (this.props.displayPropertyName && this.props.displayPropertyName.length != 0) {
                return item[this.props.displayPropertyName];
            } else {
                return item;
            }
        }
    }
    
    getCheckboxValue(val, item) {
        if (val && val.length != 0) {
            for (let q = 0; q < val.length; q++) {
                if (val[q].id == item.id) {
                    return true;
                }
            }
        }
        return false;
    }
    
    render() {
        const dataTask = (this.props.dataTask && this.props.dataTask.length != 0) ? this.props.dataTask : 'normal';
        return (
            <fragment>
                {this.props.referenceValue.map(function(item, idx) {
                    return (
                        <div key={idx} className="col-sm-4">
                            <DndInput
                                key={idx}
                                label={this._renderLabel(item)}
                                dataType={this.props.dataType}
                                value={this.getCheckboxValue(this.props.value, item)}
                                onChange={this.props.onChange}
                                dataTask={dataTask}
                                name={this.props.name + '_idx_' + idx.toString() + '_idx_' + item.id}
                                labelCols={9}
                                inputCols={3}
                                />
                        </div>
                    );
                }.bind(this))}
            </fragment>
        );
    }
}

DndCheckboxList.propTypes = {
    dataTask: PropTypes.string,
    dataType: PropTypes.string.isRequired,
    displayPropertyFunction: PropTypes.func,
    displayPropertyName: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeChild: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    referenceValue: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired
};

export default DndCheckboxList;