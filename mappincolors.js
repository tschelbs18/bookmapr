var map;
var markers = [];

function initializeMap(bookLocations) {
  // Initialize the map
  map = L.map('map').setView([0, 0], 2);

  // Define marker icons for each genre
  var icons = {
    'military history': L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    'history': L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-silver.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    'social sciences': L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-royalblue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    'novel': L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    'memoir/biography': L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    'sporting & nature': L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
  };

  // Add the tile layer (you can use any tile provider you like)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Add a marker for each book location
  for (var i = 0; i < bookLocations.length; i++) {
    var marker = L.marker([bookLocations[i].lat, bookLocations[i].lng], {icon: icons[bookLocations[i].genre]}).addTo(map);

    var popupContent = '<b>Title:</b> ' + bookLocations[i].title + '<br>' +
      '<b>Author:</b> ' + bookLocations[i].author + '<br>' +
      '<b>Year:</b> ' + bookLocations[i].year + '<br>' +
      '<b>Genre:</b> ' + bookLocations[i].genre;

    marker.bindPopup(popupContent);

    // Zoom to the location when the user clicks on the marker
    marker.on('click', function (e) {
      map.setView(e.target.getLatLng(), 10);
    });

    markers.push(marker);
  }
}

function applyFilters() {
  var
