import * as Contacts from 'expo-contacts';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContact(data);
      }
    }

  }

  return (
    <View style={styles.container}>
      <FlatList style={{ marginTop: 50 }}
        data={contact}
        renderItem={({ item }) => {
          return (
            <Text>{`${item.name} (${item.phoneNumbers ? item.phoneNumbers[0].number : ''})`}</Text>
          )
        }}
      />
      <Button title="Get contacts" onPress={getContacts} />
    </View >
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
