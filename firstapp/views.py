from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Post
from .forms import PostForm
from .models import Students
from .forms import StudentForm
from django.shortcuts import redirect


def post_list(request):
    return render(request, 'firstapp/post_list.html', {})


def about(request):
    return render(request, 'firstapp/about.html', {})


def index(request):
    if (request.method == "POST"):
        surname = request.POST.get('surname', None)
        student = Students.objects.filter(surname=surname).first()
        student.delete()
        text = Students.objects.all()
        return render(request, 'firstapp/index.html', {"text": text})
    else:
        search = request.GET.get('searchParam', None)
        if search is None or search == '':
            text = Students.objects.all()
        else:
            text = Students.objects.filter(group=search)
        return render(request, 'firstapp/index.html', {"text": text})


def new(request):
    if request.method == "POST":
        form = StudentForm(request.POST)
        if form.is_valid():
            post = form.save()
            post.save()
            text = Students.objects.all()
            return render(request, 'firstapp/index.html', {"text": text})
    else:
        form = StudentForm()
    return render(request, 'firstapp/new.html', {"form": form})


def edit(request, surname):
    student = Students.objects.filter(surname=surname).first()
    if request.method == "POST":
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            post = form.save()
            post.save()
            text = Students.objects.all()
            return render(request, 'firstapp/index.html', {"text": text})
    else:
        form = StudentForm(instance=student)
    return render(request, 'firstapp/edit.html', {"form": form, "student": student})
