import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import util from '../../../util/util';
import DndListItemButtonBar from '../../common/buttons/DndListItemButtonBar';
import * as raceActions from '../../../actions/admin/raceActions';

class RaceItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedId: this.props.selectedId
        };
        this.editRace = this.editRace.bind(this);
        this.deleteRace = this.deleteRace.bind(this);
    }
    editRace() {
        event.preventDefault();
        this.props.openModal();
        this.props.changeSelectedId(this.props.race.id);
        this.props.onEdit();
        this.setState({selectedId: this.props.race.id});
    }
    deleteRace() {
        event.preventDefault();
        if (confirm('are you sure?')) {
            this.props.actions.deleteRace(this.props.race);
        }
    }
    render() {
        return (
            <tr key={this.props.race.id}>
                <td width="50"></td>
                <td>{this.props.race.name}</td>
                <td>
                    <DndListItemButtonBar
                        listItem={this.props.race}
                        onEdit={this.editRace}
                        onDelete={this.deleteRace} />
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {race: ownProps.race};
}

RaceItem.propTypes = {
    race: PropTypes.object.isRequired,
    actions: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(raceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceItem);