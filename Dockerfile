FROM ubuntu
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN mkdir test
ADD . /test
WORKDIR /test
RUN npm i
CMD nohup nodejs src/app.js >> server.log &


