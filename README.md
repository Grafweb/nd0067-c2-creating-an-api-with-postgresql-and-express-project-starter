# Project Title

Storefront Backend Project

## Description

Simple Backend Project gaves you API.

## Getting Started

### Dependencies

- Before you start you need to instal Node and npm and docker with postgresql. You need install docker compose form file docker-compose.yml

### Installing

- You need to write npm i
- .env file has data for configuration. You need put there own data.
  You need focus on variable ENV, because default assign dev for devlopment version with base dev postgresql. When you want run test you should assign 'test';

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

You can run API backend like this http://localhost:3000/books

```

## Authors

Dariusz Sikorski

## License

This project is licensed under the Dariusz Sikorski
