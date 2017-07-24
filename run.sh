#!/bin/sh

# [Baskoro Susanto] Script to run container image

sudo docker stop storage
sudo docker rm storage
sudo docker run -d --name="storage" -p -v /upload /var/www/cdn/v2 3301:3300 192.168.3.102:6000/storage-service