import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SpellList from './SpellList';
import SpellEntry from './SpellEntry';
import * as actions from '../../../actions/admin/spellActions';
import util from '../../../util/util';
import DndButton from '../../common/buttons/DndButton';
import DndInput from '../../common/inputs/DndInput';

class SpellPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            canEdit: true,
            isCreate: false,
            selectedId: 0,
            showModal: false,
            selectedSpellLevel: {id: -1},
            selectedSchool: {id: 0}
        };
        this.changeSelectedId = this.changeSelectedId.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onViewDetails = this.onViewDetails.bind(this);
        this.changeSelectedSchool = this.changeSelectedSchool.bind(this);
        this.changeSelectedSpellLevel = this.changeSelectedSpellLevel.bind(this);
    }

    componentWillMount() {
        if (!this.props.spells || (this.props.spells && this.props.spells.length == 0)) {
            this.props.actions.loadSpells();
        }
    }

    backToAdminHome() {
        browserHistory.push('/Home');
    }

    changeSelectedId(newId) {
        this.setState({selectedId: parseInt(newId)});
    }
    
    changeSelectedSchool(newVal) {
        this.setState({selectedSchool: parseInt(newVal.target.value)});
    }
    
    changeSelectedSpellLevel(newVal) {
        this.setState({selectedSpellLevel: parseInt(newVal.target.value)});
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
        const spells = this.props.spells/*.filter(function(spell) {
            if (this.state.selectedSpellLevel.id != -1 && this.state.selectedSchool.id != 0) {
                return (spell.level == this.state.selectedSpellLevel.id && spell.school.id == this.state.selectedSchool.id);
            } else if (this.state.selectedSpellLevel.id == -1 && this.state.selectedSchool.id != 0) {
                return (spell.school.id == this.state.selectedSchool.id);
            } else if (this.state.selectedSpellLevel.id != -1 && this.state.selectedSchool.id == 0) {
                return (spell.level == this.state.selectedSpellLevel.id);
            } else {
                return true;
            }
            return true;
        })*/;
        const picklists = this.props.picklists;
        const spellLevels = util.hardCoded.picklist.spellLevels;
        const spellSchools = util.common.picklists.getPicklistItems(this.props.picklists, util.itemtypes.TYPE.ITEM.SCHOOL_OF_MAGIC);
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
                                    <h2>Spells</h2>
                                </th>
                            </tr>
                            <tr>
                                <th width="50"></th>
                                <th>Name</th>
                                <th>
                                    <DndInput
                                        name="spellLevel"
                                        dataType={util.datatypes.PICKLIST}
                                        value={this.state.selectedSpellLevel}
                                        onChange={this.changeSelectedSpellLevel}
                                        picklist={spellLevels}
                                        hideLabel
                                        />
                                </th>
                                <th>
                                    <DndInput
                                        name="spellSchool"
                                        dataType={util.datatypes.PICKLIST}
                                        value={this.state.selectedSchool}
                                        onChange={this.changeSelectedSchool}
                                        picklist={spellSchools}
                                        hideLabel
                                        />
                                </th>
                                <th style={{paddingRight: '25px'}}>
                                    <div className="pull-right">
                                        <DndButton onClick={this.onCreate} buttonType="create" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <SpellList
                            spells={spells}
                            openModal={this.open}
                            selectedId={this.state.selectedId}
                            changeSelectedId={this.changeSelectedId}
                            onEdit={this.onEdit}
                            onViewDetails={this.onViewDetails}
                            selectedSpellLevel={this.state.selectedSpellLevel}
                            selectedSchoolId={this.state.selectedSchoolId}
                            />
                    </table>
                </div>
                <SpellEntry
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

SpellPage.propTypes = {
    spells: PropTypes.array.isRequired,
    actions: PropTypes.object,
    children: PropTypes.object,
    picklists: PropTypes.array
};

function mapStateToProps(state) {
    let picklists = [];
    if (state.picklists.length > 0) {
        picklists = state.picklists;
    }
    if (state.spells.length > 0) {
        return {
            picklists: picklists,
            spells: state.spells
        };
    } else {
        return {
            picklists: picklists,
            spells: []
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellPage);