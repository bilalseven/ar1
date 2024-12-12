import React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
} from '@viro-community/react-viro';
import { UtilityModel } from './UtilityModel';
import { UndergroundUtility } from '../../services/UtilityService';

interface ARSceneProps {
  utilities: UndergroundUtility[];
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export const ARScene: React.FC<ARSceneProps> = ({ utilities, userLocation }) => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[0, -1, -.2]}
        intensity={200}
      />
      {utilities.map(utility => (
        <UtilityModel
          key={utility.id}
          utility={utility}
          userLocation={userLocation}
        />
      ))}
    </ViroARScene>
  );
};