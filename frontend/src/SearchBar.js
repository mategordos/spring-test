import React, { useState } from 'react';
import {Input, Button, NavItem} from 'reactstrap';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <NavItem className="m-lg-auto w-50">
            <Input
                type="text"
                placeholder="Search on insight.."
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