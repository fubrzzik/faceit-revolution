import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '../components';
import instruction from '../assets/img/instruction.jpg';

const Home = () => {
    return ( 
        <div className="home">
            <div className="home_box">
                <h1>Find your match</h1>
                <h2>Stay Ahead of the Game, Predict Your Success with Faceit Revolution!</h2>
                <Form />
                
                <div className="instruction">
                    <h3>How it works?</h3>
                    <p>Copy the match ID from the lobby link and paste it above, then click the 'Find' button.</p>
                    <p className="example">Example: https://www.faceit.com/pl/csgo/room/<span>1-684acb15-6b1f-4485-80a6-24fc2418ffc4</span></p>
                    <img src={instruction} alt="instruction" />
                    <p>Match ID example: <Link to="/match/1-684acb15-6b1f-4485-80a6-24fc2418ffc4">1-684acb15-6b1f-4485-80a6-24fc2418ffc4</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Home