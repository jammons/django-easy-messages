# modified from: http://hunterford.me/django-messaging-for-ajax-calls-using-jquery/
import json

from django.contrib import messages

class AjaxMessaging(object):
    ''' Attaches any messages present on the request to the json response '''

    def process_response(self, request, response):
        if request.is_ajax():
            if response['Content-Type'] == 'application/json':
                try:
                    content = json.loads(response.content)
                except ValueError:
                    return response

                dj_messages = []

                for message in messages.get_messages(request):
                    dj_messages.append({
                        'msg': message.message,
                        'tags': message.tags
                    })

                content['messages'] = dj_messages
                response.content = json.dumps(content)
        return response

