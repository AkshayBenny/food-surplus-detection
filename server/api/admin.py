from django.contrib import admin

# Register your models here.
from api.models import (Address, Business, CustomUser, Individual, NGO, Otp, SurplusChild, SurplusRequest, TempUser)

admin.site.register(CustomUser)
admin.site.register(TempUser)
admin.site.register(Otp)
admin.site.register(Individual)
admin.site.register(Address)
admin.site.register(Business)
admin.site.register(NGO)
admin.site.register(SurplusRequest)
admin.site.register(SurplusChild)
