import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import util from '../../../util/util';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as picklistActions from '../../../actions/admin/picklistActions';

class PicklistItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.editPicklist = this.editPicklist.bind(this);
        this.deletePicklist = this.deletePicklist.bind(this);
    }
    editPicklist() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props.picklist.id);
        this.props.onEdit();
        this.setState({selectedId: this.props.picklist.id});
    }
    deletePicklist() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deletePicklist(this.props.picklist);
        }
    }
    render() {
        return (
            <tr key={this.props.picklist.id}>
                <td>{this.props.picklist.name}</td>
                <td>
                    <DndListItemButtonBar
                        listItem={this.props.picklist}
                        onEdit={this.editPicklist}
                        onDelete={this.deletePicklist} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {picklist: ownProps.picklist};
}

PicklistItem.propTypes = {
    picklist: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(picklistActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PicklistItem);