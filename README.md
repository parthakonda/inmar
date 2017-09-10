
# inmar
inmar project

# Deployment Guide

The following steps are for the Ubuntu 

## Setup AWS Instance/other

    I've configure basic ec2(t2.micro) of ununtu server (16.2) AMI

## Install system requirements
    1. sudo apt-get update
    2. sudo apt-get install build-essential python-dev libpq-dev
    
## Install Postgers
    3. sudo apt-get install postgresql postgresql-contrib

## Install Redis
    4. sudo apt-get install redis-server

## Install Rabbitmq
    5. sudo apt-get install rabbitmq-server

## Install Supervisor
    6. sudo apt-get install supervisor

## Install Nginx
    7. sudo apt-get install nginx

## Configure database
    8. sudo -u postgres psql postgres
       `
        create database inmar;
        create user inmar with encrypted password 'inmar';
        \q
       ' 
## Install pip
    9. sudo apt-get install python-pip

## Install virtualenv
    10. sudo pip install virtualenv
        
    Note: Incase if you get any error then
        `export LC_ALL=C`
    
## Create&activate virtualenv
    mkdir env
    virtualenv inmar
    source inmar/bin/activate
    cd ~

## Clone the code
    11. git clone https://github.com/parthz/inmar.git
        cd inmar

## Prepare .env
    Note: you need to create a `.env` file to hold the configuration of the following
    
    Your `~/inmar/inmar/.env` should like following

    AWS_ACCESS_KEY_ID=<aws_access_key>
    AWS_SECRET_ACCESS_KEY=<aws_secret_key>
    AWS_SECRET_ACCESS_KEY=<s3_bucket_name>
    TORNADO_URL=http://127.0.0.1:8002/notify
    DB_NAME=<db_name>
    DB_USER=<db_user>
    DB_PASSWORD=<db_pass>
    DB_HOST=<db_host>
    DB_PORT=<db_port>
    REDIS_LOCATION=127.0.0.1:6379:1

## Install requirements.txt
    cd ~/inmar/inmar/
    pip install -r requirements.txt

## Makemigrations
    source ~/inmar/inmar/.env
    python manage.py makemigrartions

## Migrate
    python manage.py migrate

## Collect static 
    python manage.py collectstatic

## Create Log file
   cd ~
   mkdir Logs
   cd Logs
   touch inmar-webserver.log
   touch inmar-worker.log
   touch inmar-tornado.log
   touch nginx-access.log
   touch nginx-error.log

## Deploy
    sudo ln -s ~/inmar/deploy/web/gunicorn.conf /etc/supervisor/conf.d/
    sudo ln -s ~/inmar/deploy/worker/worker.conf /etc/supervisor/conf.d/
    sudo ln -s ~/inmar/deploy/tornado/tornado.conf /etc/supervisor/conf.d/
    sudo ln -s ~/inmar/deploy/nginx /etc/nginx/site-enabled/
    
    sudo rm /etc/nginx/sites-enabled/default

    sudo supervisorctl reread
    sudo supervisorctl update
    sudo supervisorctl restart all

## Hit the URL
    If everything works fine then you should be able to see the app