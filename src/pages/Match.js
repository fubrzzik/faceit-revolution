import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchData, fetchMoreDataById } from '../data/api';
import { Preloader, Error, MatchTopBar, MatchPlayers, MatchPredictor } from '../components';

const Match = () => {
    const [match, setMatch] = useState(null);
    const [players, setPlayers] = useState([]);
    const [playersStats, setPlayersStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const matchDetails = async () => {
            try {
                setLoading(true);

                const apiData = await fetchData(`matches/${params.matchID}`);
                setMatch(apiData);

                if (apiData && apiData.teams && typeof apiData.teams === 'object') {
                    const teamPromises = Object.values(apiData.teams).map(async (team) => {
                        if (team.roster && Array.isArray(team.roster)) {
                            const playerPromises = team.roster.map((player) =>
                                fetchMoreDataById(`players/${player.player_id}`)
                            );
                            const players = await Promise.all(playerPromises);
                            return {
                                ...players
                            };
                        }
                        return team;
                    });

                    const teamStatsPromises = Object.values(apiData.teams).map(async (team) => {
                        if(team.roster && Array.isArray(team.roster)) {
                            const playerStatsPromises = team.roster.map((player) => 
                                fetchMoreDataById(`players/${player.player_id}/stats/csgo`)
                            );
                            const playersStats = await Promise.all(playerStatsPromises);
                            return {
                                ...playersStats
                            }
                        }
                        return team;
                    });
              
                    const teamsWithPlayers = await Promise.all(teamPromises);
                    const teamsWithPlayersStats = await Promise.all(teamStatsPromises);
                    setPlayers(teamsWithPlayers);
                    setPlayersStats(teamsWithPlayersStats);
                }

                setLoading(false);
            } catch(error) {
                throw error;
            }
        }

        matchDetails();
    }, [params.matchID]);

    const faction1 = players[0];
    const faction2 = players[1];
    const faction1Stats = playersStats[0];
    const faction2Stats = playersStats[1];

    return (
        <>
            {loading ? (
                <Preloader />
            ) : match && match.game === 'csgo' && players && players.length > 0 && playersStats && playersStats.length > 0 ? (
                <div className="match">
                    <MatchTopBar match={match} />
                    <MatchPlayers match={match} faction1={faction1} faction2={faction2} />
                    <MatchPredictor match={match} faction1Stats={faction1Stats} faction2Stats={faction2Stats} />
                </div>
            ) : (
                <Error />
            )}
        </>
    )
}

export default Match