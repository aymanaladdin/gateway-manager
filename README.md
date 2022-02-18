# Gateway Manager

This sample project is managing gateways - master devices that control multiple peripheral devices

## Description

A simple REST service (JSON/HTTP) for storing information about gateways and their associated devices with a Basic UI to list and manage gateway devices. All information is stored in Mongo database.

## Getting Started

### Dependencies

* [node v16](https://nodejs.org/en/download/)
* [Docker](https://docs.docker.com/get-docker/)

### Installing

* Clone this repo
```Shell
git clone https://github.com/aymanaladdin/gateway-manager.git
```
* After clonning successfully switch to cloned repo dir and install deps
```Shell
cd ./gateway-namager && npm run install:all
```

### Executing program

### Adding .env files for both client and server

* create an `.env` file to `server` sub dir, you can replace values with your own specially mongo URI
```Shell
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/gateway-manager
```

* create an `.env` file to `client` sub dir, you can replace values with your own
```Shell
REACT_APP_API_URL = http://localhost:5000/api/v1
```

### DB Starting
* if you have a docker installed with docker-compose you could start the mongo container in `docker-compose.yaml` file via
```Shell
docker-compose up -d mongo
```
* To init start mongo with seeded data run the following cmd, this will create a collection with seeded data
 ```Shell
docker-compose up -d mongodb mongo-seed
```
* if you don't have installed docker you should download a [mongo client](https://www.mongodb.com/try/download/community) first and start it manually
* you could still able to seed data manually as well, open mongo shell from terminal and run the following cmd
```Shell
mongoimport --host localhost --port 27017 --db gateway-manager --collection gateways --mode upsert --type json --file /data/seeding/gateways.json --jsonArray
```

### Start app in dev mode

* to start app in development mode run the following cmd from root dir
```Shell
npm run dev
```
* this will start `client:react` app in development which you can access by default via `http:localhost:3000`
* also it will start `server:express` app in development which you can access by default via `http:localhost:5000`

### Start app in production

* Run the following command to run a bundled version of the app altogether 
```Shell
npm run start
```
* this command will build `client:react` and `server:express` apps and serve them from a single app by default `http:localhost:5000`

### Start app in production with docker

* Run the following command to run a bundled version of the app altogether 
```Shell
npm run docker:start
```
* this command will build both `client:react` and `server:express` apps, then start a docker container for the bundled app by default `http:localhost:5000`

## Help

* Make sure that you have a mongo client up and running otherwise the `server:express` app will fail to start, you can start it manually or via docker as described in `DB Starting section`
* Make sure that you added `.env` files in both `./server` and `./client` sub dirs otherwise processes will fail while starting

### Helpful scripts

* you can use `npm run dev:client` to run `client:react` app only
* you can use `npm run dev:server` to run `server:express` app only
* you can use `npm run build:client` to build `client:react` app and push the built files to `server:express` docs sub dir

## Technologies used
* [Docker](https://docs.docker.com/get-docker/)
* [nodeJs v16](https://nodejs.org/en/download/)
* [Joi](https://www.npmjs.com/package/joi/)
* [Mongoose](https://www.npmjs.com/package/mongoose/)
* [Express](https://www.npmjs.com/package/express/)
* [Typescript](https://nodejs.org/en/download/)
* [ReactJs](https://www.npmjs.com/package/react/)
* [MUI](https://www.npmjs.com/package/@mui/material/)

## License

This project is licensed under the [MIT] License
