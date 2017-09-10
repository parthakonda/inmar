#!/bin/bash

TORNADODIR=/home/ubuntu/inmar/inmar/services # Django project directory
OS_ENV=/home/ubuntu/inmar/inmar/.env
VIRTUAL_ENV_DIR=/home/ubuntu/env/inmar
DJANGO_SETTINGS_MODULE=sunrisebilling.settings.prod # which settings file should Django use
echo "Starting Tornado"

# Loading Environment Variables
while read line; do export "$line";
done < $OS_ENV
 
# Activate the virtual environment
cd $VIRTUAL_ENV_DIR/
source bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$TORNADODIR:$PYTHONPATH
 
# start celery worker
cd $TORNADODIR
exec python tornado_server.py 8002
