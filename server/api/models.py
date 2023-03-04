from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, AbstractUser, PermissionsMixin
from django.contrib.gis.db import models as postgis
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


# Create your models here.
class CustomUserManager(BaseUserManager):
	
	def create_user(self, phone, password, **extra_fields):
		if not phone:
			raise ValueError('Phone number must be set')
		user = self.model(phone = phone, **extra_fields)
		user.set_password(password)
		user.save()
		return user
	
	def create_superuser(self, phone, password, **extra_fields):
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		extra_fields.setdefault('is_active', True)
		
		if extra_fields.get('is_staff') is not True:
			raise ValueError(_('Superuser must have is_staff=True.'))
		if extra_fields.get('is_superuser') is not True:
			raise ValueError(_('Superuser must have is_superuser=True.'))
		return self.create_user(phone, password, **extra_fields)


class CustomUser(AbstractUser):
	TYPE_CHOICES = (
			(0, 'Admin'),
			(1, 'Individual'),
			(2, 'Business'),
			(3, 'NGO'),
	)
	first_name = None
	last_name = None
	user_permissions = None
	groups = None
	username = None
	email = models.EmailField(unique = True, error_messages = "Already used email")
	name = models.CharField(max_length = 200)
	phone = models.CharField(unique = True, error_messages = "Already used phone", max_length = 12)
	user_type = models.IntegerField(default = 1, choices = TYPE_CHOICES)
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	USERNAME_FIELD = 'phone'
	REQUIRED_FIELDS = []
	objects = CustomUserManager()
	
	def __str__(self):
		return str(self.name) + " - " + str(self.email)
	
	class Meta:
		db_table = 'user_table'


class TempUser(models.Model):
	
	TYPE_CHOICES = (
			(0, 'Admin'),
			(1, 'Individual'),
			(2, 'Business'),
			(3, 'NGO'),
	)
	
	email = models.EmailField(unique = True)
	name = models.CharField(max_length = 100)
	phone = models.CharField(max_length = 50)
	user_type = models.IntegerField(default = 1, choices = TYPE_CHOICES)
	verified = models.BooleanField(default = False)
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	def __str__(self):
		if self.name:
			return self.name
	
	class Meta:
		db_table = 'temp_user_table'


class Otp(models.Model):
	code = models.IntegerField()
	request_id = models.CharField(max_length = 20)
	requested_by = models.ForeignKey(CustomUser, on_delete = models.CASCADE, null = True, blank = True)
	temp_user = models.ForeignKey(TempUser, on_delete = models.CASCADE, null = True, blank = True)
	verified = models.BooleanField(default = False)
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	def __str__(self):
		return f"code{self.id}"
	
	class Meta:
		db_table = 'otp_table'


class Individual(models.Model):
	user = models.OneToOneField(CustomUser, on_delete = models.CASCADE)
	name = models.CharField(max_length = 100)
	about = models.TextField()
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	class Meta:
		db_table = 'individual_table'


class Address(models.Model):
	user = models.ForeignKey(Individual, on_delete = models.CASCADE)
	name = models.CharField(max_length = 100)
	address = models.CharField(max_length = 255)
	point = postgis.PointField(null = True, blank = True)
	about = models.TextField()
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	class Meta:
		db_table = 'address_table'


class Business(models.Model):
	user = models.OneToOneField(CustomUser, on_delete = models.CASCADE)
	name = models.CharField(max_length = 100)
	about = models.TextField()
	point = postgis.PointField(null = True, blank = True)
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	class Meta:
		db_table = 'business_table'


class NGO(models.Model):
	user = models.OneToOneField(CustomUser, on_delete = models.CASCADE)
	name = models.CharField(max_length = 100)
	about = models.TextField()
	point = postgis.PointField(null = True, blank = True)
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	class Meta:
		db_table = 'ngo_table'


class SurplusRequest(models.Model):
	
	FOOD_TYPE_CHOICES = (
			(0, 'Veg'),
			(1, 'Non-Veg'),
			(2, 'Other'),
	)
	
	created_user = models.OneToOneField(CustomUser, on_delete = models.CASCADE)
	address = models.ForeignKey(Address, on_delete = models.CASCADE, null = True, blank = True)
	food_type = models.IntegerField(choices = FOOD_TYPE_CHOICES)
	feedable_count = models.IntegerField()
	prepared_at = models.DateTimeField()
	is_active = models.BooleanField(default = True)
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	class Meta:
		db_table = 'surplus_request_table'
	
	def clean(self):
		if self.created_user.user_type == 1 and self.address == None:
			raise ValidationError('You should enter Individual\'s address')


class SurplusChild(models.Model):
	
	PICKUP_STATUS_CHOICES = (
			(0, "Accepted"),
			(1, "On the Way"),
			(2, "Picked Up"),
			(3, "Delivering"),
			(4, "Leftover"),
			(5, "Delivered"),
			(6, "Cancelled"),
	)
	
	surplus_request = models.ForeignKey(SurplusRequest, on_delete = models.CASCADE)
	pickup_user = models.OneToOneField(CustomUser, on_delete = models.CASCADE, null = True, blank = True)
	pickup_status = models.IntegerField(choices = PICKUP_STATUS_CHOICES)
	leftover_count = models.IntegerField()
	created = models.DateTimeField(default = timezone.now)
	is_deleted = models.BooleanField(default = False)
	
	def clean(self):
		if self.pickup_user.user_type != 3:
			raise ValidationError("Pickup can't be done by non NGO!")
		if self.pickup_status == 4 and self.leftover_count == None:
			raise ValidationError("Enter leftover count")
	
	class Meta:
		db_table = 'surplus_request_child_table'
