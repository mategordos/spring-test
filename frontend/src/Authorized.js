import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default function Authorized({ requiredRoles, children }) {
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const user = parseToken(token);
        console.log("current user: "+ user)
        console.log("current token: " +token)
        if (user == null) {
            history.replace('/login');
        } else if (!requiredRoles.some(role => user.role.includes(role))) {
            history.replace('/forbidden');
        }
    }, [requiredRoles, history]);

    return <>{children}</>;
}

function parseToken(token) {
    if (!token) {
        return null;
    }

    const payload = token.split('.')[1];

    try {
        const decodedPayload = atob(payload);
        const parsedPayload = JSON.parse(decodedPayload);

        if (parsedPayload && parsedPayload.role) {
            return {
                role: parsedPayload.role,
            };
        } else {
            console.error('Token payload is missing roles or other necessary information');
        }
    } catch (error) {
        console.error('Error parsing token payload:', error);
    }

    return null;
}