# Clients Favorites Products
> An API application to control client's favorites products.

## Installing

*Make sure to have [Git](http://git-scm.com/) and [Node.js](http://nodejs.org/) installed.*

*You will also need [mongoDB](https://www.mongodb.com/) but you can use it trhough [Docker](https://www.docker.com/) by the `docker-compose.yml`.*

1. Fork the repo and create a new branch — or just create a new branch if you have permissions.

2. Once you have your local copy, install its dependencies:

    ```sh
    npm install
    ```
3. Start [mongoDB](https://www.mongodb.com/) service OR run it using [Docker Compose](https://docs.docker.com/compose/):

    ```sh
    docker-compose up --build
    ```
    
    *It will run mongoDB service on `127.0.0.1:27017` but you can change it at `docker-compose.yml`.*
