from datetime import timedelta

from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import (Address, Business, CustomUser, NGO, SurplusChild, SurplusRequest)
from api.serializers import (
	CreatAddressSerializer, CreateSurplusRequestSerializer, FetchAddressSerializer, FetchBusinessSerializer,
	FetchNGOSerializer, HomeSurplusRequestsNgoSerializer,
	HomeSurplusRequestsSerializer, NGOSerializer,
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home_view(request):
	user = CustomUser.objects.get(id = request.user.id, is_deleted = False)
	user_data = {}
	user_data['id'] = user.id
	user_data['email'] = user.email
	user_data['name'] = user.name
	user_data['phone'] = user.phone
	user_data['user_type_number'] = user.user_type
	if user.user_type == 0:
		user_data['user_type'] = "Admin"
	if user.user_type == 1:
		user_data['user_type'] = "Individual"
	if user.user_type == 2:
		user_data['user_type'] = "Business"
	if user.user_type == 3:
		user_data['user_type'] = "NGO"
	if request.user.user_type == 1 or request.user.user_type == 2:
		surplus_requests = SurplusRequest.objects.filter(created_user = user, is_deleted = False).order_by('-created')
		surplus_request_serializer = HomeSurplusRequestsSerializer(surplus_requests, many = True).data
		response = {
				"message": "success",
				"user_data": user_data,
				"surplus_requests": surplus_request_serializer
		}
		return Response(response)
	if request.user.user_type == 3:
		ngo = NGO.objects.get(user = request.user, is_deleted = False)
		ngo_details = NGOSerializer(ngo).data
		sr = SurplusRequest.objects.filter(
				prepared_at__gt = timezone.now() - timedelta(hours = 12),
				is_deleted = False, is_active = True,
		)
		src_list = []
		for s in sr:
			src_dict = {}
			sr_child = SurplusChild.objects.filter(
					pickup_user = request.user, pickup_status__in = [0, 1, 2, 3, 5],
					surplus_request = s
			)
			surplus_request_serializer = HomeSurplusRequestsNgoSerializer(s, many = False).data
			src_dict['surplus_request'] = surplus_request_serializer
			if sr_child:
				src = sr_child.first()
				if src.pickup_status == 0:
					src_dict['pickup_status'] = "Accepted"
				if src.pickup_status == 1:
					src_dict['pickup_status'] = "On the Way"
				if src.pickup_status == 2:
					src_dict['pickup_status'] = "Picked Up"
				if src.pickup_status == 3:
					src_dict['pickup_status'] = "Delivering"
				if src.pickup_status == 4:
					src_dict['pickup_status'] = "Leftover"
				if src.pickup_status == 5:
					src_dict['pickup_status'] = "Delivered"
				if src.pickup_status == 6:
					src_dict['pickup_status'] = "Cancelled"
				src_dict['leftover_count'] = src.leftover_count
				src_list.append(src_dict)
			else:
				continue
		response = {
				"message": "success",
				"user_data": user_data,
				"ngo_details": ngo_details,
				"surplus_details": src_list
		}
		return Response(response)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_address(request):
	if request.user.user_type == 1:
		addresses = Address.objects.filter(user = request.user, is_deleted = False)
		address_serializer = FetchAddressSerializer(addresses, many = True).data
		response = {
				"message": "success",
				"address_serializer": address_serializer,
		}
		return Response(response)
	elif request.user.user_type == 2:
		business = Business.objects.filter(user = request.user, is_deleted = False)
		if business:
			b = business.first()
			b_serializer = FetchBusinessSerializer(b).data
			response = {
					"status": "success",
					"business": b_serializer
			}
			return Response(response)
		else:
			response = {
					"status": "error",
					"message": "business profile did not set"
			}
			return Response(response)
	elif request.user.user_type == 3:
		ngos = NGO.objects.filter(user = request.user, is_deleted = False)
		if ngos:
			ngo = ngos.first()
			ngo_serializer = FetchNGOSerializer(ngo).data
			response = {
					"status": "success",
					"ngo": ngo_serializer
			}
			return Response(response)
		else:
			response = {
					"status": "error",
					"message": "ngo profile did not set"
			}
			return Response(response)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_address(request):
	create_individual_address = CreatAddressSerializer(data = request.data)
	if create_individual_address.is_valid():
		create_individual_address.save()
		response = {
				"status": "success",
				"message": "Individual Address Created",
		}
		return Response(response)
	else:
		response = {
				"status": "error",
				"message": "error occurred while creating Individual Address",
				"errors": create_individual_address.errors
		}
		return Response(response)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def surplus_request(request):
	create_surplus_request = CreateSurplusRequestSerializer(data = request.data)
	if create_surplus_request.is_valid():
		create_surplus_request.save()
		response = {
				"status": "success",
				"message": "Surplus Request Created",
		}
		return Response(response)
	else:
		response = {
				"status": "error",
				"message": "error occurred while creating surplus request",
				"errors": create_surplus_request.errors
		}
		return Response(response)
