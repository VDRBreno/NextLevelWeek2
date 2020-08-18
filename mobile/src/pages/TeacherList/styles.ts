import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },

    teacherList: {
        marginTop: -40
    },

    containerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 20,
        color: '#aaa',
        maxWidth: 250,
        textAlign: 'center'
    },

    borderlessButton: {
        marginLeft: -20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchForm: {
        marginBottom: 24
    },

    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular'
    },

    picker: {
        height: 54,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 4,
        marginBottom: 16
    },

    pickerItem: {
        backgroundColor: '#fff000'
    },

    input: {
        height: 54,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    submitButton: {
        backgroundColor: '#04d361',
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submitButtonText: {
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16
    }
});

export default styles;