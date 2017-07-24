#!/bin/sh

# [Baskoro Susanto] Script to run container image

sudo docker stop storage
sudo docker rm storage
sudo docker run -d --name="storage" -p 3301:3300 -v /var/cdn:/usr/src/app/upload 192.168.3.102:6000/storage-service