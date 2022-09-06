// Add console.log to check to see if our code is working.
console.log("working");

// We create the light tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    style_id: "streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    style_id: "satellite-streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});

// Create object with both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
}

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighboorhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/aidantank/Mapping_Earthquakes/main/torontoNeighborhoods.json"

// Create styling object
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: "yellow"
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Neighboorhood: " + feature.properties.AREA_NAME + "</h3>")
        }
    }).addTo(map);
});
