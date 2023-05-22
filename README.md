
# FACEIT Revolution

FACEIT Revolution allows you to check on which map you have the highest chances of winning a CS:GO match on the FACEIT platform.

## Features

- Match Details: The application retrieves match details based on the provided match ID. It fetches data from the API endpoint and displays information about the match, including the teams involved.
- Team Rosters: The application displays the rosters of the teams participating in the match. It fetches player data for each team and shows the list of players for each team.
- Player Statistics (ELO, level): The application retrieves statistics for each player in the match. It fetches player statistics for the game (CS:GO) and displays them alongside the player information.
- Match Predictor: The application includes a match predictor component. It takes into account the player statistics and provides predictions or analysis for the match outcome.

## Run Locally

Clone the project

```bash
  git clone https://github.com/fubrzzik/faceit-revolution.git
```

Go to the project directory

```bash
  cd faceit-revolution
```

Install dependencies

```bash
  npm install
```

Start the server - dev mode

> **Note** 
> If you want the application to work correctly, create a ".env" file and add your API token to "REACT_APP_API_KEY". You can generate the token on the website: https://developers.faceit.com/.

```bash
  npm start
```

Build project - prod mode

```bash
  npm run build
```