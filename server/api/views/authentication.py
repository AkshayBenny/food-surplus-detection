import datetime
from datetime import datetime, timedelta

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import (CustomUser, Otp, TempUser)


@api_view(['POST'])
def request_otp(request):
	phone = request.data.get('phone', False)
	request_id = request.data.get('request_id', False)
	email = request.data.get('email', False)
	name = request.data.get('name', False)
	user_type = request.data.get('user_type', False)
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
				tempuser = TempUser.objects.create(
						email = email,
						name = name,
						phone = phone,
						user_type = user_type,
				)
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
				"message": "incomplete request"
		}
		return Response(response)


@api_view(['POST'])
def login_verify(request):
	phone = request.data.get('phone', False)
	code = request.data.get('code', False)
	request_id = request.data.get('request_id', False)
	if phone and code and request_id:
		try:
			if CustomUser.objects.filter(phone = phone).exists():
				user = CustomUser.objects.get(phone = phone)
				if Otp.objects.filter(
						requested_by = user, code = code, request_id = request_id,
						verified = False
				).exists():
					otp = Otp.objects.filter(
							requested_by = user, code = code, request_id = request_id,
							verified = False
					).first()
					otp.verified = True
					date_from = datetime.now() - timedelta(days = 1)
					otp.created__gte = date_from
					otp.save()
					user_details = {
							'id': user.id,
							'name': user.name,
							'email': user.email,
							'phone': user.phone,
					}
					if user.user_type == 0:
						user_details['user_type'] = "Admin"
					elif user.user_type == 1:
						user_details['user_type'] = "Individual"
					elif user.user_type == 2:
						user_details['user_type'] = "Business"
					else:
						user_details['user_type'] = "NGO"
					refresh = RefreshToken.for_user(user)
					context = {
							'status': 'success',
							'message': 'Login successful',
							'refresh': str(refresh),
							'access': str(refresh.access_token),
							'user': user_details
					}
				else:
					context = {
							'status': 'error',
							'message': 'Otp verification failed',
					}
			else:
				context = {
						'status': 'error',
						'message': 'User not found'
				}
			return Response(context)
		except Otp.DoesNotExist:
			context = {
					'status': 'error',
					'message': 'Otp verification failed',
			}
			return Response(context)
		except CustomUser.DoesNotExist:
			context = {
					'status': 'error',
					'message': 'User not found'
			}
			return Response(context)
	else:
		response = {
				"status": "error",
				"message": "incomplete request"
		}
		return Response(response)


@api_view(['POST'])
def signup_verify(request):
	phone = request.data.get('phone')
	code = request.data.get('code')
	request_id = request.data.get('request_id')
	if phone and code and request_id:
		try:
			date_from = datetime.now() - timedelta(days = 1)
			if Otp.objects.filter(
					request_id = request_id, code = code, verified = False,
					temp_user__phone = phone
			).exists():
				otp = Otp.objects.filter(
						request_id = request_id, code = code, verified = False,
						temp_user__phone = phone
				).first()
				otp.verified = True
				otp.created__gte = date_from
				otp.save()
				print('before temp')
				tempuser = otp.temp_user
				new_user = CustomUser.objects.create(
						email = tempuser.email,
						name = tempuser.name,
						phone = tempuser.phone,
						user_type = tempuser.user_type,
				)
				new_user.save()
				tempuser.verified = True
				tempuser.deleted = True
				tempuser.save()
				otp.requested_by = new_user
				otp.save()
				user_details = {
						'id': new_user.id,
						'name': new_user.name,
						'email': new_user.email,
						'phone': new_user.phone,
				}
				if new_user.user_type == 0:
					user_details['user_type'] = "Admin"
				elif new_user.user_type == 1:
					user_details['user_type'] = "Individual"
				elif new_user.user_type == 2:
					user_details['user_type'] = "Business"
				else:
					user_details['user_type'] = "NGO"
				refresh = RefreshToken.for_user(new_user)
				context = {
						'status': 'success',
						'message': 'OTP Verified and logged in!',
						'user': user_details,
						'refresh': str(refresh),
						'access': str(refresh.access_token),
				}
			elif Otp.objects.filter(
					request_id = request_id, code = code, verified = True,
					requested_by__phone = phone
			).exists():
				context = {
						'status': 'error',
						'message': 'User already exists, Please login'
				}
			else:
				context = {
						'status': 'error',
						'message': 'Otp verification failed',
				}
			return Response(context)
		except Otp.DoesNotExist:
			context = {
					'status': 'error',
					'message': 'Otp verification failed',
			}
			return Response(context)
		except CustomUser.DoesNotExist:
			context = {
					'status': 'error',
					'message': 'User not found'
			}
			return Response(context)
	else:
		response = {
				"status": "error",
				"message": "incomplete request"
		}
		return Response(response)
