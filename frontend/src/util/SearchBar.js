import React, {useEffect, useState} from 'react';
import {Input, Button, NavItem} from 'reactstrap';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            window.location.href = `http://localhost:3000/search?keyword=${searchTerm}`;
        }
    };


    return (
        <NavItem className="m-lg-auto w-25">
            <Input
                type="text"
                placeholder="Search on Insight.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
        </NavItem>
    );
}

export default function SearchBar() {
    return (
        <Search/>
    );
}