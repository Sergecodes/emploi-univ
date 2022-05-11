
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('browser-api-auth/', include('rest_framework.urls')),
    path('api/', include('users.urls', namespace='users')),
    path('api/', include('time_table.urls', namespace='time_table')),

]
