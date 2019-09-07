FROM ubuntu
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
ADD . /test
ENTRYPOINT npm i 
ENTRYPOINT nodejs /test/src app.js

