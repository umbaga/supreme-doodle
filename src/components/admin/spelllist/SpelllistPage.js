import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SpelllistList from './SpelllistList';
import SpelllistEntry from './SpelllistEntry';
import * as actions from '../../../actions/admin/spelllistActions';
//import util from '../../../util/util';
import DndButton from '../../common/buttons/DndButton';

class SpelllistPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            canEdit: true,
            isCreate: false,
            selectedId: 0,
            showModal: false,
            selectedLevel: -1,
            selectedSchoolId: 0
        };
        this.changeSelectedId = this.changeSelectedId.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onViewDetails = this.onViewDetails.bind(this);
    }

    componentWillMount() {
        if (!this.props.spelllists || (this.props.spelllists && this.props.spelllists.length == 0)) {
            this.props.actions.loadSpelllists();
        }
    }

    backToAdminHome() {
        browserHistory.push('/Home');
    }

    changeSelectedId(newId) {
        this.setState({selectedId: parseInt(newId)});
    }
    
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    onCreate() {
        this.changeSelectedId(0);
        this.open();
        this.setState({isCreate: true, selectedId: 0, canEdit: true});
    }

    onEdit() {
        this.setState({isCreate: false, canEdit: true});
    }
    
    onViewDetails() {
        this.setState({isCreate: false, canEdit: false});
    }
    
    render() {
        const spelllists = this.props.spelllists;
        const picklists = this.props.picklists;
        return (
            <div className="col-md-12">
                <div>
                    <table className="table table-sm table-striped table-hover tableBodyScroll">
                        <thead>
                            <tr>
                                <th width="50">
                                    <span><DndButton onClick={this.backToAdminHome} buttonType="back" /></span>
                                </th>
                                <th colSpan="2">
                                    <h2>Spelllists</h2>
                                </th>
                            </tr>
                            <tr>
                                <th width="50"></th>
                                <th>Name</th>
                                <th style={{paddingRight: '25px'}}>
                                    <div className="pull-right">
                                        <DndButton onClick={this.onCreate} buttonType="create" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <SpelllistList
                            spelllists={spelllists}
                            openModal={this.open}
                            selectedId={this.state.selectedId}
                            changeSelectedId={this.changeSelectedId}
                            onEdit={this.onEdit}
                            onViewDetails={this.onViewDetails}
                            selectedLevel={this.state.selectedLevel}
                            selectedSchoolId={this.state.selectedSchoolId}
                            />
                    </table>
                </div>
                <SpelllistEntry
                    closeModal={this.close}
                    openModal={this.open}
                    picklists={picklists}
                    isCreate={this.state.isCreate}
                    canEdit={this.state.canEdit}
                    selectedId={this.state.selectedId}
                    showModal={this.state.showModal}
                    onEdit={this.onEdit}
                    onViewDetails={this.onViewDetails}
                    />
            </div>
        );
    }
}

SpelllistPage.propTypes = {
    spelllists: PropTypes.array.isRequired,
    actions: PropTypes.object,
    children: PropTypes.object,
    picklists: PropTypes.array
};

function mapStateToProps(state) {
    let picklists = [];
    if (state.picklists.length > 0) {
        picklists = state.picklists;
    }
    if (state.spelllists.length > 0) {
        return {
            picklists: picklists,
            spelllists: state.spelllists
        };
    } else {
        return {
            picklists: picklists,
            spelllists: []
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(SpelllistPage);