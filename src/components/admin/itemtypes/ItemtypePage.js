import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ItemtypeList from './ItemtypeList';
import ItemtypeEntry from './ItemtypeEntry';
import * as actions from '../../../actions/admin/itemtypeActions';
import DndButton from '../../common/buttons/DndButton';

class ItemtypePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            canEdit: true,
            isCreate: false,
            selectedId: 0,
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.changeSelectedId = this.changeSelectedId.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    componentWillMount() {
        if (this.props.itemtypes && this.props.itemtypes.length != 0 && this.props.itemtypes[0].id == '') {
            this.props.actions.loadItemtypes();
        }
    }

    backToAdminHome() {
        browserHistory.push('/Home');
    }

    onCreate() {
        this.changeSelectedId(0);
        this.open();
        this.setState({isCreate: true, selectedId: 0, canEdit: true});
    }

    onEdit() {
        this.setState({isCreate: false, canEdit: true});
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    changeSelectedId(newId) {
        this.setState({selectedId: parseInt(newId)});
    }

    renderList() {
        return this.props.itemtypes && this.props.itemtypes.length != 0 ? (
            <ItemtypeList
                itemtypes={this.props.itemtypes}
                openModal={this.open}
                selectedId={this.state.selectedId}
                changeSelectedId={this.changeSelectedId}
                onEdit={this.onEdit}
                />
        ) : null;
    }
    
    render() {
        const itemtypes = this.props.itemtypes;
        console.log(itemtypes);
        return (
            <div className="col-md-12">
                <div>
                    <table className="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th colSpan="3">
                                    <h2><span><DndButton onClick={this.backToAdminHome} buttonType="back" /></span>Itemtypes</h2>
                                </th>
                            </tr>
                            <tr>
                                <th></th>
                                <th className="text-center">isPicklist</th>
                                <th className="text-center">applySupplementalPicklist</th>
                                <th>
                                    <div className="pull-right">
                                        <DndButton onClick={this.onCreate} buttonType="create" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {this.renderList()}
                    </table>
                </div>
                <ItemtypeEntry
                    closeModal={this.close}
                    openModal={this.open}
                    itemtypes={itemtypes}
                    isCreate={this.state.isCreate}
                    canEdit={this.state.canEdit}
                    selectedId={this.state.selectedId}
                    showModal={this.state.showModal}
                    onEdit={this.onEdit}
                    />
            </div>
        );
    }
}

ItemtypePage.propTypes = {
    itemtypes: PropTypes.array.isRequired,
    children: PropTypes.object,
    actions: PropTypes.object
};

function mapStateToProps(state) {
    if (state.itemtypes.length > 0) {
        return {
            itemtypes: state.itemtypes
        };
    } else {
        return {
            itemtypes: []
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemtypePage);