

from django.urls import include, path
from api.views import authentication

urlpatterns = [
		path('get_otp/', authentication.get_otp),
]
