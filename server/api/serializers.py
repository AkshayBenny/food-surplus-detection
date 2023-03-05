from rest_framework import serializers

from api.models import Address, Business, CustomUser, NGO, SurplusChild, SurplusRequest


class HomeSurplusRequestsSerializer(serializers.ModelSerializer):
	pickup_user = serializers.SerializerMethodField()
	pickup_status = serializers.SerializerMethodField()
	leftover_count = serializers.SerializerMethodField()
	pickup_org = serializers.SerializerMethodField()
	
	def get_pickup_user(self, instance):
		try:
			sr = SurplusChild.objects.get(surplus_request = instance, is_deleted = False)
			if sr.pickup_user:
				return sr.pickup_user.name
			else:
				return "None"
		except SurplusChild.DoesNotExist:
			return "not found"
	
	def get_pickup_org(self, instance):
		try:
			sr = SurplusChild.objects.get(surplus_request = instance, is_deleted = False)
			sr_data = NGO.objects.get(user = sr.pickup_user, is_deleted = False)
			if sr_data.name:
				return sr_data.name
			else:
				return "None"
		except SurplusChild.DoesNotExist:
			return "not found"
	
	def get_pickup_status(self, instance):
		try:
			sr = SurplusChild.objects.get(surplus_request = instance, is_deleted = False)
			if sr.pickup_status == 0:
				return "Accepted"
			if sr.pickup_status == 1:
				return "On the Way"
			if sr.pickup_status == 2:
				return "Picked Up"
			if sr.pickup_status == 3:
				return "Delivering"
			if sr.pickup_status == 4:
				return "Leftover"
			if sr.pickup_status == 5:
				return "Delivered"
			if sr.pickup_status == 6:
				return "Cancelled"
		except SurplusChild.DoesNotExist:
			return "not found"
	
	def get_leftover_count(self, instance):
		try:
			sr = SurplusChild.objects.get(surplus_request = instance, is_deleted = False)
			if sr.leftover_count:
				return int(sr.leftover_count)
			else:
				return 0
		except SurplusChild.DoesNotExist:
			return "not found"
	
	class Meta:
		model = SurplusRequest
		fields = ['id', 'created_user', 'address', 'food_type', 'feedable_count', 'prepared_at', 'pickup_user',
		          'pickup_org', 'pickup_status', 'leftover_count', 'is_active', 'created']


class CreatedUserNgoSerializer(serializers.ModelSerializer):
	class Meta:
		model = CustomUser
		fields = ['id', 'email', 'name', 'phone', 'user_type', ]


class AddressIndividualSerializer(serializers.ModelSerializer):
	class Meta:
		model = Address
		fields = ['id', 'name', 'address', 'point', 'about', ]


class HomeNgoSurplusSerializer(serializers.ModelSerializer):
	created_user = CreatedUserNgoSerializer()
	address = AddressIndividualSerializer()
	
	class Meta:
		models = SurplusRequest
		fields = ['id', "created_user", "address", "food_type", "feedable_count", "prepared_at", "is_active",
		          "created", ]


class NGOSerializer(serializers.ModelSerializer):
	latitude = serializers.SerializerMethodField()
	longitude = serializers.SerializerMethodField()
	
	def get_latitude(self, instance):
		return instance.point.y
	
	def get_longitude(self, instance):
		return instance.point.x
	
	class Meta:
		model = NGO
		fields = ['id', "name", "about", "latitude", "longitude", "created"]


class HomeSurplusRequestsNgoSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = SurplusRequest
		fields = ['id', 'created_user', 'address', 'food_type', 'feedable_count', 'prepared_at', 'is_active',
		          'created']


class CreateSurplusRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = SurplusRequest
		fields = ['created_user', 'address', 'food_type', 'feedable_count', 'prepared_at', ]


class FetchAddressSerializer(serializers.ModelSerializer):
	latitude = serializers.SerializerMethodField()
	longitude = serializers.SerializerMethodField()
	
	def get_latitude(self, instance):
		return instance.point.y
	
	def get_longitude(self, instance):
		return instance.point.x
	
	class Meta:
		model = Address
		fields = ['id', 'name', 'address', 'about', 'latitude', 'longitude', ]


class CreatAddressSerializer(serializers.ModelSerializer):
	latitude = serializers.SerializerMethodField()
	longitude = serializers.SerializerMethodField()
	
	def get_latitude(self, instance):
		return instance.point.y
	
	def get_longitude(self, instance):
		return instance.point.x
	
	class Meta:
		model = Address
		fields = ['user', 'name', 'address', 'about', 'latitude', 'longitude']


class FetchBusinessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Business
		fields = '__all__'


class FetchNGOSerializer(serializers.ModelSerializer):
	class Meta:
		model = NGO
		fields = '__all__'
