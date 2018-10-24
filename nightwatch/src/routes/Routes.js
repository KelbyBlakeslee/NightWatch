import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';
import CreateAccount from '../CreateAccount/CreateAccount';
import Company from '../Company/Company';
import Security from '../Security/Security';


export default (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/createaccount' component={CreateAccount}/>
        <Route exact path='/company' component={Company}/>
        <Route exact path='/security' component={Security}/>
    </Switch>
)