/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/my-css.css';
import {loadItemtypes} from './actions/admin/itemtypeActions';

const store = configureStore();

store.dispatch(loadItemtypes());

render(
       <Provider store={store}>
           <Router history={browserHistory} routes={routes} />
       </Provider>,
       document.getElementById('app')
);