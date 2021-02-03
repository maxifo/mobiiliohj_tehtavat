
import React from 'react';
import { Text, View, FlatList } from 'react-native';

function History({ route }) {

    const { hist } = route.params;
    return (
        <View style={{ flexDirection: 'row' }}>
            <FlatList
                data={hist}
                ListHeaderComponent={<Text>History</Text>}
                renderItem={({ item }) =>
                    <Text>{item.key}</Text>}
            />
        </View>
    )
}
export default History;