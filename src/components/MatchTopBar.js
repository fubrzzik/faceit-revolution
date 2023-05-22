import React from 'react'

const MatchTopBar = ({ match }) => {
    return (
        <div className="top_bar">
            <div className="team">
                <img src={match.teams.faction1.avatar} alt={match.teams.faction1.name} />
                <h6 className="team_name">{match.teams.faction1.name}</h6>
            </div>
            <div className="score">
                <div className="result" style={match.results.winner === 'faction1' ? {color: '#77ff77'} : null}>{match.results.score.faction1}</div>
                <div className="status" style={match.status === 'FINISHED' ? null : {color: '#77ff77'}}>{match.status === 'FINISHED' ? match.status : 'LIVE'}</div>
                <div className="result" style={match.results.winner === 'faction2' ? {color: '#77ff77'} : null}>{match.results.score.faction2}</div>
            </div>
            <div className="team">
                <img src={match.teams.faction2.avatar} alt={match.teams.faction2.name} />
                <h6 className="team_name">{match.teams.faction2.name}</h6>
            </div>
        </div>
    )
}

export default MatchTopBar