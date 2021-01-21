import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [msg, setMsg] = useState('Guess a number between 1-100');
  const [count, setCount] = useState(1);
  const [number, setNumber] = useState();
  const random = useState(Math.floor(Math.random() * 100) + 1)
  const Guess = () => {
    if (parseInt(number) === parseInt(random)) {
      Alert.alert('You guessed the number in ' + count + ' guess(es)');
      setMsg('Guess a number between 1-100');
      setCount(1);
    }
    else if (parseInt(number) > parseInt(random)) {
      setMsg('Your guess ' + number + ' is too high');
      setCount(count + 1);
    }
    else if (parseInt(number) < parseInt(random)) {
      setMsg('Your guess ' + number + ' is too low');
      setCount(count + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
      <TextInput keyboardType={'number-pad'} style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={number => setNumber(number)}
        value={number}
      />
      <Button onPress={Guess} title="Make guess" />

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
