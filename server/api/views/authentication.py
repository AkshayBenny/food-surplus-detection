from random import randint

from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import (CustomUser, Otp, TempUser)


@api_view(['POST'])
def get_otp(request):
	phone = request.data.get('phone', False)
	request_id = request.data.get('request_id', False)
	if phone and request_id:
		try:
			user = CustomUser.objects.get(phone = phone)
			if Otp.objects.filter(request_id = request_id, requested_by__phone = phone, verified = False).exists():
				code = str(5555)
				context = {
						'status': 'Success',
						'message': 'Login OTP Send!',
						'route': 'login'
				}
				return Response(context)
			else:
				code = str(5555)
				otp = Otp(requested_by = user, code = code, request_id = request_id)
				otp.save()
				context = {
						'status': 'success',
						'message': 'Login OTP Send!',
						'route': 'login'
				}
				return Response(context)
		except CustomUser.DoesNotExist:
			if Otp.objects.filter(temp_user__phone = phone, request_id = request_id, verified = False).exists():
				context = {
						'status': 'Success',
						'message': 'Signup OTP Send!',
						'route': 'signup'
				}
				return Response(context)
			else:
				tempuser = TempUser.objects.create(phone = phone)
				otp = Otp()
				otp.temp_user = tempuser
				otp.request_id = request_id
				code = 5555
				otp.code = code
				otp.save()
				context = {
						'status': 'success',
						'message': 'Signup OTP Send!',
						'route': 'signup'
				}
			return Response(context)
	else:
		response = {
				"status": "error",
				"error_code": 0,
				"message": "incomplete request"
		}
		return Response(response)
