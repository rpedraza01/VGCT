from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect

from .models import Game
from .serializers import GameSerializer
from rest_framework import generics

import requests

# # import it
# from django.http import JsonResponse

# def my_view(request):

#     # do something with the your data
#     data = {}

#     # just return a JsonResponse
#     return JsonResponse(data)

def igdb_view(request):
    url = 'https://api-v3.igdb.com/games'
    headers = {'user-key':'4009373aa92cf83271c12f13e7110994'}
    data = 'search "grandia"; fields name, release_dates.y, summary; where platforms.name="Dreamcast" & release_dates.y=2001; limit 50;'

    req = requests.post(url, data=data, headers = headers)
    response = req.json()
    # year = response[0]['release_dates'][0]['y']
    print(response)

    return JsonResponse(response, safe=False)


# use the api url for a front end (vue) ajax call to display on your page
# research how Vue CLI stacks with DJANGO. Due tutorials. 

class GameList(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
