## Intro

This APP shows a map with the location of the International Space Station. List the latest cities/countries in a radius of 600px of the location and display a gallery of photos of the nearest country.

The APP is made with React and Express / Node. 

In the root you will find the API with it's dependencies and in the folder `iss-app` the FE application.



## Getting Started

1- Clone the repo into your local environment.

2- Use `npm i` to install 	the local dependencies.

3- Move to the directory `iss-app` and run `npm i` to install the app local dependencies.


## Available Scripts

### APP

In the ISS APP directory `cd iss-app/`, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Also, this watches all the CSS changes, and the page will reload if you make edits.<br>

#### `npm run lint`
Run it to see any lint errors in the console. Please, fix them!

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

#### `npm run eject`

This command will remove the single build dependency from the project. It will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into the project to have full control over them.


### API

In the `root` directory, you can run:

#### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.


#### `npm start`

Runs the app in the production mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser. This will serve the files from the `build` folder of the App. 


## Dev helpers

- Root: `routes/api` manage the core of the API, to consume all the external APIs get the responses.
- Root: `config/config` to define the URLs of the consumed APIs
- App directory (`iss-app`): `src` folder contains all the Frontend app. 
-- You wil find a `core` file as parent and all the childs inside `components`.
-- The Styles/SASS are handle in a separated folder `styles`, divided in base for general and components for each one.




## Deployment

The deploy is done through Heroku server. URL: [https://interstellar-app.herokuapp.com/](https://interstellar-app.herokuapp.com/)

First of all, all the changes should be commited to the repo, in order for the next script to work. 


#### `git push heroku master`

Run this script in the Root directory. 
This will move to the cd `iss-app`, run the `npm run build` and then will deploy all the changes to the server.



