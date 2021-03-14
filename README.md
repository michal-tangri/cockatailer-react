Simple client-server web application about cocktails and drinks. It was made using React, Sass and Node.js.

You can preview it on [Heroku](https://biu-cocktailer.herokuapp.com/). Beware that free Heroku dynos take some time to start after being idle, so please be patient.

## Requirements

Node.js and your favourite terminal.

## Setting up the application

You need to provide three environmental variables.

```REACT_APP_API_KEY```, ```REACT_APP_API_URL``` and ```API_KEY```. You can use ```.env``` files if you want.

```REACT_APP_API_KEY``` and ```API_KEY``` are just a key you want to use for communication between the client and the server.

Example: 
```
REACT_APP_API_KEY="43a03091fd55b19eafea6bb977e975fb8481"
API_KEY="43a03091fd55b19eafea6bb977e975fb8481"
```

```REACT_APP_API_URL``` is an address you will use for the server.

Example:
```
REACT_APP_API_URL="http://localhost:9666/api"
```

After setting up your variables, run ```npm install``` command in both ```/client``` and ```/server``` directories.

## Starting the application

To run this app you need to open two terminals. Navigate to the ```/client``` directory with the first one, and to the ```/server``` directory with the second one. Run ```npm start``` in both terminals and wait for the app to finish building.

Now you can go to http://localhost:3000/ to view the project I made!.