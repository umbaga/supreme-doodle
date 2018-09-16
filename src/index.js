/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/my-css.css';
import {loadBackgrounds} from './actions/admin/backgroundActions';
import {loadEquipments} from './actions/admin/equipmentActions';
import {loadItemtypes} from './actions/admin/itemtypeActions';
import {loadPicklists} from './actions/admin/picklistActions';
import {loadProficiencies} from './actions/admin/proficiencyActions';
import {loadRaces} from './actions/admin/raceActions';
import {loadSpells} from './actions/admin/spellActions';
import {loadSpelllists} from './actions/admin/spelllistActions';

const store = configureStore();

store.dispatch(loadBackgrounds());
store.dispatch(loadEquipments());
store.dispatch(loadItemtypes());
store.dispatch(loadPicklists());
store.dispatch(loadProficiencies());
store.dispatch(loadRaces());
store.dispatch(loadSpells());
store.dispatch(loadSpelllists());

render(
       <Provider store={store}>
           <Router history={browserHistory} routes={routes} />
       </Provider>,
       document.getElementById('app')
);