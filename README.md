# PostolowoParser

A Python scraper for tracking weekly League results at Postołowo Golf Club. The script retrieves tournament scores from [polski.golf](https://polski.golf/), maintains a leaderboard, and calculates rankings based on players' ten best rounds.

## Features

- **Tournament discovery** — finds the current league round and matches it to the corresponding tournament.
- **Live score retrieval** — fetches net scores and player information from the Polish Golf API.
- **Leaderboard management** — updates player results in a local CSV file, adding new players when necessary.
- **Best-round scoring** — calculates cumulative totals using each player's ten highest round scores.
- **Handicap classification** — separates players into two categories: HCP 0–18 and HCP 18.1–36.
- **Google Sheets integration** — connects to a Google spreadsheet and locates the worksheets for both handicap categories.

## How it works

1. Determines the current league round using the configured season start date.
2. Retrieves the tournament list from the Polish Golf website.
3. Finds the tournament matching Postołowo Golf Club, Środowa Liga Golfa, and the calculated round number.
4. Fetches the tournament's net results.
5. Merges the results into `sheisse.csv`, matching players by first and last name.
6. Recalculates each player's cumulative score from their ten best rounds.
7. Splits the leaderboard into handicap categories and prepares the corresponding Google Sheets worksheets.

> **Note:** Google Sheets write operations are currently commented out in `scraper.py`. The script connects to the spreadsheet but does not currently publish the updated leaderboards to it.

## Requirements

- Python 3.10 or newer
- Access to the internet
- A Google Cloud service account if using the Google Sheets integration
- A Google spreadsheet accessible to that service account

## Installation

Clone the repository:

```bash
git clone https://github.com/Kruk-m0/PostolowoParser.git
cd PostolowoParser
```

Create and activate a virtual environment:

```bash
python -m venv .venv
```

On Linux or macOS:

```bash
source .venv/bin/activate
```

On Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

The script expects the following configuration files:

```text
PostolowoParser/
├── .config/
│   ├── .env
│   └── service_account.json
├── scraper.py
├── requirements.txt
└── sheisse.csv
```

### 1. Google Sheets configuration

Create a Google Cloud service account, enable the Google Sheets API, and download its JSON credentials.

Save the credentials as:

```text
.config/service_account.json
```

Share the target Google spreadsheet with the service account's email address, granting it the necessary permissions.

### 2. Environment configuration

Create `.config/.env` and add the URL of your Google spreadsheet:

```dotenv
docsurl=https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
```

Replace the example URL with your actual spreadsheet URL.

### 3. Leaderboard data

The script reads and writes `sheisse.csv`. This file stores player information, handicap values, individual round results, and cumulative totals.

Ensure the CSV exists and has the expected column structure before running the script.

## Usage

Run the scraper from the repository root:

```bash
python scraper.py
```

The script will attempt to identify the current tournament, retrieve its results, update the local leaderboard, and calculate the cumulative scores.

If no matching tournament is found for the calculated round, the script raises an exception.

## Scoring

For each player, the cumulative score is calculated from the ten highest values among the recorded round scores.

In simplified form:

```python
total = sum(sorted(round_scores)[-10:])
```

Missing or non-numeric round values are treated as zero.

Players are then divided into two handicap groups:

| Category | Handicap |
|---|---|
| HCP 0–18 | Less than or equal to 18 |
| HCP 18.1–36 | Greater than 18 |

The resulting data is sorted alphabetically by surname and first name.

## Project structure

| File | Purpose |
|---|---|
| `scraper.py` | Tournament discovery, score retrieval, leaderboard updates, and score calculation |
| `sheisse.csv` | Persistent leaderboard data |
| `requirements.txt` | Python dependency list |
| `file.py` | script mostly used by me to quickly erase the csv after mistakes |
| `.config/.env` | Google spreadsheet configuration |
| `.config/service_account.json` | Google service account credentials |

## Limitations

- **Season configuration:** The season start date is hardcoded in `scraper.py` and must be updated for a new season.
- **Tournament naming:** Tournament discovery depends on the course name, league name, and round number appearing in the expected format.
- **Polski Golf:** The script only works for the Polish Golf website and its API.
- **Player matching:** Existing players are matched using first and last names. I recommend changing that for player_id available in the polski.golf API 
- **Google Sheets publishing:** The worksheet update calls are currently disabled.
- **Configuration and dependencies:** The required configuration files must be created manually, and the dependency list should be kept in sync with the imports in the script.
