
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';


export default function App() {

  const [product, setProduct] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addProduct = () => {
    setProduct(product);
    setShoppingList([...shoppingList, { key: product }]);

  }
  const clear = () => {
    setShoppingList([]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={product => setProduct(product)}
        value={product}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={addProduct} title="Add" />
        <Button onPress={clear} title="Clear" />
      </View>

      <View style={styles.flatlist}>
        <Text style={{ fontStyle: 'italic' }} >Shopping List</Text>
        <FlatList
          data={shoppingList}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 150,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
  }
});
