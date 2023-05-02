var map;
var markers = [];

function initializeMap(bookLocations) {
  // Initialize the map
  map = L.map('map').setView([0, 0], 2);

  // Add the tile layer (you can use any tile provider you like)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Define marker styles for each genre
  // Make these into hex codes?
  var markerStyles = {
    "Fantasy": { color: "purple" },
    "Mystery": { color: "green" },
    "Romance": { color: "red" },
    // Add more genres and corresponding colors here
  };

  // Add a marker for each book location
  for (var i = 0; i < bookLocations.length; i++) {
    var genre = bookLocations[i].genre;
    var markerStyle = markerStyles[genre] || { color: "blue" };
    var marker = L.circleMarker([bookLocations[i].lat, bookLocations[i].lng], {
      radius: 8,
      fillColor: markerStyle.color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);

    var popupContent = '<b>Title:</b> ' + bookLocations[i].title + '<br>' +
      '<b>Author:</b> ' + bookLocations[i].author + '<br>' +
      '<b>Year:</b> ' + bookLocations[i].year + '<br>' +
      '<b>Genre:</b> ' + genre;

    marker.bindPopup(popupContent);

    // Show popup on mouseover
    marker.on('mouseover', function (e) {
      this.openPopup();
    });

    // Hide popup on mouseout
    marker.on('mouseout', function (e) {
      this.closePopup();
    });

    // Zoom to the location when the user clicks on the marker
    marker.on('click', function (e) {
      map.setView(e.target.getLatLng(), 10);
    });

    markers.push(marker);
  }
}

function applyFilters() {
  var authorFilter = document.getElementById("author-filter").value;
  var genreFilter = document.getElementById("genre-filter").value;

  // Filter the book locations based on the selected criteria
  var filteredBookLocations = bookLocations.filter(function (bookLocation) {
    if ((authorFilter == "" || bookLocation.author == authorFilter) &&
      (genreFilter == "" || bookLocation.genre == genreFilter)) {
      return true;
    } else {
      return false;
    }
  });

  // Remove any existing markers from the map
  if (markers) {
    for (var i = 0; i < markers.length; i++) {
      map.removeLayer(markers[i]);
    }
  }

  // Add a marker for each filtered book location
  markers = [];
  for (var i = 0; i < filteredBookLocations.length; i++) {
    var marker = L.marker([filteredBookLocations[i].lat, filteredBookLocations[i].lng]).addTo(map);
    marker.bindPopup(filteredBookLocations[i].title + "<br>" + filteredBookLocations[i].author + "<br>" + filteredBookLocations[i].year + "<br>" + filteredBookLocations[i].genre);

    // Zoom to the location when the user clicks on the marker
    marker.on('click', function (e) {
      map.setView(e.target.getLatLng(), 10);
    });

    markers.push(marker);
  }
}