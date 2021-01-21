
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState();
  const buttonPressed = () => {
    setResult(parseInt(text) + parseInt(text2));
  }
  const buttonPressed2 = () => {
    setResult(text - text2);
  }
  return (

    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput keyboardType={'number-pad'}
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput keyboardType={'number-pad'}
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text2 => setText2(text2)}
        value={text2}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={buttonPressed} title="+" />
        <Button onPress={buttonPressed2} title="-" />
      </View>
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
