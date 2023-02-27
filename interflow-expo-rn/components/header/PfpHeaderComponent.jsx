import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import PfpComponent from './PfpComponent';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';

export default function PfpHeaderComponent({ navigation }) {
  const { user } = useUser()
  const {userInterflowTokens} = useAuth()

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
          flexDirection: "row",

          position: "absolute",
          right: 0,

        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{userInterflowTokens || 0}</Text>
        <Image source={{
          uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677272668/logo_kkdwhj.png"
        }} style={styles.image} />   
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
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },


  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 34,
    width: 120,
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
    height: 110,
    width: "33%"
  },
});
