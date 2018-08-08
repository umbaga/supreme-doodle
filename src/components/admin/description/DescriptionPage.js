import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/admin/picklistActions';
import DndDataEntryButtonBar from '../../common/buttons/DndDataEntryButtonBar';
import DndButton from '../../common/buttons/DndButton';
import util from '../../../util/util';
import DndInput from '../../common/inputs/DndInput';

class DescriptionPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedPicklist: Object.assign({}, util.objectModel.PICKLIST),
            selectedItem: Object.assign({}, util.objectModel.ITEM)
        };
        this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.updatePicklistFormState = this.updatePicklistFormState.bind(this);
        this.updateItemFormState = this.updateItemFormState.bind(this);
        this.renderSelectItemInput = this.renderSelectItemInput.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    componentWillMount() {
        if (!this.props.picklists || (this.props.picklists && this.props.picklists.length == 0)) {
            this.props.actions.loadPicklists();
        }
    }

    backToAdminHome() {
        browserHistory.push('/Home');
    }
    
    renderDescriptionInput() {
        let description = (this.state.selectedItem.description && this.state.selectedItem.description.length != 0) ? this.state.selectedItem.description : '';
        return (this.state.selectedItem && this.state.selectedItem.id && this.state.selectedItem.id != 0) ? (
            <DndInput
                name="description"
                label="Description"
                value={description}
                dataType={util.datatypes.STRING.HTML.LONG}
                onChange={this.updateFormState}
                longStringHeight={560}
                notCollapsible
                />
        ) : null;
    }
    
    renderButtons() {
        return (this.state.selectedItem && this.state.selectedItem.id && this.state.selectedItem.id != 0) ? (
            <DndDataEntryButtonBar
                onSave={this.saveItem}
                />
        ) : null;
    }
    
    saveItem() {
        let newItem = Object.assign({}, util.objectModel.ITEM);
        this.setState({selectedItem: newItem});
        this.props.actions.updatePicklistItem(this.state.selectedItem);
    }
    
    updateFormState(event) {
        const newItem = util.common.formState.standard(event, this.state.selectedItem, this.props.picklists);
        return this.setState({selectedItem: newItem});
    }
    
    updatePicklistFormState(event) {
        const newSelectedPicklist = this.props.picklists.filter(function(picklist) {
            return event.target.value == picklist.id;
        })[0];
        if (newSelectedPicklist && newSelectedPicklist.length != 0) {
            return this.setState({selectedPicklist: newSelectedPicklist});
        }
    }
    
    updateItemFormState(event) {
        const newSelectedItem = this.state.selectedPicklist.items.filter(function(item) {
            return event.target.value == item.id;
        })[0];
        if (newSelectedItem && newSelectedItem.length != 0) {
            return this.setState({selectedItem: newSelectedItem});
        }
    }
    
    renderSelectItemInput() {
        return (this.state.selectedPicklist && this.state.selectedPicklist.id && this.state.selectedPicklist.id != 0) ? (
            <DndInput
                name="item"
                label="Item"
                dataType={util.datatypes.PICKLIST}
                value={this.state.selectedItem}
                onChange={this.updateItemFormState}
                picklist={this.state.selectedPicklist.items}
                />
        ) : null;
    }
    
    render() {
        const picklists = this.props.picklists;
        return (
            <div className="col-md-12">
                <div>
                    <table className="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th width="50">
                                    <span><DndButton onClick={this.backToAdminHome} buttonType="back" /></span>
                                </th>
                                <th>
                                    <h2>Item Type Descriptions</h2>
                                </th>
                            </tr>
                            <tr>
                                <th width="50"></th>
                                <th>
                                    <DndInput
                                        name="picklist"
                                        label="Item Type"
                                        dataType={util.datatypes.PICKLIST}
                                        value={this.state.selectedPicklist}
                                        onChange={this.updatePicklistFormState}
                                        picklist={picklists}
                                        />
                                </th>
                            </tr>
                            <tr>
                                <th width="50"></th>
                                <th>{this.renderSelectItemInput()}</th>
                            </tr>
                            <tr>
                                <td width="50"></td>
                                <td>{this.renderDescriptionInput()}</td>
                            </tr>
                            <tr>
                                <td width="50"></td>
                                <td>{this.renderButtons()}</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

DescriptionPage.propTypes = {
    picklists: PropTypes.array.isRequired,
    actions: PropTypes.object,
    children: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);