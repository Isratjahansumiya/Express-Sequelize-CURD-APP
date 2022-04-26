
# API Development Course Project

This api uses express framework for http server and Sequelize framework for database.It allows searching, adding, modifying and deleting informations.

## Installations

1. Download the project and go to the project directory.
2. Run "npm install"
3. Then run "npm start"
4. The app will be running on "http://localhost:8080"

##  Routes

Supported http methods are given below:
* GET /users
* GET /users/:id
* POST /users
* PUT /users/:id
* Delete /users/:id

## Example JSON Body

{
"username": "israt",
"email": "isratjahan.sumiya@tuni.fi",
"phone": "+358 000",
"address": "Finninmäenkatu, Tampere"
}