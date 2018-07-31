import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInputWrapper from '../inputs/DndInputWrapper';
import DndInput from '../inputs/DndInput';

class DndManageTextBoxList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const finalArray = util.common.picklists.getPicklistItems(this.props.picklists, this.props.arrayType);
        const numberStepValue = (this.props.stepIncrement) ? this.props.stepIncrement : 5;
        return (
            <DndInputWrapper
                label="Movement"
                dataType={util.datatypes.array.MOVEMENTS}
                inputCols={9}
                labelCols={3}
                >
                <div>
                    {finalArray.map(function(arrayItem, idx) {
                        let item = this.props.primaryArray.filter(function(itm) {
                            return itm.id == arrayItem.id;
                        });
                        let itemValue = (item.length != 0) ? item[0][this.props.textValueFieldName] : 0;
                        return (
                            <div className="col-sm-6" key={idx.toString()}>
                                <DndInput
                                    key={idx.toString()}
                                    name={this.props.name + '_' + arrayItem.id.toString()}
                                    label={arrayItem.name}
                                    value={itemValue}
                                    dataType={this.props.dataType}
                                    onChange={this.props.onChange}
                                    numberStepVal={numberStepValue}
                                    labelCols={6}
                                    />
                            </div>
                        );
                    }.bind(this))}
                </div>
            </DndInputWrapper>
        );
    }
}

DndManageTextBoxList.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    picklists: PropTypes.array.isRequired,
    primaryArray: PropTypes.array.isRequired,
    arrayType: PropTypes.number.isRequired,
    textValueFieldName: PropTypes.string.isRequired,
    stepIncrement: PropTypes.number,
    dataType: PropTypes.string.isRequired
};

export default DndManageTextBoxList;