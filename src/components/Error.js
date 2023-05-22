import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="not_found">
            <div className="text">
                <h1>404</h1>
                <h2>The resource was not found.</h2>
                <p>The match you are looking for does not exist. Check the match ID and try again.</p>
                <Link to="/">Back to home</Link>
            </div>
        </div>
    )
}

export default Error