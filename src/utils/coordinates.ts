export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const convertGPSToViroPosition = (
  utilityLat: number,
  utilityLon: number,
  userLat: number,
  userLon: number,
  depth: number
): [number, number, number] => {
  // Convert to radians
  const userLatRad = (userLat * Math.PI) / 180;
  const utilityLatRad = (utilityLat * Math.PI) / 180;
  const deltaLon = (utilityLon - userLon) * Math.PI / 180;

  // Calculate bearing
  const y = Math.sin(deltaLon) * Math.cos(utilityLatRad);
  const x = Math.cos(userLatRad) * Math.sin(utilityLatRad) -
            Math.sin(userLatRad) * Math.cos(utilityLatRad) * Math.cos(deltaLon);
  const bearing = Math.atan2(y, x);

  // Calculate distance
  const distance = calculateDistance(userLat, userLon, utilityLat, utilityLon);

  // Convert to ViroReact coordinate system (meters)
  return [
    distance * Math.sin(bearing),
    -depth, // Negative because Y axis points up in Viro
    distance * Math.cos(bearing)
  ];
};