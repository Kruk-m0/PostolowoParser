import requests
import re
import json

url = "https://polski.golf/turnieje/lista-turniejow/?status=2"

html = requests.get(url).text

match = re.search(r'var data = (\{.*?\});', html, re.DOTALL)

data = json.loads(match.group(1))

items = data["items"]
leagues =[]
for t in items:
    if "Postołowo Golf Club" in t['courses_txt'] and "Środowa Liga Golfa" in t['name']:
        print(
            t["id"],
            t['name']
        )
        leagues.append((t['date'], t["id"], t['name']))
print(leagues)