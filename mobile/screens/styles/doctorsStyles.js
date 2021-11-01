import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    searchSection: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 1000,
      backgroundColor: "#fff",
      alignItems: 'center'
    },
    searchInputContainer: {
      flexDirection: "row",
      backgroundColor: "#fff",
      width: "90%",
      margin: 20,
      padding: 5,
      justifyContent: "center",
      shadowColor: "#000",
    },
    searchInput: {
       width: "100%",
       marginBottom: 0,
       borderBottomWidth: 0,

    },
    doctorName: {
      fontSize: 18,
    },
    doctorSpec: {
      fontSize: 16,
    },
    doctorsListContainer: {
      marginTop: 30
    },
    itemContainer: {
      padding: 15,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc"
    },
    doctorAvatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 10,
      backgroundColor: '#007bff',
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center"
    },
    doctorAvatarText: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#fff"
    },
    doctorInfo: {
      alignItems: "flex-end",
      marginRight: 15
    },
    noDoctorsText: {
      textAlign: 'center', paddingTop: 10, fontSize: 18
    }
  });
