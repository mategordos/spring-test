import React, { } from 'react';
import './App.css';
import Home from './home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthForm from "./AuthForm";
import PostCreator from "./postcreator/PostCreator";



function App() {

    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/auth' component={AuthForm}/>
            <Route path='/create' component={PostCreator}/>
          </Switch>
        </Router>
    )
}
export default App;