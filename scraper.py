import requests
import pandas as pd


tournament_id = int(input("Enter tournament id: "))
url = f"https://eagle.polski.golf/api//_tournament/livescore/get_livescore?id={tournament_id}&format=stb_netto&classification=0"
response = requests.get(url)
data = response.json()

df = pd.json_normalize(data["items"])
df = df.loc[:, ~df.columns.str.startswith("tournament_status.")]
df=df.loc[:, ["first_name","last_name","hcp","sum",]]

df.to_csv("livescore.csv", index=False)


