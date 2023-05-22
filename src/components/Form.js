import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/match/${inputValue}`);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={handleChange} 
                    placeholder="Enter your match ID"
                />
                <button type="submit">Find</button>
            </form>
        </>
    )
}

export default Form