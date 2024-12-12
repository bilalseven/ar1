import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <flexboxLayout style={styles.container}>
            <label style={styles.errorText}>{message}</label>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    errorText: {
        color: "#FF3B30",
        textAlignment: "center",
        fontSize: 16
    }
});