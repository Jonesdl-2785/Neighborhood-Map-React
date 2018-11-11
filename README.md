# Neighborhood React App

## Overview

This is the capstone (final project) for the Udacity Front End Developer Nanodegree Program.

This is a SPA (single page application) Map App built using React and features interactive map functionalities such as location markers, location information window which displays information about the highlighted venue (name, photo and website) using third-party API.

- The app features locations of Ice Cream/Custard shops within a 50 mile radius of Davidson, NC.
- A list drawer shows a list of shops housed in a json file, which can be filtered using the search bar.
- A marker click will supply an infowindow. The animated marker will bounce when clicked
- Third Party API, Foursquare Provides venue information, if available.

## Project Demo
Live demo can be viewed [here](https://cryptic-mesa-49268.herokuapp.com/).
[GitHub](https://jonesdl-2785.github.io/Neighborhood-Map-React/)


## Requirements
- npm:
-- npm install --save google-map-react
 or
- yarn:
--yarn add google-map-react

- npm start
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Google Maps API (or other Map api)
- Third Party API [Foursquare](https://developer.foursquare.com/)

## How to Install
Project can be cloned or downloaded from [Git Repository] (git@github.com:Jonesdl-2785/Neighborhood-Map-React.git)
-- Create a directry for the project on your local machine.
-- Change to your newly created directory.
-- Run npm install
-- Run npm start

## To view in Browser

Local:            http://localhost:3000/ shown in your terminal when compiled
On Your Network:  http://123.456.7.89:3000/ shown in your terminal when compiled
Note that the development build is not optimized.
To create a production build, use `npm run build` - see #MISC.

## Resources
- Tools <br>
- Atom editor <br>
- Adobe Color CC <br>
- Git Version control <br>
- GitHub <br>
- Heroku

## Other Resources
- Material UI <br>
- [Foursquare API](https://developer.foursquare.com/)<br>
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) <br>
- [Google Maps React](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/)
- MDN
[developer.mozilla.org](MDN Web Docs)
- W3Schools
[w3shools.com](W3Schools)

## Misc
- ServiceWorker is used in Production build only.
  1. Run: `npm run build` to optimize the Project
  2. Deploy: `npm run deploy` to deploy to the address specified  
- `npm run serve`
- Local host 5000

##Author
Diane L. Jones

##License
MIT

##Credits
Udacity Resources
[FEND](https://sites.google.com/udacity.com/gwgdevscholarship/fend/fend-resources) <br>
- Udacity Mentors
  Sachin Sharma, Doug Brown

## Project Future Development
1.  Add additional animation to markers
2.  Expand search and location parameters
3.  Update overall design of app
