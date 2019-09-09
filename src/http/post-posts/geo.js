/**
 * stub for location
 *
 * @returns {array} a geojson encoded array
 */
module.exports = function geo(location) {
  let coords = {
    SF: [-122.4194, 37.7749],
    Van: [-123.1207, 49.2827],
    NYC: [-74.0060, 40.7128]
  }
  return coords[location]
}
