# Neighborhood Map Project

This app is list of things to do around Woodstock, GA. Each location is displayed as a marker on the map. If the marker is clicked some information about the location is displayed in an infobox (name, website and pic (if available)).

If the menu button (top left) is clicked a list of location with a search field at the top is opened on the left side of the window. Typing in the search field will filter the list of locations and by clicking one of the locations listed the same infobox that comes up when the marker is displayed will be shown.

clicking anywhere on the map will close the current info box and close the list of locations menu.



# Setup and Install

* Download or Clone the repository: https://github.com/mattb7800/project7-neighborhood-map.git
* cd to the directory the file was downloaded to
* install npm by typing `npm install`
* run `npm run start` (This will start the program locally on port 3000).

# Resources
* Google Maps
* FourSquare (provided location pics if available)
* Font Awesome (added to provide icon support for menu button)
* REACT material-UI (prebuilt drawer component used to build PoiList)
* Google-maps-react used for map display
* https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
* //https://material-ui.com/demos/drawers/
* https://developer.foursquare.com/docs
* https://github.com/fullstackreact/google-maps-react/blob/master/README.md


**Special Note:** *I have used the default service worker for this app provided when it was recreated with `create-react-app`. Therefore it will only work on a production build.*
