from django.db import models

class Game(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(null=True, blank=True, default="", max_length=100)
    game_id = models.IntegerField(null=True, blank=True, default=0)
    date = models.IntegerField(null=True, blank=True, default=0)
    summary = models.TextField(null=True, blank=True, default="")
    rating = models.FloatField(null=True, blank=True, default=0)
    cover = models.TextField(null=True, blank=True, default="")
    url = models.TextField(null=True, blank=True, default="")


    def __str__(self):
        return self.name


# if updating model fields, check in: GameResults.vue, App.vue, serializers.py