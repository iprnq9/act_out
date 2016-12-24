from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .models import Game, Word
from .forms import PostWords

# Create your views here.


def home(request):
    games = Game.objects.order_by('-created_date')
    return render(request, 'game/home.html', {'games': games})


def game_detail(request, pk):
    game = get_object_or_404(Game, pk=pk)
    words = Word.objects.filter(game=game)
    return render(request, 'game/game_detail.html', {'game': game, 'words': words})


def game_play(request, pk):
    game = get_object_or_404(Game, pk=pk)
    words = Word.objects.filter(game=game)
    words = ",".join(str(word) for word in words)
    return render(request, 'game/game_play.html', {'game': game, 'words': words})


# def game_add(request, pk):
#     form = PostWords()
#     game = get_object_or_404(Game, pk=pk)
#     word_count_range = range(0, game.words_per_player)
#     return render(request, 'game/game_add.html', {'form': form, 'game': game, 'word_count_range': word_count_range})


def game_add(request, pk):
    game = get_object_or_404(Game, pk=pk)
    word_count_range = range(0, game.words_per_player)
    if request.method == "POST":
        form = PostWords(request.POST)
        if form.is_valid():
            word = form.save(commit=False)
            word.game = game
            word.save()
            return redirect('game_add', pk=game.pk)
    else:
        form = PostWords()
    return render(request, 'game/game_add.html', {'form': form, 'word_count_range': word_count_range, 'game': game})

