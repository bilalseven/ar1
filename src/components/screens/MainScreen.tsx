import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import { LocationService } from '../../services/LocationService';
import { UtilityService, UndergroundUtility } from '../../services/UtilityService';
import { ARScene } from '../ar/ARScene';

export const MainScreen: React.FC = () => {
  const [userLocation, setUserLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);
  const [utilities, setUtilities] = useState<UndergroundUtility[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      const hasPermission = await LocationService.requestPermissions();
      if (!hasPermission) {
        setError('Location permissions are required');
        setIsLoading(false);
        return;
      }

      const position = await LocationService.getCurrentPosition();
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      
      setUserLocation(location);
      
      const nearbyUtilities = await UtilityService.getNearbyUtilities(
        location.latitude,
        location.longitude,
        100
      );
      setUtilities(nearbyUtilities);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to initialize location services');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userLocation) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to get location</Text>
      </View>
    );
  }

  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: ARScene,
        passProps: {
          utilities,
          userLocation,
        },
      }}
      style={styles.arView}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arView: {
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});