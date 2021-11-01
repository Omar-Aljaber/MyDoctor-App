import Reat from 'react';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'

    },
    checkbox: {
        marginLeft: 5,
    },
    checkboxLabel: {
        fontSize: 18,
        position: 'absolute',
        paddingLeft: 40,
    }
});

export default style;
