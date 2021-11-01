import { StyleSheet } from 'react-native';

const buttonStyles = {
    marginTop: 20,
    width: "100%",
    paddingVertical: 15
  };

  const infoCell = {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#f1f1f1"
  };

 export default StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 25,
      paddingHorizontal: 10
    },
    userMetaContainer: {
      padding: 10,
      flexDirection: "row",
      alignItems: "flex-start",
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.36,
      shadowRadius: 2,

      elevation: 2
    },
    doctorInfo: {
      paddingHorizontal: 10,
      marginTop: 20,
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.36,
      shadowRadius: 2,
      elevation: 2
    },
    userMeta: {
      marginLeft: 20,
      paddingTop: 10,
      alignItems: "center",
    },
    userAvtar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: '#007bff',
      alignSelf: "flex-start",
      justifyContent: "center",
      alignItems: "center"
    },
    userAvtarText: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#fff",
    },
    logoutButton: {
      ...buttonStyles,
      backgroundColor: '#dc3545'
    },
    backButton: {
      ...buttonStyles
    },
    buttonText: {
      fontSize: 17,
    },
    infoCell: {
      ...infoCell,
    },
    lastCell: {
      ...infoCell,
      borderBottomWidth: 0,
    },
    infoTitle: {
    },
    infoText: {
      fontSize: 17,
      textAlign: "left"
    },
    mapContainer: {
      height: 200, marginTop: 20
    },
    map : {
      flex: 1,
    }
  });