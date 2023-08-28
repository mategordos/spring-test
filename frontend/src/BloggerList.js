import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class BloggerList extends Component {

    constructor(props) {
        super(props);
        this.state = {bloggers: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/bloggers')
            .then(response => response.json())
            .then(data => this.setState({bloggers: data}));
    }

    async remove(id) {
        await fetch(`/bloggers/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedBloggers = [...this.state.bloggers].filter(i => i.id !== id);
            this.setState({bloggers: updatedBloggers});
        });
    }

    render() {
        const {bloggers, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const bloggerList = bloggers.map(blogger => {
            return <tr key={blogger.id}>
                <td>{blogger.userName}</td>
                <td>{blogger.password}</td>
                <td>{blogger.email}</td>
                <td>{blogger.avatar}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/bloggers/" + blogger.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(blogger.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Bloggers</h3>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/bloggers/new">Add Blogger</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="19%">Name</th>
                            <th width="19%">Password</th>
                            <th width="19%">Email</th>
                            <th width="19%">Avatar</th>
                            <th width="24%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bloggerList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default BloggerList;
