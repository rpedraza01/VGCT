from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Game
from .serializers import GameSerializer
from rest_framework import generics

import requests, json
from . import secrets

# # import it
# from django.http import JsonResponse

# def my_view(request):

#     # do something with the your data
#     data = {}

#     # just return a JsonResponse
#     return JsonResponse(data)

@csrf_exempt
def igdb_view(request):
    print(request.body)

    searchData = request.body.decode('utf-8')

    # print(type(json.loads(request.body)))
    searchData = json.loads(searchData)
    print(type(searchData))

    # data to f-string and pull info from dictionary above


    searchTitle = searchData['title']
    print(type(searchTitle))
    # searchDate = int(searchData['date'])
    
    url = 'https://api-v3.igdb.com/games'
    headers = secrets.api_key
    # data = f'search "{searchTitle}"; fields name, release_dates.y, cover.url, summary; where platforms.name="Xbox"; limit 50;'
    data = f'search "{searchTitle}"; fields name, release_dates.y, genres.name, cover.url, summary, total_rating, url, involved_companies.company.name; limit 1;'
    print(type(data))
    print(data)

    req = requests.post(url, data=data, headers = headers)
    response = req.json()
    # year = response[0]['release_dates'][0]['y']
    # response = json.dumps(response)
    # print(type(response))
    print("response", response)
    # response = json.loads(response)

    return JsonResponse({'games': response}, safe=False)


# use the api url for a front end (vue) ajax call to display on your page
# research how Vue CLI stacks with DJANGO. Due tutorials. 

class GameList(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
