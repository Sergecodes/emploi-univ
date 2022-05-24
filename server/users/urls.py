from django.urls import path, include


app_name = 'users'


urlpatterns = [
    path('', include('djoser.urls')),
    path('users/', include('djoser.urls.authtoken')),
    
]

## djoser available endpoints
# /users/
# /users/:id
# /users/me/
# /users/confirm/
# /users/resend_activation/
# /users/set_password/
# /users/reset_password/
# /users/reset_password_confirm/
# /users/set_username/
# /users/reset_username/
# /users/reset_username_confirm/

# api/ ^users/$ [name='user-list']
# api/ ^users\.(?P<format>[a-z0-9]+)/?$ [name='user-list']
# api/ ^users/activation/$ [name='user-activation']
# api/ ^users/activation\.(?P<format>[a-z0-9]+)/?$ [name='user-activation']
# api/ ^users/me/$ [name='user-me']
# api/ ^users/me\.(?P<format>[a-z0-9]+)/?$ [name='user-me']
# api/ ^users/resend_activation/$ [name='user-resend-activation']
# api/ ^users/resend_activation\.(?P<format>[a-z0-9]+)/?$ [name='user-resend-activation']
# api/ ^users/reset_password/$ [name='user-reset-password']
# api/ ^users/reset_password\.(?P<format>[a-z0-9]+)/?$ [name='user-reset-password']
# api/ ^users/reset_password_confirm/$ [name='user-reset-password-confirm']
# api/ ^users/reset_password_confirm\.(?P<format>[a-z0-9]+)/?$ [name='user-reset-password-confirm']
# api/ ^users/reset_username/$ [name='user-reset-username']
# api/ ^users/reset_username\.(?P<format>[a-z0-9]+)/?$ [name='user-reset-username']
# api/ ^users/reset_username_confirm/$ [name='user-reset-username-confirm']
# api/ ^users/reset_username_confirm\.(?P<format>[a-z0-9]+)/?$ [name='user-reset-username-confirm']
# api/ ^users/set_password/$ [name='user-set-password']
# api/ ^users/set_password\.(?P<format>[a-z0-9]+)/?$ [name='user-set-password']
# api/ ^users/set_username/$ [name='user-set-username']
# api/ ^users/set_username\.(?P<format>[a-z0-9]+)/?$ [name='user-set-username']
# api/ ^users/(?P<id>[^/.]+)/$ [name='user-detail']
# api/ ^users/(?P<id>[^/.]+)\
# api/users/token/login
# api/users/token/logout
