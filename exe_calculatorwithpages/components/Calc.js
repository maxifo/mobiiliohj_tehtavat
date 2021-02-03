
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

function Calculator({ navigation }) {
    const [num, setNum] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const plus = () => {
        setResult(parseInt(num) + parseInt(num2));

        const str = num + " + " + num2 + " = " + (parseInt(num) + parseInt(num2));

        setHistory([...history, { key: str }]);

    }
    const miinus = () => {
        setResult(num - num2);

        const str = num + " - " + num2 + " = " + (parseInt(num) - parseInt(num2));

        setHistory([...history, { key: str }]);
    }
    return (

        <View style={styles.container}>
            <Text>Result: {result}</Text>
            <TextInput keyboardType={'numeric'}
                style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={num => setNum(num)}
                value={num}
            />
            <TextInput keyboardType={'numeric'}
                style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={num2 => setNum2(num2)}
                value={num2}
            />
            <View style={{ flexDirection: 'row' }}>
                <Button onPress={plus} title="+" />
                <Button onPress={miinus} title="-" />
                <Button title="History" onPress={() => navigation.navigate('History', { hist: history })}
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



export default Calculator;
