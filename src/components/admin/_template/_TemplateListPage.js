import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _TemplateList from './_TemplateList';
import _TemplateEntry from './_TemplateEntry';
import * as actions from '../../../actions/admin/_templateActions';
import util from '../../../util/util';
import DndButton from '../../common/buttons/DndButton';

class _TemplateListPage extends React.Component {
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
        if (this.props._templates[0].id == '') {
            this.props.actions.load_Templates();
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
        const _templates = this.props._templates;
        return (
            <div className="col-md-12">
                <div>
                    <table className="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th colSpan="2">
                                    <h2><span><DndButton onClick={this.backToAdminHome} buttonType="back" /></span>_Templates</h2>
                                </th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <th style={{paddingRight: '25px'}}>
                                    <div className="pull-right">
                                        <DndButton onClick={this.onCreate} buttonType="create" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <_TemplateList
                            _templates={_templates}
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
                <_TemplateEntry
                    closeModal={this.close}
                    openModal={this.open}
                    _templates={_templates}
                    isCreate={this.state.isCreate}
                    canEdit={this.state.canEdit}
                    selectedId={this.state.selectedId}
                    picklists={this.props.picklists}
                    showModal={this.state.showModal}
                    onEdit={this.onEdit}
                    onViewDetails={this.onViewDetails}
                    />
            </div>
        );
    }
}
/*
                    */
                            
                            
_TemplateListPage.propTypes = {
    _templates: PropTypes.array.isRequired,
    actions: PropTypes.object,
    children: PropTypes.object,
    picklists: PropTypes.array,
    equipments: PropTypes.array,
    proficiencies: PropTypes.array
};

function mapStateToProps(state) {
    let picklists = Object.assign([{}], [util.objectModel.PICKLIST]);
    if (state.picklists.length > 0) {
        picklists = Object.assign([{}], state.picklists);
    }
    if (state._templates.length > 0) {
        return {
            _templates: state._templates,
            picklists: picklists
        };
    } else {
        return {
            _templates: [util.objectModel._TEMPLATE],
            picklists: picklists
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(_TemplateListPage);