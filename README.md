# Stock API

## What is in it?

- [Express](https://expressjs.com/)
- [gRPC](https://grpc.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [Mongo DB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Stooq API](https://stooq.com/t/)

## Installing dependencies

You need to run the command install on each dir (`stock-service` and `api-service`)

```
  $ cd stock-service

  $ npm i

  $ cd ..

  $ cd api-service

  $ npm i
```

## Running

Get each `.env.example` and change it's name to `.env`

If you don't have, [install MongoDB](https://docs.mongodb.com/manual/installation/) or get a cluster
from [MongoDB Atlas](https://www.mongodb.com/atlas)

### _In `api-service` it's needed to change the email and mongodb variables values for your own email and mongodb credentials_

##### `***If you are trying to use a gmail email,` [$this$](https://nodemailer.com/usage/using-gmail/) `(a document from nodemailer on how to use gmail) might help`

Then run `npm start` on each dir

The API will be on port 3001, unles you change in the enviroment variables

## Docker

If you want to use Docker, there is a docker-compose file inside the project, _as for Running, you
need to change the email credentials before you run_

After changing the email credentials in docker-compose.yml file, you can run:

```
  docker-compose up
```

The API will be on port 3001, unles you change in the enviroment variables, it's important to change
the props `ports` too.

## Insomnia

There is an Insomnia json file inside the project, you can import it on your insomnia and the routes
and enviroment variables will be ready to use,
_`it's important to create an user and login-in before you test other routes`_

## Routes

- (`POST`)/register - Send an email (optional: isAdmin as boolean) on body and it will return the
  email and a random password if the email is't already registered
- (`POST`)/login - Send the email and password on body and it will return the user and a JWT token
  if the credentials are right
- (`PATCH`)/users/reset/password - _`Bearer token needed`_ - Call this route and it will change the
  password to another random password and send it to the registered email
- (`GET`)/history - _`Bearer token needed`_ - Call this route and it will return the search history
  from the user
- (`GET`)/stats - _`Bearer token needed`_ - $Admins-only$ - Call this route and it will return each
  stock searched and how many times it was searched
- (`GET`)/stock - _`Bearer token needed`_ - Send a stock id as query parameter `q` and it will
  return the stock if it exists
