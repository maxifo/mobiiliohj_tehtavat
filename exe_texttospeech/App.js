import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Speech from 'expo-speech';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {

  const [text, setText] = useState("");

  const Speak = () => {
    Speech.speak(text)
  }

  return (
    <View style={styles.container}>
      <TextInput style={{ marginBottom: 10, height: 60, width: 250, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button title="Press to hear text" onPress={Speak} />
      <StatusBar style="auto" />
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
