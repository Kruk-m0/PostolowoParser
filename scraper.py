import requests
import pandas as pd
import datetime
import gspread
import pathlib


gs = gspread.service_account(filename=".config/service_account.json")
spreadsheet = gs.open_by_url("https://docs.google.com/spreadsheets/d/1dm7lArskjodITBJmJ0_2CO4AdDz1NEfM1Lm-YPUscHo/edit?gid=1927988452#gid=1927988452")


first_wednesday = datetime.date(2026, 5, 6)
#  6 maja do 30 września 2026 roku.


#tournament_id = int(input("Enter tournament id: "))

#TODO: remove
tournament_id = 13937
url = f"https://eagle.polski.golf/api//_tournament/livescore/get_livescore?id={tournament_id}&format=stb_netto&classification=82967"
response = requests.get(url)
data = response.json()
wednesday = first_wednesday + datetime.timedelta(weeks=int(pd.json_normalize(data['tournament_status'])['name'].str.split().iloc[-1][-1]) -1)
print(wednesday)

df = pd.json_normalize(data["items"])
df['date'] = first_wednesday
df = df[['date',"last_name", "first_name", "hcp" ,"sum"]]
df['sum'] = df['sum'].astype(int)
df['hcp'] = df['hcp'].astype(float)


df.loc[len(df)] = [wednesday, "Ziutkowski",'Ziutek', 4, 30]
df.loc[len(df)] = [wednesday, "Ziutkowski",'Zautek', 3, 30]


sheisse = pd.DataFrame(  spreadsheet.worksheet("0-18").get_all_records(), index=)
print("spread sheisse")
print(sheisse)
sheisse.rename(index=)
sheisse.to_csv('sheisse.csv')

sheisse = pd.read_csv('sheisse.csv', index_col='')
print("Original sheisse:")

print(sheisse)
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

update_sheet(df, sheisse)

print("\nUpdated sheisse:")
print(sheisse)
#sheisse.to_csv('sheisse.csv', index=False)


hcp0_18 = df[df['hcp'] <= 18].sort_values(by=['last_name', 'first_name']).reset_index(drop=True)
hcp18_1__36 = df[df['hcp'] > 18].sort_values(by=['last_name', 'first_name']).reset_index(drop=True)
print(hcp0_18)
print(hcp18_1__36)
'''



#wsheet018 = spreadsheet.worksheet("hcp0_18")
#wsheet018.update([hcp0_18.columns.values.tolist()] +
