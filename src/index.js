/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/my-css.css';
import {loadEquipments} from './actions/admin/equipmentActions';
import {loadItemtypes} from './actions/admin/itemtypeActions';
import {loadPicklists} from './actions/admin/picklistActions';
import {loadProficiencies} from './actions/admin/proficiencyActions';

const store = configureStore();

store.dispatch(loadEquipments());
store.dispatch(loadItemtypes());
store.dispatch(loadPicklists());
store.dispatch(loadProficiencies());

render(
       <Provider store={store}>
           <Router history={browserHistory} routes={routes} />
       </Provider>,
       document.getElementById('app')
);