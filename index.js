var mymap = L.map("mapid").setView(
  [21.152364203854884, -101.71115227036523],
  16
);

mymap.doubleClickZoom.disable();

let lastCoords = {
  lat: 0,
  lng: 0
};

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var salle = L.marker([21.15223412617155, -101.7113883047542]).addTo(mymap);

function onEachFeature(feature, layer) {
  var popupContent = "Soy un " + feature.geometry.type + " en la salle";

  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);
}

L.geoJSON(lasalle, {
  filter: function (feature, layer) {
    if (feature.properties) {
      return true;
    }
  },
  onEachFeature: onEachFeature,
}).addTo(mymap);

var marker = L.marker([21.15223412617155, -101.7113883047542])
  .addTo(mymap)
  .bindPopup("Holi");

  var timer = 0;
  var delay = 200;
  var prevent = false;
  var line = null;
  
  mymap.on("click", function(e) {
    timer = setTimeout(function() {
      if (!prevent) {
        singleClick(e)
      }
      prevent = false;
    }, delay);
  })

  mymap.on("dblclick", function(e) {
    clearTimeout(timer);
    prevent = true;
    doubleClick(e)
  });

  function singleClick(e){
    //L.popup().setLatLng(e.latlng).setContent('Has dado click en: ' + e.latlng.toString()).openOn(mymap);
    L.marker(e.latlng).addTo(mymap).bindPopup('Has dado click en: ' + e.latlng.toString());
    lastCoords = e.latlng;
  }

  function doubleClick(e){
    console.log(e.latlng);

    if(line != null)
      line.removeFrom(mymap);

    L.marker(e.latlng).addTo(mymap).bindPopup('Has dado click en: ' + e.latlng.toString());
    
    line = L.polyline([lastCoords, e.latlng]).addTo(mymap);

    lastCoords = e.latlng;


  }