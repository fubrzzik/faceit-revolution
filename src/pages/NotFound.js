import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not_found">
            <div className="text">
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>Oops! The page you are looking for does not exists. It might have been moved or delete.</p>
                <Link to="/">Back to home</Link>
            </div>
        </div>
    )
}

export default NotFound