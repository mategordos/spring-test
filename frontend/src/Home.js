import React, {} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';



function ToBloggers() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/bloggers">Bloggers</Link></Button>
                </Container>
            </div>
        );


}
export default function Home(){
    return (
        <ToBloggers/>
    )
}