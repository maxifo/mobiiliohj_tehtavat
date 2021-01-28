import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';

export default function App() {
  const [num, setNum] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState();
  const [history, setHistory] = useState([]);

  const plus = () => {
    setResult(parseInt(num) + parseInt(num2));

    const str = num + " + " + num2 + " = " + (parseInt(num) + parseInt(num2));

    setHistory([...history, { key: str }]);

  }
  const miinus = () => {
    setResult(num - num2);

    const str = num - " - " + num2 + " = " + (parseInt(num) - parseInt(num2))

    setHistory([...history, { key: str }]);
  }
  return (

    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput keyboardType={'number-pad'}
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={num => setNum(num)}
        value={num}
      />
      <TextInput keyboardType={'number-pad'}
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={num2 => setNum2(num2)}
        value={num2}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={plus} title="+" />
        <Button onPress={miinus} title="-" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <FlatList
          data={history}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>}
        />
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
