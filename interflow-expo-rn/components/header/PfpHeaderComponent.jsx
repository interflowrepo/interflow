import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import PfpComponent from './PfpComponent';
import { useUser } from '../../contexts/UserContext';

export default function PfpHeaderComponent({navigation}) {
  const { user } = useUser()

  const UserBalanceComponent = () => {
    return (
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 30,
          width: "50%",
          position: "relative",
          backgroundColor: "white",
          borderRadius: 15,
          margin: 10,
          
          position: "absolute",
          right: 0,
          
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>0.00</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.profileContainer}>
      <PfpComponent pfpUrl={user.pfpUrl} />
      <UserBalanceComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 34,
    width: 100,
    position: "relative",
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
  },


  txt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },

  txtContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 120,
    width: "33%"
  },
});
