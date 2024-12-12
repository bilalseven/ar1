import * as React from "react";
import { AR, ARNode } from "@nativescript/ar";
import { StyleSheet } from "react-nativescript";
import { UndergroundUtility } from "../services/UtilityService";

interface ARViewProps {
    utilities: UndergroundUtility[];
    userLocation: {
        latitude: number;
        longitude: number;
    };
}

export function ARView({ utilities, userLocation }: ARViewProps) {
    const arViewRef = React.useRef(null);

    React.useEffect(() => {
        if (arViewRef.current) {
            // Initialize AR session
            AR.startSession({
                planeDetection: true,
                worldAlignment: "gravityAndHeading"
            });

            // Add 3D models for each utility
            utilities.forEach(utility => {
                const node = createUtilityNode(utility, userLocation);
                AR.addNode(node);
            });
        }

        return () => {
            AR.stopSession();
        };
    }, [utilities, userLocation]);

    const createUtilityNode = (utility: UndergroundUtility, userLocation: any): ARNode => {
        // Calculate relative position based on GPS coordinates
        const deltaLat = utility.coordinates.latitude - userLocation.latitude;
        const deltaLon = utility.coordinates.longitude - userLocation.longitude;
        
        // Convert to approximate meters (simplified)
        const x = deltaLon * 111320;
        const z = deltaLat * 110574;
        const y = -utility.coordinates.depth;

        return {
            position: { x, y, z },
            scale: { x: 1, y: 1, z: 1 },
            geometry: getUtilityGeometry(utility.type),
            material: getUtilityMaterial(utility.type)
        };
    };

    const getUtilityGeometry = (type: string) => {
        // Return appropriate 3D geometry based on utility type
        switch (type) {
            case 'FIBER':
                return { type: 'cylinder', radius: 0.05, height: 1 };
            case 'WATER':
                return { type: 'cylinder', radius: 0.15, height: 1 };
            case 'SEWAGE':
                return { type: 'cylinder', radius: 0.3, height: 1 };
            default:
                return { type: 'sphere', radius: 0.1 };
        }
    };

    const getUtilityMaterial = (type: string) => {
        // Return appropriate material/color based on utility type
        switch (type) {
            case 'FIBER':
                return { color: '#FF0000' };
            case 'WATER':
                return { color: '#0000FF' };
            case 'SEWAGE':
                return { color: '#964B00' };
            default:
                return { color: '#CCCCCC' };
        }
    };

    return (
        <arView
            ref={arViewRef}
            style={styles.arView}
        />
    );
}

const styles = StyleSheet.create({
    arView: {
        height: "100%",
        width: "100%"
    }
});