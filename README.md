# Installation

git clone https://github.com/carlosmarinho/modec-challenge.git

Run the following commands

 - npm run install
 - npm run start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Tecnologies used

 - React
 - Redux
 - Redux Thunk
 - CSS in JS (Styled Components)
 - react-leaflet
 - mobile-first solution

# About the application

The application is designed to help users find their local temperature, it's designed with React and Redux and its a responsive application to work on desktop and mobile.

I started developing the application without redux and redux-thunk, using Hooks and useState() to save the information local component. The reason is because it's a small application and it was not necessary to use Redux, however i decided to use redux to demonstrate my knowloadge with this over used framework on the react community. If you want to take a look at the application and code without redux, please run the following code:

 - git checkout without-redux-and-thunk
 
 to get back to the master branch, the main branch of the application run the following code:
 
 - git checkout master
 
## Branch master

It's the main branch where the application is more complete and i used redux and redux thunk.

## Branch without-redux-and-thunk

It's the branch where started developed without redux, at this branch we don't have the listing cities at the home page, we only have the map and the possibilities of searching all the 15 cities that is displayed at the search page
