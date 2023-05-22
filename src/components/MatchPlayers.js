import React from 'react';
import { Link } from 'react-router-dom';
import premiumIcon from '../assets/img/icons/premium.svg';
import csgoIcon from '../assets/img/icons/csgo.svg';
import flagDefault from '../assets/img/default/flag.svg';
import mapDefault from '../assets/img/default/map.svg';

const MatchPlayers = ({ match, faction1, faction2 }) => {
    const getSkillLevelImage = (skillLevel) => {
        const imagePath = require(`../assets/img/skill-levels/${skillLevel}.svg`);
        return imagePath;
    }

    const getCountryFlag = (country) => {
        const imagePath = require(`../assets/img/flags/${country}.svg`);
        if (imagePath) { return imagePath } else { return flagDefault }
    }

    const serverLocation = match.voting.location.entities.find((serverLocation) => serverLocation.name === match.voting.location.pick[0]);
    const pickedMap = match.voting.map.entities.find((pickedMap) => pickedMap.game_map_id === match.voting.map.pick[0]);

    return (
        <div className="match_details">
            <div className="players">
                {Object.values(faction1).map((player) => (
                    <div className="player" key={player.player_id} aria-label={player.nickname}>
                        <Link to={`https://faceit.com/en/players/${player.nickname}`} target="_blank" rel="noopener noreferrer" className="player_avatar">
                            <img src={player.avatar} alt={`${player.nickname} avatar`} />

                            {player.memberships[0] !== 'free' ? (
                                <div className="premium">
                                    {player.memberships[0] === 'csgo' ? <img src={csgoIcon} alt="csgo" /> : null}
                                    {player.memberships[0] === 'premium' ? <img src={premiumIcon} alt="premium" /> : null}
                                </div>
                            ) : null}
                        </Link>

                        <div className="player_info">
                            <div className="player_info_nickname">
                                <img src={getCountryFlag(player.country)} alt={player.country} />

                                <Link to={`https://faceit.com/en/players/${player.nickname}`} target="_blank" rel="noopener noreferrer">
                                    <h4>{player.nickname}</h4>
                                </Link>
                            </div>

                            <Link to={`https://steamcommunity.com/profiles/${player.steam_id_64}`} target="_blank" rel="noopener noreferrer">
                                {player.steam_id_64}
                            </Link>
                        </div>

                        <div className="player_level">
                            <span>{player.games.csgo.faceit_elo}</span>
                            <img src={getSkillLevelImage(player.games.csgo.skill_level)} alt={player.games.csgo.skill_level} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="pick">
                <div className="pick_details">
                    <h5 className="pick_details_title">Server</h5>

                    <div className="pick_details_box">
                        {serverLocation ? (
                            <> 
                                <img src={serverLocation.image_sm} alt={serverLocation.name} />
                                <span>{serverLocation.name}</span>
                            </>
                        ) : (
                            <>
                                <img src={flagDefault} alt="Unknown" />
                                <span>Not picked yet</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="pick_details">
                    <h5 className="pick_details_title">Map</h5>

                    <div className="pick_details_box">
                        {pickedMap ? (
                            <> 
                                <img src={pickedMap.image_sm} alt={pickedMap.game_map_id} />
                                <span>{pickedMap.game_map_id}</span>
                            </>
                        ) : (
                            <>
                                <img src={mapDefault} alt="Unknown" />
                                <span>Not picked yet</span>
                            </>
                        )}
                    </div>
                </div>
                
                {match.demo_url ? (
                    <Link to={match.demo_url[0]} target="_blank" rel="noopener noreferrer" className="btn btn-transparent">Download demo</Link>
                ) : null}
                <Link to={`https://www.faceit.com/en/csgo/room/${match.match_id}`} target="_blank" rel="noopener noreferrer" className="btn">Open in FACEIT</Link>
            </div>

            <div className="players">
                {Object.values(faction2).map((player) => (
                    <div className="player" key={player.player_id} aria-label={player.nickname}>
                        <Link to={`https://faceit.com/en/players/${player.nickname}`} target="_blank" rel="noopener noreferrer" className="player_avatar">
                            <img src={player.avatar} alt={`${player.nickname} avatar`} />

                            {player.memberships[0] !== 'free' ? (
                                <div className="premium">
                                    {player.memberships[0] === 'csgo' ? <img src={csgoIcon} alt="csgo" /> : null}
                                    {player.memberships[0] === 'premium' ? <img src={premiumIcon} alt="premium" /> : null}
                                </div>
                            ) : null}
                        </Link>

                        <div className="player_info">
                            <div className="player_info_nickname">
                                <img src={getCountryFlag(player.country)} alt={player.country} />

                                <Link to={`https://faceit.com/en/players/${player.nickname}`} target="_blank" rel="noopener noreferrer">
                                    <h4>{player.nickname}</h4>
                                </Link>
                            </div>

                            <Link to={`https://steamcommunity.com/profiles/${player.steam_id_64}`} target="_blank" rel="noopener noreferrer">
                                {player.steam_id_64}
                            </Link>
                        </div>

                        <div className="player_level">
                            <span>{player.games.csgo.faceit_elo}</span>
                            <img src={getSkillLevelImage(player.games.csgo.skill_level)} alt={player.games.csgo.skill_level} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MatchPlayers