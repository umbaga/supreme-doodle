import React from 'react';
import PropTypes from 'prop-types';
import BackgroundItem from './BackgroundItem';

class BackgroundList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        let backgrounds = this.props.backgrounds.filter(function(background) {
            return !background.isVariant;
        }).sort(function(a, b) {
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            } else {
                return 0;
            }
        });
        let variants = this.props.backgrounds.filter(function(background) {
            return background.isVariant;
        }).sort(function(a, b) {
            if (a.parent.name > b.parent.name) {
                return 1;
            } else if (a.parent.name < b.parent.name) {
                return -1;
            } else {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
        let finalBackgrounds = [];
        for (let q = 0; q < backgrounds.length; q++) {
            finalBackgrounds.push(backgrounds[q]);
            let bgVariants = variants.filter(function(variant) {
                return variant.parent.id == backgrounds[q].id;
            });
            if (bgVariants && bgVariants.length != 0) {
                for (let w = 0; w < bgVariants.length; w++) {
                    finalBackgrounds.push(bgVariants[w]);
                }
            }
        }
        return (
            <tbody>
                {finalBackgrounds.map(function(background, idx) {
                    return (
                        <BackgroundItem
                            key={idx}
                            background={background}
                            openModal={this.props.openModal}
                            selectedId={this.props.selectedId}
                            changeSelectedId={this.props.changeSelectedId}
                            onEdit={this.props.onEdit}
                            />
                    );
                }.bind(this))}
            </tbody>
        );
    }
}

BackgroundList.propTypes = {
    backgrounds: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    changeSelectedId: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default BackgroundList;