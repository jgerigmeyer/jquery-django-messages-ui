import json

from django.contrib import messages


class AjaxMessagesMiddleware(object):
    """
    Middleware to handle messages for AJAX requests.

    If the AJAX response is already JSON, add a "messages" key to it (or
    append to an existing "messages" key) a list of messages (each
    message is an object with "level", "message", and "tags" keys).

    If the AJAX response is currently html, turn it into JSON and stuff
    the HTML content into the "html" key, adding a "messages" key as
    well.

    If the AJAX response is neither json nor html, return it as-is (with
    no messages attached, and without iterating over messages).

    If the AJAX response has a status code other than 200, or has an attribute
    ``no_messages`` that is ``True``, it will not be modified (and messages
    will not be read).

    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        handle_response = (
            request.is_ajax() and
            response.status_code == 200 and
            not getattr(response, 'no_messages', False)
            )
        if handle_response:
            content_type = response.get('content-type', 'None').split(";")[0]

            content = response.content.decode('utf-8')

            if content_type == "application/json":
                data = json.loads(content)
            elif content_type == "text/html":
                data = {"html": content}
            else:
                return response

            messagelist = data.setdefault("messages", [])

            for message in messages.get_messages(request):
                messagelist.append({
                    "level": message.level,
                    "message": str(message.message),
                    "tags": message.tags,
                })

            response.content = json.dumps(data)
            response["content-type"] = "application/json"
            response["content-length"] = len(response.content)
        return response
