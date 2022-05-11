from django.urls import path, include


app_name = 'users'


urlpatterns = [
    path('auth/', include('djoser.urls')),

]

## djoser available endpoints
# /users/
# /users/me/
# /users/confirm/
# /users/resend_activation/
# /users/set_password/
# /users/reset_password/
# /users/reset_password_confirm/
# /users/set_username/
# /users/reset_username/
# /users/reset_username_confirm/

