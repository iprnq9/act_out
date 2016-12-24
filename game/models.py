from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from random import shuffle
# Create your models here.


class Game(models.Model):
    host = models.CharField(max_length=300, default='Family time!')
    category = models.CharField(max_length=50)
    words_per_player = models.SmallIntegerField(default=5)
    ROUND_TIMES = (
        (30000, ':30'),
        (45000, ':45'),
        (60000, '1:00'),
        (90000, '1:30'),
    )
    time_per_round = models.IntegerField(default=60000, choices=ROUND_TIMES)
    #time_per_round_sec = time_per_round/1000
    #submissions = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.host

    def words(self):
        return str(self.submissions)

    def print_words(self):
        var = self.words()
        return var.split(',')

    def word_count(self):
        return len(self.print_words())

    def get_word(self):
        var = self.print_words()
        return var[1]


class Word(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    text = models.CharField(max_length=100)

    def __str__(self):
        return self.text

