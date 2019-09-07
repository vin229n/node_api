FROM vin229n/node
ADD ./test /test
ENTRYPOINT node /test/src app.js
