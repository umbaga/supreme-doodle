import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EquipmentList from './EquipmentList';
import EquipmentEntry from './EquipmentEntry';
import * as actions from '../../../actions/admin/equipmentActions';
import util from '../../../util/util';
import DndButton from '../../common/buttons/DndButton';
import DndInput from '../../common/inputs/DndInput';

class EquipmentPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            canEdit: true,
            isCreate: false,
            selectedId: 0,
            showModal: false,
            selectedLevel: -1,
            selectedSchoolId: 0,
            selectedCategory: Object.assign({}, util.objectModel.ITEM)
        };
        this.changeSelectedId = this.changeSelectedId.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onViewDetails = this.onViewDetails.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.renderHeaderRow = this.renderHeaderRow.bind(this);
    }

    componentWillMount() {
        if (!this.props.equipments || (this.props.equipments && this.props.equipments.length == 0)) {
            this.props.actions.loadEquipments();
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
    
    onChangeCategory(event) {
        let selectedCategory = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.EQUIPMENT_CATEGORY).filter(function(cat) {
            return event.target.value == cat.id;
        });
        if (selectedCategory.length == 0) {
            selectedCategory = {id: 0};
        } else {
            selectedCategory = selectedCategory[0];
        }
        return this.setState({selectedCategory: selectedCategory});
    }
    
    renderHeaderRow() {
        let buttonCell = (
            <th style={{paddingRight: '25px'}}>
                <div className="pull-right">
                    <DndButton onClick={this.onCreate} buttonType="create" />
                </div>
            </th>
        );
        let costCell = (<th className="text-center">Cost</th>);
        let weightCell = (<th className="text-center">Weight</th>);
        let speedCell = null;
        let carryCapacityCell = null;
        let armorClassCell = null;
        let strengthCell = null;
        let stealthCell = null;
        let damageCell = null;
        let propertiesCell = null;
        
        if (this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT
           || this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WATER_VEHICLE) {
            weightCell = null;
            speedCell = (<th className="text-center">Speed</th>);
        }
        if (this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
            carryCapacityCell = (<th>Carry Capacity</th>);
        }
        if (this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
            armorClassCell = (<th>Armor Class (AC)</th>);
            strengthCell = (<th className="text-center">Strength</th>);
            stealthCell = (<th className="text-center">Stealth</th>);
        }
        if (this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
            damageCell = (<th className="text-center">Damage</th>);
            propertiesCell = (<th>Properties</th>);
        }
        return (
            <tr>
                <th width="50"></th>
                <th>Name</th>
                {costCell}
                {armorClassCell}
                {strengthCell}
                {stealthCell}
                {damageCell}
                {weightCell}
                {propertiesCell}
                {speedCell}
                {carryCapacityCell}
                {buttonCell}
            </tr>
        );
    }
    
    render() {
        const equipments = this.props.equipments;
        const picklists = this.props.picklists;
        const selectedCategory = this.state.selectedCategory;
        const categories = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.EQUIPMENT_CATEGORY);
        let displayEquipments = (selectedCategory.id == 0) ? equipments : equipments.filter(function(equipment) {
            return selectedCategory.id == equipment.category.id;
        });
        let colSpan = 2;
        if (this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.ARMOR) {
            colSpan = 5;
        } else if (this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.WEAPON) {
            colSpan = 4;
        } else if (this.state.selectedCategory.id == util.itemtypes.TYPE.EQUIPMENT_CATEGORY.MOUNT) {
            colSpan = 3;
        }
        return (
            <div className="col-md-12">
                <div>
                    <table className="table table-sm table-striped table-hover tableBodyScroll">
                        <thead>
                            <tr>
                                <th width="50">
                                    <span><DndButton onClick={this.backToAdminHome} buttonType="back" /></span>
                                </th>
                                <th colSpan={colSpan}>
                                    <h2>Equipments</h2>
                                </th>
                                <th colSpan="2">
                                    <DndInput
                                        name="category"
                                        label="Category"
                                        dataType={util.datatypes.PICKLIST}
                                        value={this.state.selectedCategory}
                                        onChange={this.onChangeCategory}
                                        picklist={categories}
                                        placeholder="All Categories"
                                        hideLabel
                                        />
                                </th>
                            </tr>
                            {this.renderHeaderRow()}
                        </thead>
                        <EquipmentList
                            equipments={displayEquipments}
                            openModal={this.open}
                            selectedId={this.state.selectedId}
                            changeSelectedId={this.changeSelectedId}
                            onEdit={this.onEdit}
                            onViewDetails={this.onViewDetails}
                            selectedCategory={this.state.selectedCategory}
                            picklists={picklists}
                            />
                    </table>
                </div>
                <EquipmentEntry
                    closeModal={this.close}
                    openModal={this.open}
                    picklists={picklists}
                    isCreate={this.state.isCreate}
                    canEdit={this.state.canEdit}
                    selectedId={this.state.selectedId}
                    showModal={this.state.showModal}
                    onEdit={this.onEdit}
                    onViewDetails={this.onViewDetails}
                    selectedCategory={selectedCategory}
                    />
            </div>
        );
    }
}

EquipmentPage.propTypes = {
    equipments: PropTypes.array.isRequired,
    actions: PropTypes.object,
    children: PropTypes.object,
    picklists: PropTypes.array
};

function mapStateToProps(state) {
    let picklists = [];
    if (state.picklists.length > 0) {
        picklists = state.picklists;
    }
    if (state.equipments.length > 0) {
        return {
            picklists: picklists,
            equipments: state.equipments
        };
    } else {
        return {
            picklists: picklists,
            equipments: []
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage);