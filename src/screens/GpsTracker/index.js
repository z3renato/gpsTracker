import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, PermissionsAndroid, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import _ from 'lodash';
import moment from 'moment';
import Location from './Location';

const Page = (props) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 'Iniciando',
    longitude: 'Iniciando',
    saveTime: 'Iniciando',
  });
  const [hasGpsPermission, setHasGpsPermission] = useState(false);
  const [locations, setLocations] = useState([]);
  const user = useSelector(state => state.userReducer.email)
  const [runing, setRuning] = useState(true);
  const requestGeolocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    setHasGpsPermission(hasPermission);
    if (hasPermission) return;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão de Localização",
          message:
            "O aplicativo precisa de acesso a localização " +
            "para rastrear o dispositivo.",
          buttonNeutral: "Pergunte Depois",
          buttonNegative: "Cancelar",
          buttonPositive: "Permitir"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Geolocation Permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (!runing) return;
    const interval = setInterval(() => {
      const saveTime = moment().format();
      const watchId = Geolocation.getCurrentPosition(
        (result) => {
          const coords = result.coords;
          setCurrentLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            saveTime,
          })
        },
        e => setError(e.message),
        { enableHighAccuracy: true, maximumAge: 1000 }
      );
      return () => Geolocation.clearWatch(watchId);
    }, 3000);

    return () => clearInterval(interval);
  }, [runing, locations]);

  useEffect(() => {
    setLocations([currentLocation, ...locations]);
  }, [currentLocation]);

  useEffect(() => {
    requestGeolocationPermission();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.text}>Bem-vindo(a), {user}</Text>
          <Text style={[styles.text, { color: 'orange' }]}>{runing ? 'Rastreando' : 'Rastreamento pausado'}</Text>
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <ScrollView>
          {hasGpsPermission ? (_.map(locations, (location, index) => (
            <View key={index} style={styles.listItem}>
              <Location {...location} />
              <View style={styles.divider} />
            </View>
          ))) : (
              <Text>Permita que o aplicativo acesse sua localização</Text>
            )}
        </ScrollView>
      </View>
      <View style={styles.divider} />
      <View style={{ flex: 1, marginTop: 15, backgroundColor: '#4A69BD', }}>
        <Button
          style={{ marginVertical: 3, borderRadius: 8 }}
          onPress={() => setRuning(!runing)}
          title={runing ? 'PARAR' : 'RASTREAR'}
          color={runing ? 'red' : 'green'}
        />
        <Button
          style={{ marginVertical: 3, borderRadius: 8 }}
          onPress={() => {
            setLocations([]);
          }}
          title="LIMPAR"
          color="orange"
        />
        <Button
          style={{ marginVertical: 3, borderRadius: 8 }}
          onPress={() => {
            props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login' })
              ]
            }));
          }}
          title="SAIR"
          color="#4A69BD"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  header: {
    minHeight: 100,
    backgroundColor: '#4A69BD',
    alignItems: 'center',
    color: '#FFFF'
  },
  container: {
    height: '100%',
  },
  text: {
    color: '#FFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    alignContent: 'center',
  },
  list: {
    flex: 3,
    display: 'flex',
    width: '100%',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 8,
  },
  listItem: {
    flex: 1,

  },
  item: {
    justifyContent: 'space-between',
  },
  subItem: {
    flex: 1,
    alignContent: 'center',
  },
  divider: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#D3D3D3',
    borderRadius: 5,
  },
});

export default Page;