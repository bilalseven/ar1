import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function LoadingSpinner() {
    return (
        <flexboxLayout style={styles.container}>
            <activityIndicator busy={true} style={styles.spinner} />
            <label style={styles.text}>Loading...</label>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    spinner: {
        width: 32,
        height: 32
    },
    text: {
        fontSize: 16,
        color: "#666"
    }
});