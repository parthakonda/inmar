# Author: Partha

from rest_framework import permissions

class OAuthPermission(permissions.BasePermission):
    """
    This is used to check if the request comes from OAuth then particual resource have permission or not "
    """

    def has_permission(self, request, view):
        if request.user is not None and request.user.is_authenticated():
            return True
        else:
            if request.auth is None:
                return False
            else:
                return True
        return False