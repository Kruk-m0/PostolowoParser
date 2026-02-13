from bs4 import BeautifulSoup
import requests
import pandas as pd

url = "https://eagle.polski.golf/api//_tournament/livescore/get_livescore?id=12747&format=sp_brutto&classification=0"
response = requests.get(url)
data = response.json()

df = pd.json_normalize(data["items"])
df = df.loc[:, ~df.columns.str.startswith("tournament_status.")]
print(df.loc[:, ["player_id","first_name","last_name","hcp","sum","type"]])


