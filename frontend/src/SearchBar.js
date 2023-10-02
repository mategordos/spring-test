import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';

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
        <div className="d-flex">
            <Input
                type="text"
                placeholder="Search on insight.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
}

export default function SearchBar() {
    return (
        <Search/>
    );
}