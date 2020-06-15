[<img src="./src/sandpiper_circle.svg" height=150>](https://sandpiper-react.herokuapp.com/)

# Final Project: MERN-stack web app
## Sandpiper, a collaborative birdwatching journal
https://sandpiper-react.herokuapp.com/  
Works best in Chrome, Firefox, Edge (currently doesn't work in Safari)

Multi-server architecture

Backend API
* Github: https://git.generalassemb.ly/judykim-ga/final-project-api
* Deployed Site: https://sandpiper-api.herokuapp.com/

screenshots

## Scope
## Features
## Technologies Used
* React 
* Express
* Node.js
* MongoDB

Front-end: React, Bootstrap, Flexbox, Font Awesome, Javascript, CSS, HTML  
Back-end: Express, Node.js, MongoDB, Mongoose
Dependencies: Axios, Bing Maps, Cloudinary, React Router

## User Stories
## Data Models
The backend uses 5 models:
1. User
2. BirdingSession
3. Bird
4. Photo
5. Behavior

<img src="./public/readme_images/final_project_erd_v6.png">

## Wireframes
Wireframes were made in Figma. A mobile-first approach was taken when designing the wireframes.

<img src="./public/readme_images/wireframe_1.png">
<img src="./public/readme_images/wireframe_2.png">
<img src="./public/readme_images/wireframe_3.png">

## Known Issues
* App can't make API requests to back-end in Safari
* Timezone conversion issue between UTC and local timezone
* Updating a birding session doesn't always trigger a re-render of the birding session information
* On the photos page, if you sort the photos, then delete a photo, the Sorted By form doesn't reset to the default choice

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

