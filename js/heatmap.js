// heatmap.js

// Create the map
var myMap = L.map('map').setView([-27.47101, 153.024292], 6);

var controlLayers = L.control.layers( null, null, {
  position: "topright",
  collapsed: false
}).addTo(map);

// Add the OpenStreetMap tile layer
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
controlLayers.addBaseLayer(light, 'Street Map');

var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }).addTo(myMap);
  controlLayers.addBaseLayer(terrain, 'Stamen Terrain basemap');

  fetch('Resources/ufo_coordinates.csv')
  .then(response => response.text())
  .then(csvString => {
    // Parse CSV data using Papaparse
    var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

    // Create heatmap data array
    var heatmapData = [];

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude` and `Longitude` are required
    for (var i in data) {
      var row = data[i];

      // Validate latitude and longitude values
      if (!isNaN(row.Latitude) && !isNaN(row.Longitude)) {
        var lat = parseFloat(row.Latitude);
        var lon = parseFloat(row.Longitude);
        heatmapData.push([lat, lon]);

        var marker = L.marker([lat, lon], {
          opacity: 1
        }).bindPopup(row.Title);

        marker.addTo(map);
      } else {
        console.error('Invalid latitude or longitude value at row', i + 2);
        console.log('Row:', row);
      }
    }

    // Create heatmap layer if there are valid data points
    if (heatmapData.length > 0) {
      var heat = L.heatLayer(heatmapData).addTo(map);
      controlLayers.addOverlay(heat, 'Heatmap');
    }
  });

    // Toggle markers and heatmap based on checkbox state
    var toggleMarkers = document.getElementById('toggleMarkers');
    var toggleHeatmap = document.getElementById('toggleHeatmap');
    toggleMarkers.addEventListener('change', function() {
      if (toggleMarkers.checked) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].addTo(myMap);
        }
      } else {
        for (var i = 0; i < markers.length; i++) {
          myMap.removeLayer(markers[i]);
        }
      }
    });

    toggleHeatmap.addEventListener('change', function() {
      if (toggleHeatmap.checked) {
        heat.addTo(myMap);
      } else {
        myMap.removeLayer(heat);
      }
    });