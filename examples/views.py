import json
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib import messages

def example_view(request):
    messages.add_message(request, messages.constants.INFO, 'Working order')
    messages.add_message(request, messages.constants.ERROR, 'Broken')
    messages.add_message(request, messages.constants.SUCCESS, 'Woohoo!')
    messages.add_message(request, messages.constants.WARNING, 'Be Careful!')

    # some logic here
    return render(request, 'some_template.html', {})

def example_api_view(request):
    messages.add_message(
        request, messages.constants.WARNING,
        'Be Careful!'
    )

    return HttpResponse(
        json.dumps({'some_var': True}),
        mimetype='application/json' # NOTE: the mimetype is required
    )

