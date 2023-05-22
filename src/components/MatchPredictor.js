import React, { useEffect, useState } from 'react'

const MatchPredictor = ({ match, faction1Stats, faction2Stats }) => {
    const [maps, setMaps] = useState([]);
    const [mapWinRates, setMapWinRates] = useState([]);

    useEffect(() => {
        if (match.voting && match.voting.map && match.voting.map.entities) {
            setMaps(match.voting.map.entities);
        }
    }, [match]);

    useEffect(() => {
        if(maps && faction1Stats) {
            const faction1StatsArray = Object.values(faction1Stats);
            const faction2StatsArray = Object.values(faction2Stats);

            const totalMapWinRates = maps.map((map) => {
                const faction1WinRate = faction1StatsArray.reduce((totalWinRate, playerStats) => {
                    const winRate = playerStats.segments.reduce((total, segment) => {
                        if (segment.type === "Map" && segment.label === map.game_map_id) {
                            return total + parseFloat(segment.stats["Win Rate %"]);
                        }

                        return total;
                    }, 0);

                    return totalWinRate + winRate;
                }, 0);
            
                const faction2WinRate = faction2StatsArray.reduce((totalWinRate, playerStats) => {
                    const winRate = playerStats.segments.reduce((total, segment) => {
                        if (segment.type === "Map" && segment.label === map.game_map_id) {
                            return total + parseFloat(segment.stats["Win Rate %"]);
                        }

                        return total;
                    }, 0);

                    const avgWinrate = totalWinRate + winRate;
                    return avgWinrate;
                }, 0);
            
                return {
                    mapName: map.name,
                    mapImage: map.image_lg,
                    stats: {
                        faction1: Math.round(faction1WinRate / 5),
                        faction2: Math.round(faction2WinRate / 5)
                    }
                };
            });

            setMapWinRates(totalMapWinRates);
        }
    }, [maps, faction1Stats, faction2Stats]);

    const faction1Sum = mapWinRates.reduce((sum, map) => sum + map.stats.faction1, 0);
    const faction2Sum = mapWinRates.reduce((sum, map) => sum + map.stats.faction2, 0);

    const faction1AvgWinRate = Math.round(faction1Sum / mapWinRates.length);
    const faction2AvgWinRate = Math.round(faction2Sum / mapWinRates.length);

    const faction1PercentageRatio = faction1AvgWinRate / (100 - faction1AvgWinRate);
    const faction2PercentageRatio = faction2AvgWinRate / (100 - faction2AvgWinRate);

    const faction1Chances = Math.round((faction1PercentageRatio / (faction1PercentageRatio + faction2PercentageRatio)) * 100);
    const faction2Chances = Math.round((faction2PercentageRatio / (faction1PercentageRatio + faction2PercentageRatio)) * 100);

    return (
        <div className="match_predictor">
            <div className="match_predictor_content">
                <h3 className="heading">Win Rate</h3>
                <p className="subheading">
                    {faction1Chances === faction2Chances ? (
                        'Teams are equal to each other according to the Average Win Ratio' 
                    ) : (
                        faction1Chances > faction2Chances ? (
                            `${match.teams.faction1.name} win rate is slightly better than ${match.teams.faction2.name}` 
                        ) : ( 
                            `${match.teams.faction2.name} win rate is slightly better than ${match.teams.faction1.name}`
                        )
                    )}
                    
                </p>

                <div className="match_predictor_overall">
                    <div className="team team1">
                        <img src={match.teams.faction1.avatar} alt={match.teams.faction1.name} />
                        <h6>{match.teams.faction1.name}</h6>
                    </div>

                    <div className="compare-bar">
                        <div className={`bar bar-team1 ${faction1Chances > faction2Chances ? 'sb' : null}`} data-value={faction1Chances ? faction1Chances : 50} style={{ width: faction1Chances + '%' }}></div>
                        <div className={`bar bar-team2 ${faction2Chances > faction1Chances ? 'sb' : null}`} data-value={faction2Chances ? faction2Chances : 50} style={{ width: faction2Chances + '%' }}></div>
                    </div>

                    <div className="team team2">
                        <img src={match.teams.faction2.avatar} alt={match.teams.faction2.name} />
                        <h6>{match.teams.faction2.name}</h6>
                    </div>
                </div>

                <div className="match_predictor_segments">
                    {mapWinRates.map((map) => (
                        <div key={map.mapName} className="segment">
                            <div className={`bar bar-team1 ${map.stats.faction1 > map.stats.faction2 ? 'sb' : null}`} data-value={map.stats.faction1}>
                                <span style={{ width: map.stats.faction1 + '%' }}></span>
                            </div>

                            <div className="map">
                                <img src={map.mapImage} alt={map.mapName} />
                                <span>{map.mapName}</span>
                            </div>

                            <div className={`bar bar-team2 ${map.stats.faction2 > map.stats.faction1 ? 'sb' : null}`} data-value={map.stats.faction2}>
                                <span style={{ width: map.stats.faction2 + '%' }}></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MatchPredictor