import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

export class LocationService {
  static async requestPermissions(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    if (!permission) return false;

    try {
      const result = await check(permission);
      if (result === RESULTS.DENIED) {
        const permissionResult = await request(permission);
        return permissionResult === RESULTS.GRANTED;
      }
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error checking location permission:', error);
      return false;
    }
  }

  static getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });
  }
}

export interface Location {
  latitude: number;
  longitude: number;
  altitude?: number | null;
}