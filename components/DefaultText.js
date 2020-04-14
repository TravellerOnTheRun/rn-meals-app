import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = props => {
    return <Text style={styles.txt}>{props.children}</Text>
};

const styles = StyleSheet.create({
    txt: {
        fontFamily: 'open-sans'
    }
});

export default DefaultText;
