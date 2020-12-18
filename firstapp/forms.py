from django import forms
from .models import Post
from .models import Students

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('author', 'title', 'text', 'created_date', 'published_date')

class StudentForm(forms.ModelForm):
    class Meta:
        model = Students
        fields = ('group', 'surname', 'name', 'patronymic', 'age', 'interes')