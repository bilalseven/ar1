import { ARNode } from "@nativescript/ar";
import { UndergroundUtility } from "../../services/UtilityService";
import { convertGPSToARCoordinates } from "../../utils/coordinates";

export interface UtilityNodeConfig {
    utility: UndergroundUtility;
    userLocation: {
        latitude: number;
        longitude: number;
    };
}

export const createUtilityNode = ({ utility, userLocation }: UtilityNodeConfig): ARNode => {
    const position = convertGPSToARCoordinates(
        utility.coordinates.latitude,
        utility.coordinates.longitude,
        userLocation.latitude,
        userLocation.longitude,
        utility.coordinates.depth
    );

    return {
        position,
        scale: { x: 1, y: 1, z: 1 },
        geometry: getUtilityGeometry(utility.type),
        material: getUtilityMaterial(utility.type)
    };
};

const getUtilityGeometry = (type: string) => {
    const geometries = {
        FIBER: { type: 'cylinder', radius: 0.05, height: 1 },
        WATER: { type: 'cylinder', radius: 0.15, height: 1 },
        SEWAGE: { type: 'cylinder', radius: 0.3, height: 1 },
        DEFAULT: { type: 'sphere', radius: 0.1 }
    };

    return geometries[type] || geometries.DEFAULT;
};

const getUtilityMaterial = (type: string) => {
    const materials = {
        FIBER: { color: '#FF0000' },
        WATER: { color: '#0000FF' },
        SEWAGE: { color: '#964B00' },
        DEFAULT: { color: '#CCCCCC' }
    };

    return materials[type] || materials.DEFAULT;
};