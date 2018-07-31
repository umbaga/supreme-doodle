import React from 'react';
import PropTypes from 'prop-types';
import ItemtypeItem from './ItemtypeItem';

class ItemtypeList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <tbody>
                {this.props.itemtypes.map(itemtype =>
                               <ItemtypeItem
                                    key={itemtype.id}
                                    itemtype={itemtype}
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

ItemtypeList.propTypes = {
    itemtypes: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default ItemtypeList;