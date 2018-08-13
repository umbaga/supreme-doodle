import React from 'react';
import PropTypes from 'prop-types';
import util from '../../../util/util';
import DndInputWrapper from './DndInputWrapper';

class DndNestedCheckbox extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const finalDataTask = (this.props.dataTask) ? this.props.dataTask : false;
        let displayThisControl = null;
        if (this.props.children.constructor === Array) {
            if (this.props.children.length > 1) {
                if (this.props.value) {
                    this.props.children[0];
                } else {
                    this.props.children[1];
                }
            } else {
                this.props.children[0];
            }
        } else {
            displayThisControl = this.props.children;
        }
        return (
            <DndInputWrapper
                label={this.props.label}
                stackLabel={this.props.stackLabel}
                >
                <div className="input-group dnd-max-width">
                    <span className="input-group-addon">
                        <input
                            type="checkbox"
                            name={this.props.name}
                            ref={this.props.name}
                            value={this.props.value}
                            datatype={util.datatypes.BOOL}
                            onChange={this.props.onChange}
                            className="checkbox-inline"
                            data-task={finalDataTask}
                            />
                    </span>
                    {displayThisControl}
                </div>
            </DndInputWrapper>
        );
    }
}

DndNestedCheckbox.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    dataTask: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    stackLabel: PropTypes.bool,
    value: PropTypes.bool.isRequired
};

export default DndNestedCheckbox;