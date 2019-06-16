# AutoMart 3
[![Build Status](https://travis-ci.com/raymond42/Automart-3.svg?branch=develop)](https://travis-ci.com/raymond42/Automart-3) [![Coverage Status](https://coveralls.io/repos/github/raymond42/Automart-3/badge.svg?branch=develop)](https://coveralls.io/github/raymond42/Automart-3?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/180ed7d088d73eb639eb/maintainability)](https://codeclimate.com/github/raymond42/Automart-3/maintainability)

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart,  can sell their cars or buy from trusted dealerships or private sellers

------------------------------------------------------------------------------

## UI

## User Interface (UI)
* HTML
* CSS
* Javascript

### GitHub Pages link for UI
[AutoMart/UI link](https://raymond42.github.io/Auto-Mart/UI)

---------------------------------------------------------------------

## SERVER & DATABASE

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v2/auth/signup| POST | Get the user to signup |
| /api/v2/auth/login | POST | Get the user to login |
| /api/v2/car | POST | Get the user to post a car sale advertisement |
| /api/v2/order | POST | Get the user to make a purchase order |
| /api/v2/cars/:id/ | PATCH | Get the user to update the price of his/her posted car sale ad |
| /api/v2/order/:id | PATCH | Get the user to update the price or his/her purchase order |
| /api/v2/car/:id | PATCH | Get user to mark his/her posted AD as sold  |
| /api/v2/car/:id | GET | Get user to view a specific car |
| /api/v2/cars/available | GET | Get user to User can view all unsold cars |
| /api/v2/cars/available/range | GET | Get the user to view all unsold cars within a price range |
| /api/v2/cars/posted | GET | Get the Aamin to view all posted ads whether sold or unsold |
| /api/v2/cars/all?status=available&state=used | GET | Get the user to view all used unsold cars |
| /api/v2/cars/all?status=available&state=new | GET | Get the user to view all new unsold cars |
| /api/v2/car/:id | DELETE | Get the admin to delete a posted AD record |

## Used Tools

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Database
```
 *Postgres*
 ```
### Testing Framework and assertion library
```
 *Mocha* and *Chai*
 ```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### Heroku link Example
[AutoMart heroku link](https://automart3.herokuapp.com/)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository ```https://github.com/raymond42/Auto-Mart.git``` or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Create tables in the database
```
> npm run createTables
```
## Delete or Drop table in the database
```
> npm run dropTables
```
## Run the server
```
> npm start
```


## Author
- Raymond Gakwaya <raymond42.gr@gmail.com>

---

## License & copyright
Copyright (c) Raymond Gakwaya, Junior Software developer
