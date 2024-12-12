export interface UndergroundUtility {
  id: string;
  type: 'FIBER' | 'WATER' | 'SEWAGE';
  coordinates: {
    latitude: number;
    longitude: number;
    depth: number;
  };
  properties: {
    diameter?: number;
    material?: string;
    installationDate?: string;
  };
}

export class UtilityService {
  static async getNearbyUtilities(
    latitude: number,
    longitude: number,
    radiusInMeters: number
  ): Promise<UndergroundUtility[]> {
    // Simulated data - in a real app, this would fetch from an API
    return [
      {
        id: '1',
        type: 'FIBER',
        coordinates: {
          latitude: latitude + 0.0001,
          longitude: longitude + 0.0001,
          depth: 1.5,
        },
        properties: {
          diameter: 0.05,
          material: 'Fiber Optic',
          installationDate: '2022-01-01',
        },
      },
      {
        id: '2',
        type: 'WATER',
        coordinates: {
          latitude: latitude - 0.0001,
          longitude: longitude - 0.0001,
          depth: 2.0,
        },
        properties: {
          diameter: 0.3,
          material: 'PVC',
          installationDate: '2020-06-15',
        },
      },
      {
        id: '3',
        type: 'SEWAGE',
        coordinates: {
          latitude: latitude + 0.0002,
          longitude: longitude - 0.0002,
          depth: 3.0,
        },
        properties: {
          diameter: 0.5,
          material: 'Concrete',
          installationDate: '2019-03-20',
        },
      },
    ];
  }
}