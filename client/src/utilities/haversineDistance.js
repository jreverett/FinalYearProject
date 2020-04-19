export function haversineDistance(address1, address2) {
  var R = 6371.071; // radius of Earth in kilometers
  var rlat1 = address1.location.lat * (Math.PI / 180); // convert degrees to radians
  var rlat2 = address2.location.lat * (Math.PI / 180); // ocnvert degrees to radians
  var difflat = rlat2 - rlat1; // radian difference (latitudes)
  var difflon =
    (address2.location.lng - address1.location.lng) * (Math.PI / 180); // radian difference (longitudes)

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
