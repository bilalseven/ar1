import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { ARView } from "./ar/ARView";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";
import { LocationService } from "../services/LocationService";
import { UtilityService, UndergroundUtility } from "../services/UtilityService";

export function MainScreen() {
    const [userLocation, setUserLocation] = React.useState(null);
    const [utilities, setUtilities] = React.useState<UndergroundUtility[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        initializeLocation();
    }, []);

    const initializeLocation = async () => {
        try {
            const hasPermission = await LocationService.requestPermissions();
            if (!hasPermission) {
                setError("Location permissions are required");
                return;
            }

            const location = await LocationService.getCurrentPosition();
            if (location) {
                setUserLocation(location);
                const nearbyUtilities = await UtilityService.getNearbyUtilities(
                    location.latitude,
                    location.longitude,
                    100
                );
                setUtilities(nearbyUtilities);
            } else {
                setError("Could not determine your location");
            }
        } catch (err) {
            setError("Failed to initialize location services");
        }
    };

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!userLocation) {
        return <LoadingSpinner />;
    }

    return (
        <flexboxLayout style={styles.container}>
            <ARView
                utilities={utilities}
                userLocation={userLocation}
            />
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
});