var myMap = L.map('map').setView([-27.47101, 153.024292], 6);

// Add the OpenStreetMap tile layer
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create a marker cluster group
var markers = L.markerClusterGroup();

// Create a heatmap layer
var heat = L.heatLayer([], { radius: 25 });

// Load UFO coordinates from ufo_coordinates.csv
fetch('./Resources/ufo_coordinates.csv')
  .then(response => response.text())
  .then(csvString => {
    // Parse CSV data using PapaParse
    var data = Papa.parse(csvString, { header: true }).data;

    // For each row in data, create a marker and add it to the marker cluster group
    // For each row, columns `latitude` and `longitude` are required
    data.forEach(row => {
      var lat = parseFloat(row.latitude);
      var lon = parseFloat(row.longitude);
      if (!isNaN(lat) && !isNaN(lon)) {
        var marker = L.marker([lat, lon], {
          opacity: 1
        }).bindPopup(`Latitude: ${lat}<br>Longitude: ${lon}`);

        markers.addLayer(marker);

        heat.addLatLng([lat, lon]);
      } else {
        console.warn('Invalid latitude or longitude value:', row);
      }
    });

    // Add the marker cluster group and heatmap layer to the map
    myMap.addLayer(markers);
    myMap.addLayer(heat);
  });

// Toggle markers and heatmap based on checkbox state
var toggleMarkers = document.getElementById('toggleMarkers');
var toggleHeatmap = document.getElementById('toggleHeatmap');

if (toggleMarkers && toggleHeatmap) {
  toggleMarkers.addEventListener('change', function() {
    if (toggleMarkers.checked) {
      myMap.addLayer(markers);
    } else {
      myMap.removeLayer(markers);
    }
  });

  toggleHeatmap.addEventListener('change', function() {
    if (toggleHeatmap.checked) {
      myMap.addLayer(heat);
    } else {
      myMap.removeLayer(heat);
    }
  });
}
