import React from 'react';
import PropTypes from 'prop-types';
import ItemtypeItem from './ItemtypeItem';

const ItemtypeList = ({itemtypes, openModal, selectedId, changeSelectedId, onEdit}) => {
    return (
        <tbody>
            {itemtypes.map(itemtype =>
                           <ItemtypeItem
                                key={itemtype.id}
                                itemtype={itemtype}
                                openModal={openModal}
                                selectedId={selectedId}
                                changeSelectedId={changeSelectedId}
                                onEdit={onEdit}
                               />
                          )}
        </tbody>
    );
};

ItemtypeList.propTypes = {
    itemtypes: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default ItemtypeList;