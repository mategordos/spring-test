import React, { } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BloggerList from "./BloggerList";
import BloggerEdit from "./BloggerEdit";
import AuthForm from "./AuthForm";



function App() {

    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/bloggers' exact={true} component={BloggerList}/>
            <Route path='/bloggers/:id' component={BloggerEdit}/>
            <Route path='/auth' component={AuthForm}/>
          </Switch>
        </Router>
    )
}
export default App;