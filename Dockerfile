FROM ubuntu
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN mkdir test
ADD . /
ENTRYPOINT npm i
ENTRYPOINT nodejs src/app.js


