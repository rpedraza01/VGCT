from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100)
    game_id = models.IntegerField()
    date = models.IntegerField()

    def __str__(self):
        return self.name


# if updating model fields, check in: index.vue, create.vue, edit.vue, serializers.py