import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PrimaryBtnComponent from '../../components/PrimaryBtnComponent';
import VideoHeaderComponent from '../../components/VideoHeaderComponent';
const friends = [
  { name: 'John', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Sarah', imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Mark', imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg' }, { name: 'John', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Sarah', imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Mark', imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
];
const cryptocurrencies = [
  { name: 'FlovatarToken', symbol: 'DUST', imgUrl: 'https://res.cloudinary.com/ddbgaessi/image/upload/v1676667835/flovaty-removebg-preview_dj7vdp.png' },
  { name: 'FlowToken', symbol: 'FLOW', imgUrl: 'https://res.cloudinary.com/ddbgaessi/image/upload/v1677272396/FlowLogo_tdohjz.png' },

]

export default function GameDetailsView({navigation}) {

  const handleNav = () => {
    navigation.navigate("Metarace")
  }

  return (
    <View style={styles.container}>
      {/* Video header that plays a preview */}
      <VideoHeaderComponent uri="https://res.cloudinary.com/ddbgaessi/video/upload/v1677256193/demo_hefion.mov" />

      <View
        style={{
          height: "50%",
          paddingHorizontal: 20
        }}>

        <Text style={styles.description}>
          Metarace is a fun and addictive casual game that allows players to earn tokens from the flow ecosystem while they play. The game is set in a digital world where players control their Avatar to collect as many tokens as possible. The game is simple and easy to play, making it perfect for casual gamers.          </Text>


        {/* Pool component that communicates the total USD value of the prizes */}
        <View style={styles.poolContainer}>
          <Text style={styles.poolTitle}>Total Prize Pool</Text>
          <Text style={styles.poolValue}>$1,000 USD</Text>
        </View>

        {/* Participating tokens component */}
        <View style={styles.poolContainer}>

          <Text style={styles.tokens}>
            Tokens Pool
          </Text>

          {/* tokens */}
          <View style={styles.friends}>

            {cryptocurrencies.map((currency, index) => (
              <Image
                key={index}
                source={{ uri: currency.imgUrl }}
                style={styles.avatar}
              />
            ))}

          </View>
        </View>

        <View style={styles.poolContainer}>

          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 8,
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Friends playing
          </Text>

          {/* Friends that have this game */}
          <View style={styles.friends}>

            {friends.map((friend, index) => (
              <Image
                key={index}
                source={{ uri: friend.imgUrl }}
                style={styles.avatar}
              />
            ))}

          </View>
        </View>
      </View>
      <View style={{
        width: "100%",
        display: "flex",
        alignItems: "center"
      }}>
        <PrimaryBtnComponent label={"PURCHASE"} onPress={handleNav} />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 30
  },
  video: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  description: {
    marginBottom: 0,
    paddingRight: 20,
    height: 140
  },
  poolContainer: {
    flexDirection: 'Column',
    alignItems: 'flex-start',
    justifyContent: "center",
    marginBottom: 30,
    height: 80,
  },
  poolTitle: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 20,
    marginBottom: 6,
  },
  poolValue: {
    fontWeight: 'regular',
    fontSize: 16,
  },
  tokens: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 20,
    marginBottom: 10,
  },
  friends: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

