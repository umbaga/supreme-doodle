import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';

import AdminHomePage from './components/admin/home/adminHomePage';

import ItemtypePage from './components/admin/itemtype/ItemtypePage';
import PicklistPage from './components/admin/picklist/PicklistPage';
import ProficiencyPage from './components/admin/proficiency/ProficiencyPage';

import AboutPage from './components/about/AboutPage';
import LogInPage from './components/LogInPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={AdminHomePage} />
        <Route path="/Home" component={AdminHomePage} />
        <Route path="/admin/itemtype" component={ItemtypePage} />
        <Route path="/admin/picklist" component={PicklistPage} />
        <Route path="/admin/proficiency" component={ProficiencyPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/about" component={AboutPage} />
    </Route>
);