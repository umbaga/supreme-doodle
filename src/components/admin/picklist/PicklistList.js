import React from 'react';
import PropTypes from 'prop-types';
import PicklistItem from './PicklistItem';

class PicklistList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <tbody>
                {this.props.picklists.map(picklist =>
                               <PicklistItem
                                    key={picklist.id}
                                    picklist={picklist}
                                    openModal={this.props.openModal}
                                    selectedId={this.props.selectedId}
                                    changeSelectedId={this.props.changeSelectedId}
                                    onEdit={this.props.onEdit}
                                   />
                              )}
            </tbody>
        );
    }
}

PicklistList.propTypes = {
    picklists: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default PicklistList;