import requests
from . import secrets

# 'search "grandia"; fields name, total_rating, url, release_dates.y, genres.name, cover.image_id, platforms.name, summary, involved_companies.company.name; where platforms.name="Dreamcast" & release_dates.y=2001; limit 50;'


def igdb():
    url = 'https://api-v3.igdb.com/games'
    headers = secrets.api_key
    data = 'search "grandia"; fields name, release_dates.y, summary; where platforms.name="Dreamcast" & release_dates.y=2001; limit 50;'



    req = requests.post(url, data=data, headers = headers)
    response = req.json()
    # year = response[0]['release_dates'][0]['y']
    print(response)

    return response

igdb()