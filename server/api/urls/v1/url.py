from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from api.views import authentication

urlpatterns = [
		
		path('request_otp/', authentication.request_otp, name = 'api-v1-otp-request'),
		path('login_verify/', authentication.login_verify, name = 'api-v1-login-verify'),
		path('signup_verify/', authentication.signup_verify, name = 'api-v1-signup-verify'),
		path('token_refresh/', jwt_views.TokenRefreshView.as_view(), name = 'api-v1-token-refresh'),
]
