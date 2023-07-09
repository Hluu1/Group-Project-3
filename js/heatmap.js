// Initialize the map
let myMap = L.map("map", {
    center: [-25.2744, 133.7751], // Coordinates of the center of Australia
  zoom: 5 // Adjust the zoom level as desired
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Your dataset with latitude and longitude columns
  let dataset = ufo_coordinates;
  
  // Create an array to store the heat map data points
  let heatArray = [];
  
  // Loop through the dataset and extract the coordinates
  for (let i = 0; i < dataset.length; i++) {
    let location = dataset[i];
    heatArray.push([location.latitude, location.longitude]);
  }
  
  // Create a heat layer with the data points and add it to the map
  let heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);
  