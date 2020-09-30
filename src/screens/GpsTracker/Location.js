import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export const Location = ({ latitude, longitude, saveTime }) => {

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.subItem}>
                    <Text>Latitude</Text>
                </View>
                <View style={styles.subItem}>
                    <Text>{latitude}</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.subItem}>
                    <Text>Longitude</Text>
                </View>
                <View style={styles.subItem}>
                    <Text>{longitude}</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.subItem}>
                    <Text>Hora da captura</Text>
                </View>
                <View style={styles.subItem}>
                    <Text>{saveTime}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: '4%',
    },
    item: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
    },
    subItem: {
        flex: 1,
        alignContent: 'center',
    }
});
export default Location;
