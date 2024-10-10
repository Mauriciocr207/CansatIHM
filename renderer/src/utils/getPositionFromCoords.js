//Distancia con la formula de Haversine
function haversineDistance([lat1, lon1], [lat2, lon2]) {
    var R = 6371; // Radio de la tierra en km
    var dLat = toRadian(lat2 - lat1);
    var dLon = toRadian(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distancia en km
    return d;
}

function toRadian(deg) {
    return deg * (Math.PI / 180)
}

// Direccion Entre dos puntos Estableciendo que el norte sean 0 grados y el sur 270
function getDirection([lat1, lon1], [lat2, lon2]) {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    bearing = (bearing + 360) % 360;
    return bearing;
}

export default function getPositionFromCoords(cp, cs) {
    return [
        haversineDistance(cp, cs),
        getDirection(cp, cs)
    ]
}