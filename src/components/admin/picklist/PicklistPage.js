import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PicklistList from './PicklistList';
import PicklistEntry from './PicklistEntry';
import * as actions from '../../../actions/admin/picklistActions';
import DndButton from '../../common/buttons/DndButton';
import util from '../../../util/util';

class PicklistListPage extends React.Component {
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
        if (!this.props.picklists || (this.props.picklists && this.props.picklists.length == 0)) {
            this.props.actions.loadPicklists();
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
        const picklists = this.props.picklists.filter(function(pl) {
            return pl.id == util.itemtypes.TYPE.ITEM.DESCRIPTION_TYPE || pl.id == util.itemtypes.TYPE.ITEM.LINK_TYPE || pl.id == util.itemtypes.TYPE.ITEM.MECHANIC_TYPE;
        }).concat(this.props.picklists.filter(function(pl) {
            return pl.id != util.itemtypes.TYPE.ITEM.DESCRIPTION_TYPE && pl.id != util.itemtypes.TYPE.ITEM.LINK_TYPE && pl.id != util.itemtypes.TYPE.ITEM.MECHANIC_TYPE;
        }));
        return (
            <div className="col-md-12">
                <div>
                    <table className="table table-sm table-striped table-hover tableBodyScroll">
                        <thead>
                            <tr>
                                <th width="50">
                                    <span><DndButton onClick={this.backToAdminHome} buttonType="back" /></span>
                                </th>
                                <th colSpan="3">
                                    <h2>Picklists</h2>
                                </th>
                            </tr>
                            <tr>
                                <th width="50"></th>
                                <th>Name</th>
                                <th>Items</th>
                                <th style={{paddingRight: '25px'}}>
                                    <div className="pull-right">
                                        <DndButton onClick={this.onCreate} buttonType="create" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <PicklistList
                            picklists={picklists}
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
                <PicklistEntry
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

PicklistListPage.propTypes = {
    picklists: PropTypes.array.isRequired,
    actions: PropTypes.object,
    children: PropTypes.object,
    equipments: PropTypes.array,
    proficiencies: PropTypes.array
};

function mapStateToProps(state) {
    if (state.picklists.length > 0) {
        return {
            picklists: state.picklists
        };
    } else {
        return {
            picklists: []
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(PicklistListPage);