from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from api.views import authentication, home

urlpatterns = [
		
		# ---------------------------------------------- Authentication -----------------------------------------------
		path('request_otp/', authentication.request_otp, name = 'api-v1-request_otp'),
		path('login_verify/', authentication.login_verify, name = 'api-v1-login_verify'),
		path('signup_verify/', authentication.signup_verify, name = 'api-v1-signup_verify'),
		path('token_refresh/', jwt_views.TokenRefreshView.as_view(), name = 'api-v1-token_refresh'),
		
		# ---------------------------------------------- Home -----------------------------------------------
		path('', home.home_view, name = 'api-v1-home'),
		path('get_address/', home.get_address, name = 'api-v1-get_address'),
		path('add_address/', home.add_address, name = 'api-v1-add_address'),
		path('surplus_request/', home.surplus_request, name = 'api-v1-surplus_request'),

]
