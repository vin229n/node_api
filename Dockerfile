FROM ubuntu
RUN apt-get update
RUN apt-get install nodejs
RUN apt-get install npm
ADD . /test
ENTRYPOINT npm i 
ENTRYPOINT nodejs /test/src app.js

