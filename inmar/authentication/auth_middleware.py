# Author: Partha


from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse


def simple_middleware(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        request.session['TORNADO_URL'] = settings.TORNADO_URL
        if request.user.is_authenticated():
            if request.path == "/auth/login/":
                return HttpResponseRedirect("/")
            return get_response(request)
        else:
            if request.path == "/auth/login/":
                 return get_response(request)
            return HttpResponseRedirect('/auth/login/?next='+request.get_full_path()+'')
        response = get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware
