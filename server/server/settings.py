from django.utils.translation import gettext_lazy as _
from decouple import config, Csv
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

AUTH_USER_MODEL = 'users.User'

DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())
SECRET_KEY = config('SECRET_KEY')
USE_CONSOLE_EMAIL = config('USE_CONSOLE_EMAIL', default=True, cast=bool)
PRODUCTION = config('PRODUCTION', default=False, cast=bool)


# DB
USE_PROD_DB = config('USE_PROD_DB', cast=bool)
DB_USER = config('DB_USER')
DB_NAME = config('DB_NAME')
DB_PASSWORD = config('DB_PASSWORD')
DB_HOST = config('DB_HOST')
DB_PORT = config('DB_PORT')


if PRODUCTION:
	CSRF_COOKIE_SECURE = True


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

if USE_PROD_DB:
	DATABASES = {
		'default': {
			'ENGINE': 'django.db.backends.oracle',
			'NAME': DB_NAME,
			'USER': DB_USER,
			'PASSWORD': DB_PASSWORD,
			# 'HOST': DB_HOST,
			# 'PORT': DB_PORT,
		}
    }
else:
	DATABASES = {
		'default': {
			'ENGINE': 'django.db.backends.mysql',
			'NAME': DB_NAME,
			'USER': DB_USER,
			'PASSWORD': DB_PASSWORD,
			'HOST': DB_HOST,
			'PORT': DB_PORT,
		}
    }


if USE_CONSOLE_EMAIL:
	# Values used here are the default

	EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
	DEFAULT_FROM_EMAIL = 'webmaster@localhost'
	# The email address that error messages come from, such as those sent to ADMINS and MANAGERS.
	SERVER_EMAIL = 'root@localhost'

	# ADMINS and MANAGERS are only used when DEBUG=False
	# A list of all the people who get code error notifications. 
	# When DEBUG=False and AdminEmailHandler is configured in LOGGING (done by default), 
	# Django emails these people the details of exceptions raised in the request/response cycle
	ADMINS = []

	# A list in the same format as ADMINS that specifies who should get
	# broken link notifications when BrokenLinkEmailsMiddleware is enabled.
	MANAGERS = []
else:
	# TODO  set up email
	# EMAIL_HOST = config('EMAIL_HOST', default='localhost')
	# EMAIL_PORT = config('EMAIL_PORT', default=25, cast=int)
	# EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
	# EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
	# EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=False, cast=bool)
	ADMINS = [('John', 'john@example.com'), ('Mary', 'mary@example.com')]
	MANAGERS = []



# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'corsheaders',
    'rest_framework',
    # We won't use token auth but we need this app. 
    # See github.com/sunscrapers/djoser/issues/373#issuecomment-484547905
    'rest_framework.authtoken',
    'djoser',

    'users',
    'time_table',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'


# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


## rest_framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
       'rest_framework.permissions.IsAuthenticatedOrReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 15

}

## djoser
DJOSER = {
    'CREATE_SESSION_ON_LOGIN': True,
    'PASSWORD_RESET_CONFIRM_URL': _('#/password/reset/confirm/{uid}/{token}'),
    'USERNAME_RESET_CONFIRM_URL': _('#/username/reset/confirm/{uid}/{token}'),
    'ACTIVATION_URL': _('#/activate/{uid}/{token}'),
	'USERNAME_RESET_CONFIRM_URL': _('#/username-reset/{uid}/{token}'),
    'SEND_ACTIVATION_EMAIL': True,
}

## cors headers
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3001",
    "http://localhost:3000"
]

CORS_ALLOW_CREDENTIALS = True

