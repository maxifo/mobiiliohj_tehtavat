import React, { useState, useEffect } from 'react';
import { Header, Icon, Input, ListItem, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, FlatList } from 'react-native';


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

  renderItem = ({ item }) => (

    <ListItem bottomDivider >
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
        <Text><Icon name='delete' color='#ff0000' onPress={() => deleteItem(item.id)} /></Text>
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
      />
      <Input placeholder="Product" label='PRODUCT' onChangeText={product => setProduct(product)}
        value={product} />
      <Input placeholder="Amount" label='AMOUNT' keyboardType="numeric" onChangeText={amount => setAmount(amount)}
        value={amount} />
      <Button raised icon={{ name: 'save' }} onPress={saveItem} title="SAVE" />


      <FlatList style={{ width: 400 }}
        keyExtractor={item => item.id.toString()}
        data={shoppingList}
        renderItem={renderItem}
      />
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

  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});