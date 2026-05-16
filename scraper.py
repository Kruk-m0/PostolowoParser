import requests
import pandas as pd
import numpy as np
import datetime
import gspread
import re
import json

first_wednesday = datetime.date(2026, 5, 6)
#  6 maja do 30 września 2026 roku.



url = "https://polski.golf/turnieje/lista-turniejow/?status=2"

html = requests.get(url).text

match = re.search(r'var data = (\{.*?\});', html, re.DOTALL)

data = json.loads(match.group(1))

items = data["items"]

today = datetime.date.today()

# current league round
round_number = ((today - first_wednesday).days // 7) + 1

print("Expected round:", round_number)

target = None

for t in items:

    if (
        "Postołowo Golf Club" in t["courses_txt"]
        and "Środowa Liga Golfa" in t["name"]
    ):

        m = re.search(r'(\d+)\s*$', t["name"])

        if not m:
            continue

        tournament_round = int(m.group(1))

        if tournament_round == round_number:
            target = t
            break

if target is None:
    raise Exception("Tournament not found")

tournament_id = target["id"]

print("Tournament:", target["name"])
print("ID:", tournament_id)

'''
def update_sheet(df1, df2):
    df2 = df2.copy()

    # ensure date column name matches exactly (important)
    # if df1.date is datetime:
    df1["date"] = pd.to_datetime(df1["date"]).dt.strftime("%d-%m")

    for _, r in df1.iterrows():
        last = r["last_name"]
        first = r["first_name"]
        date = r["date"]
        value = r["sum"]
        hcp = r["hcp"]

        # locate player
        mask = (df2["Nazwisko"] == last) & (df2["Imię"] == first)

        if mask.any():
            idx = df2.index[mask][0]
        else:
            # create new row
            new_row = {col: 0 for col in df2.columns}
            new_row["Nazwisko"] = last
            new_row["Imię"] = first
            new_row["HCP"] = hcp

            df2 = pd.concat([df2, pd.DataFrame([new_row])], ignore_index=True)
            idx = df2.index[-1]

        # update HCP ONLY if empty/new
        if pd.isna(df2.at[idx, "HCP"]) or df2.at[idx, "HCP"] == 0:
            df2.at[idx, "HCP"] = hcp

        # write score into matching date column
        if date in df2.columns:
            df2.at[idx, date] = value
        else:
            # optional safety: ignore or raise
            raise ValueError(f"Date column {date} not found in df2")

    return df2


def top10_sum(row, date_cols):
    values = pd.to_numeric(row[date_cols], errors="coerce").fillna(0).values
    return np.sum(np.sort(values)[-10:])




gs = gspread.service_account(filename=".config/service_account.json")
spreadsheet = gs.open_by_url("https://docs.google.com/spreadsheets/d/1dm7lArskjodITBJmJ0_2CO4AdDz1NEfM1Lm-YPUscHo/edit?gid=1927988452#gid=1927988452")



url = f"https://eagle.polski.golf/api//_tournament/livescore/get_livescore?id={tournament_id}&format=stb_netto&classification=82967"
response = requests.get(url)
data = response.json()
wednesday = first_wednesday + datetime.timedelta(weeks=int(pd.json_normalize(data['tournament_status'])['name'].str.split().iloc[-1][-1]) -1)
print(wednesday)

df = pd.json_normalize(data["items"])
df['date'] = wednesday
df = df[['date',"last_name", "first_name", "hcp" ,"sum"]]
df['sum'] = df['sum'].astype(int)
df['hcp'] = df['hcp'].astype(float)

df.loc[len(df)] = ["2026-05-06", "Test", "Player", 15.0, 25]
df.loc[len(df)] = ["2026-05-06", "Test", "Player2", 3.0, 35]

sheisse = pd.read_csv('sheisse.csv', index_col='id')


sheisse = update_sheet(df, sheisse)
sheisse.index.name = "id"
date_cols = [c for c in sheisse.columns if c not in ["Nazwisko", "Imię", "HCP", "Suma"]]
sheisse["Suma"] = sheisse.apply(lambda r: top10_sum(r, date_cols), axis=1)

sheisse.to_csv('sheisse.csv')


hcp0_18 = sheisse[sheisse['HCP'] <= 18].sort_values(by=['Nazwisko', 'Imię']).reset_index(drop=True)
hcp18_1__36 = sheisse[sheisse['HCP'] > 18].sort_values(by=['Nazwisko', 'Imię']).reset_index(drop=True)


wsheet018 = spreadsheet.worksheet("0-18")
wsheet018.update([hcp0_18.columns.values.tolist()] + hcp0_18.values.tolist())

wsheet1836 = spreadsheet.worksheet("18.1-36")
wsheet1836.update([hcp18_1__36.columns.values.tolist()] + hcp18_1__36.values.tolist())
'''