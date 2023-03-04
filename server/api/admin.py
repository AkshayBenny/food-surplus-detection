from django.contrib import admin

# Register your models here.
from api.models import (
	CustomUser, TempUser, Otp, Individual, Address, Business, NGO, SurplusRequest, SurplusChild,
)

admin.site.register(CustomUser)
admin.site.register(TempUser)
admin.site.register(Otp)
admin.site.register(Individual)
admin.site.register(Address)
admin.site.register(Business)
admin.site.register(NGO)
admin.site.register(SurplusRequest)
admin.site.register(SurplusChild)
