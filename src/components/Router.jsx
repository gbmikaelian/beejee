import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';

export default () => {
    return (
        <Switch>
            <Route exact path="/" name="home" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/" component={() => <div>page not found</div>} />
        </Switch>
    );
};
