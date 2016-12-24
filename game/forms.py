from django import forms
from .models import Game, Word

class PostWords(forms.ModelForm):
    class Meta:
        model = Word
        fields = ('text',)
