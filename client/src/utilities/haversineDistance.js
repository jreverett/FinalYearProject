export function haversineDistance(mk1Lat, mk1Lng, mk2Lat, mk2Lng) {
  var R = 6371.071; // radius of Earth in kilometers
  var rlat1 = mk1Lat * (Math.PI / 180); // convert degrees to radians
  var rlat2 = mk2Lat * (Math.PI / 180); // ocnvert degrees to radians
  var difflat = rlat2 - rlat1; // radian difference (latitudes)
  var difflon = (mk2Lng - mk1Lng) * (Math.PI / 180); // radian difference (longitudes)

  return (
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    )
  );
}
