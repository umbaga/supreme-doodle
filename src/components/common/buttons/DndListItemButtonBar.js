import React from 'react';
import PropTypes from 'prop-types';
import DndButton from './DndButton';
import { ButtonGroup, Popover, OverlayTrigger } from 'react-bootstrap';

class DndListItemButtonBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onEdit = this._onEdit.bind(this);
        this._onDelete = this._onDelete.bind(this);
        this._hidePopover = this._hidePopover.bind(this);
        this._onViewDetails = this._onViewDetails.bind(this);
    }

    _onEdit(event) {
        this._hidePopover();
        if (this.props.returnCompleteObject) {
            this.props.onEdit(event, this.props.listItem);
        } else {
            this.props.onEdit(this.props.listItem.id);
        }
    }

    _onDelete(event) {
        this._hidePopover();
        if (this.props.returnCompleteObject) {
            this.props.onDelete(event, this.props.listItem);
        } else {
            this.props.onDelete(this.props.listItem.id);
        }
    }
    
    _hidePopover() {
        this.refs.buttonPopover.hide();
    }
    
    _onViewDetails() {
        this._hidePopover();
        if (this.props.returnCompleteObject) {
            this.props.onViewDetails(event, this.props.listItem);
        } else {
            this.props.onViewDetails(this.props.listItem.id);
        }
    }

    render() {
        let wrapperClass = 'form-group';
        let deleteButton = null;
        let name = (this.props.name && this.props.name.length != 0) ? this.props.name : this.props.dataType;
        if (this.props.hideDeleteButton) {
            deleteButton = null;
        } else {
            deleteButton = (<DndButton onClick={this._onDelete} buttonType="delete" dataType={this.props.deleteAction} name={name}/>);
        }
        let detailsButton = null;
        if (this.props.showDetailsButton) {
            detailsButton = (<DndButton onClick={this._onViewDetails} buttonType="view" />);
        } else {
            detailsButton = null;
        }
        const popoverButtons = (
            <Popover id="options-popover">
                <ButtonGroup>
                    {deleteButton}
                    {detailsButton}
                    <DndButton onClick={this._onEdit} buttonType="edit" dataType={this.props.editAction} name={name}/>
                </ButtonGroup>
            </Popover>
        );
        return (
            <div className={wrapperClass}>
                <div className="pull-right">
                    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverButtons} ref="buttonPopover">
                        <DndButton buttonType="hamburger" />
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}

DndListItemButtonBar.propTypes = {
    dataType: PropTypes.string,
    deleteAction: PropTypes.string,
    editAction: PropTypes.string,
    hideDeleteButton: PropTypes.bool,
    listItem: PropTypes.object.isRequired,
    name: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func,
    returnCompleteObject: PropTypes.bool,
    showDetailsButton: PropTypes.bool
};

export default DndListItemButtonBar;
