# Clients Favorites Products
> An API application to control client's favorites products.

## Installation

*Make sure to have [Git](http://git-scm.com/) and [Node.js](http://nodejs.org/) 10.0.0 (or higher) installed.*

*You will also need [mongoDB](https://www.mongodb.com/) but you can run it trhough [Docker](https://www.docker.com/) by the `docker-compose.yml`.*

1. Fork the repo and create a new branch — or just create a new branch if you have permissions.

2. Once you have your local copy, install its dependencies:

    ```sh
    npm install
    ```
    
3. Start [mongoDB](https://www.mongodb.com/) service — or run it using [Docker Compose](https://docs.docker.com/compose/):

    ```sh
    docker-compose up --build
    ```
    
    *It will run mongoDB service on `127.0.0.1:27017` but you can change it at `docker-compose.yml`.*

4. Create an `.env` file on the root directory, you can set this options:

    ```sh
    PORT=3000
    TOKEN_SECRET=luizalabssupersecret
    DATABASE_URL=mongodb://127.0.0.1:27017
    DATABASE_NAME=clients_favorites_products
    ```
    
    *`TOKEN_SECRET` is mandatory.*

## Running

After installed, you can start the application by running:

```sh
npm start
```

*This will start the server at `localhost:3000` (if you didn't change the `PORT` property on `.env`)*

### Development

You can also run you application in development mode:

```sh
npm run dev
```

*This will restart the application and apply the new code on every save.*

## Migration

You can populate the mongoDB with some clients by running:

```sh
npm run migrate-up
```

To remove the applied migration:

```sh
npm run migrate-down
```

## Tests

*All test files are located in `__tests__` folder*

Use the following command to run the tests:

```sh
npm test
```

## API's

### Login

##### `POST`: `/api/login`

Do login and provides the authentication token *(necessary to access the others APIs)*:

```json
{
    "user": "luiza",
    "pass": "labs"
}
```

*The returned token must be sent on the next API's headers `X-Access-Token`.*

### Clients

*Auth token need to be sent on `X-Access-Token` header.*

##### `GET`: `/api/client/?page=<PAGE_NUMBER>`

Get all clients.

##### `GET`: `/api/client/<CLIENT_ID>`

Get a client by `id`.

##### `POST`: `/api/client`

Create a new client:

```json
{
    "name": "Raoni Demarchi",
    "email": "raonidemarchi@gmail.com",
    "address": "Rua São Benedito, 94"
}
```

##### `PUT`: `/api/client/<CLIENT_ID>`

Update client information:

```json
{
    "name": "Raoni Costa",
    "email": "raonidemarchi@outlook.com",
    "address": "Rua São Benedito, 95"
}
```

##### `DELETE`: `/api/client/<CLIENT_ID>`

Inactivate a client.

### Favorites Products 

*Auth token need to be sent on `X-Access-Token` header.*

##### `GET`: `/api/client/favorites_products/<CLIENT_ID>/?page=<PAGE_NUMBER>`

Get the client's favorites products list.

##### `POST`: `/api/client/favorites_products/<CLIENT_ID>/<PRODUCT_ID>`

Add a product to the client's favorites products list.

*It needs to be an existent product (refer to: https://gist.github.com/Bgouveia/9e043a3eba439489a35e70d1b5ea08ec).*

##### `DELETE`: `/api/client/favorites_products/<CLIENT_ID>/<PRODUCT_ID>`

Remove a product from client's favorites products list.
