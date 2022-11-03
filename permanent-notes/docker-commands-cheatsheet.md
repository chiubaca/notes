. ---
title: Docker Commands Cheatsheet
publish_date: 20221101
last_updated: 20221101
description: Docker Commands Cheatsheet
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---


`docker ps -a` - list all installed containers

`docker rm <node-container-name>` - remove a container

`docker stop <node-container-name>` - stop a container

`docker image ls -a` - list all docker image

`docker build . -t <image-name>` - build from a dockerfile in the current directory with a given name if `-t <image-name>` is not provided a random has as provided


`docker run -p <hostport>:<exposed-docker-port> -d <image-name> --name <container-name>`  -  run a given image in detatched mode


`docker exec -it <container-name> bash `   - enter a running container in a interactive bash mode