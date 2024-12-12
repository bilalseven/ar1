import * as React from "react";
import { AR } from "@nativescript/ar";
import { StyleSheet } from "react-nativescript";
import { UndergroundUtility } from "../../services/UtilityService";
import { createUtilityNode } from "./ARUtilityNode";

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
        if (!arViewRef.current) return;

        const initAR = async () => {
            try {
                await AR.startSession({
                    planeDetection: true,
                    worldAlignment: "gravityAndHeading"
                });

                utilities.forEach(utility => {
                    const node = createUtilityNode({ utility, userLocation });
                    AR.addNode(node);
                });
            } catch (error) {
                console.error('Failed to initialize AR:', error);
            }
        };

        initAR();

        return () => {
            AR.stopSession();
        };
    }, [utilities, userLocation]);

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