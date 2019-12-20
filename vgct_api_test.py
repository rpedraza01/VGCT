import requests, json



def vgct():
    url = 'http://127.0.0.1:8000/api/igdb_api/'
    headers = {'Content-Type': 'application/json'}
    data = json.dumps({"title": "halo", "date": "2001"})



    req = requests.post(url, data=data, headers = headers)
    response = req.json()
    # year = response[0]['release_dates'][0]['y']
    print(response)

    return response

vgct()