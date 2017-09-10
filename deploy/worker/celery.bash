#!/bin/bash

DJANGODIR=/home/ubuntu/inmar/inmar # Django project directory
OS_ENV=/home/ubuntu/inmar/inmar/.env
USER=ubuntu # the user to run as
CELERY_APP=inmar._celery #app module
VIRTUAL_ENV_DIR=/home/ubuntu/env/inmar
DJANGO_SETTINGS_MODULE=inmar.settings.prod # which settings file should Django use
CELERY_LOG_FILE=/home/ubuntu/Logs/inmar-worker.log
 
echo "Starting Celery"

# Loading Environment Variables
while read line; do export "$line";
done < $OS_ENV
 
# Activate the virtual environment
cd $VIRTUAL_ENV_DIR/
source bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH
 
# start celery worker
cd $DJANGODIR
exec celery worker -A ${CELERY_APP}:app -l info --logfile="$CELERY_LOG_FILE"
