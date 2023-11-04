import React, {useEffect} from 'react';
import './App.css';
import Home from './home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from "./login/LoginPage";
import PostCreator from "./postcreator/PostCreator";
import RegisterPage from "./register/RegisterPage";
import AdminPage from "./adminpage/AdminPage";
import ProfilePage from "./userprofile/ProfilePage";
import BlogPostPage from "./blogpostpage/BlogPostPage";
import CategorizedBlogPosts from "./categorypage/CategorizedBlogPosts";
import axios from "axios";
import SearchPage from "./searchpage/SearchPage";
import EditPost from "./userprofile/EditPost";



function App() {

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/create' component={PostCreator}/>
            <Route path='/signup' component={RegisterPage}/>
            <Route path='/admin' component={AdminPage}/>
            <Route path='/profile' component={ProfilePage}/>
            <Route path='/blogposts/:blogPostId' children={<BlogPostPage/>}/>
            <Route path="/category/:categoryId" children={<CategorizedBlogPosts/>}/>
            <Route path="/search" component={SearchPage}/>
            <Route path="/edit/:blogPostId" children={<EditPost/>}/>
          </Switch>
        </Router>
    )
}
export default App;