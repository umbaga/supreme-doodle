import React from 'react';
import PropTypes from 'prop-types';
import _TemplateListItem from './_TemplateListItem';
//import util from '../../../util/util';


const _TemplateList = ({_templates, openModal, selectedId, changeSelectedId, onEdit, onViewDetails}) => {
    return (
        <tbody>
            {_templates.map(_template =>
                             <_TemplateListItem
                                 key={_template.id}
                                 _template={_template}
                                 changeSelectedId={changeSelectedId}
                                 onEdit={onEdit}
                                 onViewDetails={onViewDetails}
                                 openModal={openModal}
                                 selectedId={selectedId}
                                 />
                            )}
        </tbody>
    );
};

_TemplateList.propTypes = {
    _templates: PropTypes.array.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onViewDetails: PropTypes.func,
    openModal: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired
};

export default _TemplateList;