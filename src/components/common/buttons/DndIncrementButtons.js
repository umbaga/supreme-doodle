import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';

class DndIncrementButtons extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._moveItem = this._moveItem.bind(this);
    }
    
    _moveItem(event) {
        this.props.onMoveItem(event, this.props.item, true);
    }
    
    render() {
        let wrapperClass = 'input-group {line-height: 10px}';
        const downDisabled = this.props.item.orderIndex == this.props.items.length - 1;
        const upDisabled = this.props.item.orderIndex == 0;
        let name = (this.props.name && this.props.name.length != 0) ? this.props.name : this.props.dataType;
        let dataTask = (this.props.dataTask && this.props.dataTask.length != 0) ? this.props.dataTask : 'normal';
        let itemIndex = (this.props.itemIndex || this.props.itemIndex == 0) ? this.props.itemIndex : -1;
        return (
            <div className={wrapperClass}>
                <ButtonGroup className="btn-group-vertical">
                    <Button bsStyle="default" onClick={this._moveItem} value={itemIndex} className="button-increment" disabled={upDisabled} datatype={this.props.moveItemUpAction} name={name} data-task={dataTask}>
                        <i className="fa fa-caret-up"></i>
                    </Button>
                    <Button bsStyle="default" onClick={this._moveItem} value={itemIndex} className="button-increment" disabled={downDisabled} datatype={this.props.moveItemDownAction} name={name} data-task={dataTask}>
                        <i className="fa fa-caret-down"></i>
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

DndIncrementButtons.propTypes = {
    dataTask: PropTypes.string,
    dataType: PropTypes.string,
    downIcon: PropTypes.string,
    item: PropTypes.object.isRequired,
    itemIndex: PropTypes.number,
    items: PropTypes.array.isRequired,
    moveItemDownAction: PropTypes.string,
    moveItemUpAction: PropTypes.string,
    name: PropTypes.string,
    onMoveItem: PropTypes.func.isRequired,
    upIcon: PropTypes.string
};

export default DndIncrementButtons;
