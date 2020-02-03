from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('name', 'game_id', 'date', 'pk', "summary", "rating", "cover", "url", )