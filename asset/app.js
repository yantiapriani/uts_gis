
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
});

var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'jpg'
});

var map = L.map('map', {
    center: [-8.684939, 116.117836],
    zoom: 12,
    layers: [Esri_WorldImagery]
});


var layerGroup = {};



for (const kategori in markers) {


    let data = markers[kategori].data;
    let name = markers[kategori].kategori;
    let icon = markers[kategori].icon;

    layerGroup[name] = L.layerGroup().addTo(map);


    data.forEach(marker => {
        let groupMarker = [];
        let mark = L.marker(marker.latlang, { icon: icon }).bindPopup(marker.name).addTo(layerGroup[name]);
        groupMarker.push(mark);
    })

}
var layerControl = L.control.layers({ Esri_WorldImagery }, layerGroup).addTo(map);
layerControl.addBaseLayer(Stadia_AlidadeSatellite, "Satellite View");

L.geoJSON(kecLobar, {
    style: function (feature) {
        return { color: "#1c73ff" };
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.NAMOBJ;
}).addTo(map);
