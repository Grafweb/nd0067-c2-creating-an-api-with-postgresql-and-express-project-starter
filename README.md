# Project Title

Storefront Backend Project

## Description

Simple Backend Project gaves you API.

## Getting Started

### Dependencies

- Before you start you need to instal 
  Node 
  npm 
  docker 

### Installing
- You need install docker compose from file docker-compose.yml
- You need to write npm i
- .env file has data for configuration. You need put there own data.
  You need focus on variable ENV, because default assign dev for devlopment version with base dev postgresql. When you want run test you should assign 'test';

  Env configuration file example:

  POSTGRES_USER=dsikorski // set postgress user
  POSTGRES_DB=book // set name main database
  POSTGRES_DB_TEST=book_test // set name test database
  POSTGRES_PASSWORD=dsikorski // set password main database
  POSTGRES_HOST=127.0.0.1 // set host url
  ENV=dev // set mode dev or test
  TOKEN_SECRET=$2y$10$2RCRskye20BV6OgSQ4.iEuyO2Y6He8qHrBRGetEOr9JpCaGimxf3W // your token for authenticate

  When you did that. You need cofigure file docker-compose.yml
  services:
  postgres:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: dsikorski // set postgress user
      POSTGRES_PASSWORD: dsikorski // set postgress password
      POSTGRES_DB: book // set database name
    ports:
      - '5432:5432' // set port
    volumes:
      - data:/var/lib/postgresql/data
  postgres_test:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: dsikorski  // set postgress user
      POSTGRES_PASSWORD: dsikorski // set postgress password
      POSTGRES_DB: book_test // set database name
    ports:
      - '5432:5432' //set port
    volumes:
      - data2:/var/lib/postgresql/data
    volumes:
      data:
      data2:


### Executing program

- How to run the program
- Notice: app has two mode development and test. When you want to run some mode you need run conatniner in docker with right version which has right base for example dev mode.

```
npm run watch  - for develop version
npm run start - for production version
npm run test - for test version (remeber switch in docker)
npm run format:check - prettier check folder src
npm run format:write - prettier write folder src
npm run lint:check - lint check folder src
npm run format:fix - lint write folder src

port number for app is 3000
port for database is 5432

```

## Authors

Dariusz Sikorski

## License

This project is licensed under the Dariusz Sikorski
