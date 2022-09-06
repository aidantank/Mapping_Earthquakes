// Add console.log to check to see if our code is working.
console.log("working");

// We create the light tile layer that will be the background of our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    style_id: "navigation-day-v1",
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark tile layer that will be the background of our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    style_id: "navigation-night-v1",
    maxZoom: 18,
    accessToken: API_KEY
});

// Create object with both maps
let baseMaps = {
    "Day Navigation": day,
    "Night Navigation": night
}

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [night]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto Airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/aidantank/Mapping_Earthquakes/main/torontoRoutes.json"

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3><hr><h3>Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});
