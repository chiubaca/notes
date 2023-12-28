---
title: Docker Commands Cheatsheet
publish_date: '2022-11-01'
last_updated: 20221101
description: Docker Commands Cheatsheet
status: draft
---


`docker ps -a` - list all installed containers

`docker rm <node-container-name>` - remove a container
`docker rm -f <node-container-name>`  - force remove
`docker rm -fv <node-container-name>`  - force remove and volumes too 

`docker stop <node-container-name>` - stop a container

`docker image ls -a` - list all docker image

`docker build . -t <image-name>` - build from a dockerfile in the current directory with a given name if `-t <image-name>` is not provided a random has as provided


`docker run -p <hostport>:<exposed-docker-port> -d <image-name> --name <container-name>`  -  run a given image in detatched mode


`docker exec -it <container-name> bash `   - enter a running container in a interactive bash mode


`docker compose -f docker-compose.dev.yml up` - reference a specific docker compose file , useful when you have multiple docker compose files for dev and and prod

