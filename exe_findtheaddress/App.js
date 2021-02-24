
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function App() {

  const [address, setAddress] = useState("");
  const [long, setLong] = useState(24.934302)
  const [lat, setLat] = useState(60.200692)


  const Find = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=x3NGUX0T9O7goaMfgENWm6AIxefvnf6u&location=' + address;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let location = data.results[0].locations[0].latLng;
        setLong(location.lng);
        setLat(location.lat)

      })
  }


  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        Region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}>
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long
          }}
        />
      </MapView>
      <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={address => setAddress(address)}
        value={address}
      />
      <Button onPress={Find} title="Show" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
