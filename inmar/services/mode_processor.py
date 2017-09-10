# Author: Integra
# Dev: Partha(Ref)
# Desc: Used to render the mode to the template

from django.conf import settings

def mode_details(request):
    try:
        parts = request.path.strip('/').split('/')
        url = ('/%s/'%('/'.join(parts[0:2])))
        data = request.path.split("/")
        access_type = ''
        return { 'app': data[1], 
                 'prefix':data[2], 
                 'mode':data[3],
                 'access_type':access_type,
                }
    except:
    	return { 'app': "", 
                 'prefix':"", 
                 'mode':"",
                 'access_type':"" }
