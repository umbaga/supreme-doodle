import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import util from '../../../util/util';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as backgroundActions from '../../../actions/admin/backgroundActions';

class BackgroundItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.editBackground = this.editBackground.bind(this);
        this.deleteBackground = this.deleteBackground.bind(this);
    }
    editBackground() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props.background.id);
        this.props.onEdit();
        this.setState({selectedId: this.props.background.id});
    }
    deleteBackground() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteBackground(this.props.background);
        }
    }
    render() {
        return (
            <tr key={this.props.background.id}>
                <td width="50"></td>
                <td>{this.props.background.name}</td>
                <td>
                    <DndListItemButtonBar
                        listItem={this.props.background}
                        onEdit={this.editBackground}
                        onDelete={this.deleteBackground} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {background: ownProps.background};
}

BackgroundItem.propTypes = {
    background: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(backgroundActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundItem);