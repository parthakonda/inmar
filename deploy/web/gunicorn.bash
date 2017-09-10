#!/bin/bash
 
NAME="inmar" # Name of the application
DJANGODIR=/home/ubuntu/inmar/inmar/ # Django project directory
OS_ENV=/home/ubuntu/inmar/inmar/.env
USER=ubuntu # the user to run as
NUM_WORKERS=3 # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=inmar.settings.prod # which settings file should Django use
DJANGO_WSGI_MODULE=inmar.wsgi # WSGI module name
VIRTUAL_ENV_DIR=/home/ubuntu/env/inmar
ADDRESS=0.0.0.0
PORT=8000
 
echo "Starting Django Server"

# Loading Environment Variables
while read line; do export "$line";
done < $OS_ENV
 
# Activate the virtual environment
cd $VIRTUAL_ENV_DIR/
source bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH
 
# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
cd $DJANGODIR
exec gunicorn ${DJANGO_WSGI_MODULE}:application \
--name $NAME \
--workers $NUM_WORKERS \
--worker-connections 4 \
--threads 3 \
--worker-class gevent \
--user=$USER \
--bind=$ADDRESS:$PORT \
--log-level=debug

echo "Django Server running on $ADDRESS:$PORT"
