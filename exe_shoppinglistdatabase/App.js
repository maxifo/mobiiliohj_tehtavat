
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const db = SQLite.openDatabase("shoppinglistdb.db");

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [shoppingList, setShoppingList] = useState([]);




  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql("create table if not exists shoppinglist (id integer primary key not null, product text, amount text);");
    }, null, updateList);
  }, []);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql("select * from shoppinglist;", [], (_, { rows }) =>
        setShoppingList(rows._array)
      );
    });
  }

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql("insert into shoppinglist (product, amount) values (?, ?);",
        [product, amount]);
    }, null, updateList
    )
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => { tx.executeSql(`delete from shoppinglist where id = ?;`, [id]); }, null, updateList)
  }


  return (
    <View style={styles.container}>
      <TextInput placeholder="Product" style={{ marginTop: 30, borderWidth: 1, width: 200, borderColor: 'gray' }} onChangeText={product => setProduct(product)}
        value={product} />
      <TextInput placeholder="Amount" style={{ marginTop: 5, marginBottom: 10, borderWidth: 1, width: 200, borderColor: 'gray' }} keyboardType="numeric" onChangeText={amount => setAmount(amount)}
        value={amount} />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ fontSize: 20, marginTop: 15 }} >Shopping List</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.product}, {item.amount}</Text>
          <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> bought</Text></View>}
        data={shoppingList}
      />
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

  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});