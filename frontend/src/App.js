import React, { } from 'react';
import './App.css';
import Home from './home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from "./LoginPage";
import PostCreator from "./postcreator/PostCreator";
import RegisterPage from "./RegisterPage";



function App() {

    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/create' component={PostCreator}/>
            <Route path='/signup' component={RegisterPage}/>
          </Switch>
        </Router>
    )
}
export default App;