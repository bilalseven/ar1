import React from 'react';
import { ViroNode, ViroCylinder, ViroMaterials } from '@viro-community/react-viro';
import { UndergroundUtility } from '../../services/UtilityService';
import { convertGPSToViroPosition } from '../../utils/coordinates';

interface UtilityModelProps {
  utility: UndergroundUtility;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

ViroMaterials.createMaterials({
  fiberMaterial: {
    diffuseColor: '#FF0000',
    lightingModel: 'Lambert',
  },
  waterMaterial: {
    diffuseColor: '#0000FF',
    lightingModel: 'Lambert',
  },
  sewageMaterial: {
    diffuseColor: '#964B00',
    lightingModel: 'Lambert',
  },
});

const getUtilityProperties = (type: string) => {
  const properties = {
    FIBER: { radius: 0.05, material: 'fiberMaterial' },
    WATER: { radius: 0.15, material: 'waterMaterial' },
    SEWAGE: { radius: 0.3, material: 'sewageMaterial' },
  };
  return properties[type] || properties.FIBER;
};

export const UtilityModel: React.FC<UtilityModelProps> = ({ utility, userLocation }) => {
  const position = convertGPSToViroPosition(
    utility.coordinates.latitude,
    utility.coordinates.longitude,
    userLocation.latitude,
    userLocation.longitude,
    utility.coordinates.depth
  );

  const { radius, material } = getUtilityProperties(utility.type);

  return (
    <ViroNode position={position}>
      <ViroCylinder
        height={1}
        radius={radius}
        materials={[material]}
        position={[0, 0, 0]}
      />
    </ViroNode>
  );
};