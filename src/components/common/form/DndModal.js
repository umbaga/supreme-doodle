import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import DndDataEntryButtonBar from '../buttons/DndDataEntryButtonBar';

class DndModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let actionText = '';
        if (this.props.canEdit) {
            if (this.props.isCreate) {
                actionText = 'Create';
            } else {
                actionText = 'Edit';
            }
        } else {
            actionText = 'View';
        }
        if (this.props.size && this.props.size.length != 0) {
            return (
                <Modal show={this.props.showModal} onHide={this.props.closeModal} bsSize={this.props.size}>
                    <Modal.Header closeButton>
                        <h4>{actionText} {this.props.headingCaption}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="clearfix">
                            {this.props.children}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <DndDataEntryButtonBar
                            onSave={this.props.onSave}
                            onSaveNew={this.props.onSaveNew}
                            onCancel={this.props.onCancel}
                            onDelete={this.props.onDelete}
                            isCreate={this.props.isCreate}
                            />
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return (
                <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <h4>{actionText} {this.props.headingCaption}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="clearfix">
                            {this.props.children}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <DndDataEntryButtonBar
                            onSave={this.props.onSave}
                            onSaveNew={this.props.onSaveNew}
                            onCancel={this.props.onCancel}
                            onDelete={this.props.onDelete}
                            isCreate={this.props.isCreate} />
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}

DndModal.propTypes = {
    headingCaption: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    isCreate: PropTypes.bool,
    showModal: PropTypes.bool.isRequired,
    children: PropTypes.object,
    canEdit: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveNew: PropTypes.func.isRequired,
    size: PropTypes.string
};

export default DndModal;
