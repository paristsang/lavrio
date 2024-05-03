var map;
var markerLayer = L.layerGroup();
var waypoints = [];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map on the "map" div
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    markerLayer.addTo(map);

    // Try to locate the user
    map.locate({setView: true, maxZoom: 16});

    // Add click event to the map
    map.on('click', function(e) {
        updateCoordinates(e.latlng);
    });

    // On location found, update coordinates automatically
    map.on('locationfound', function(e) {
        updateCoordinates(e.latlng);
    });
});

function updateCoordinates(latlng) {
    let lat = latlng.lat.toFixed(5);
    let lng = latlng.lng.toFixed(5);
    document.getElementById('latitude').value = lat;
    document.getElementById('longitude').value = lng;
}

function addWaypoint() {
    var lat = document.getElementById('latitude').value;
    var lng = document.getElementById('longitude').value;
    var description = document.getElementById('description').value;

    if (lat && lng && description) {
        var marker = L.marker([lat, lng]).addTo(markerLayer);
        marker.bindPopup(description).openPopup();

        // Add to waypoints array
        waypoints.push({latitude: lat, longitude: lng, description: description});
        document.getElementById('description').value = ''; // clear the textarea after submitting

        // Optional: Save to local storage or handle as needed
        // localStorage.setItem('waypoints', JSON.stringify(waypoints));
    } else {
        alert('Please ensure all fields are filled and a location is selected on the map.');
    }
}

function downloadWaypoints() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(waypoints));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "waypoints.json");
    dlAnchorElem.click();
}
