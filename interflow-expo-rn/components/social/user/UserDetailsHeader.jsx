import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const UserDetailsHeader = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={{
        uri: props.backgroundImageSource,
      }} />

      <View style={styles.topLeftContainer}>
        <Text style={styles.nameTitle}>{props.userName}</Text>
        <Text style={styles.address}>{props.userAddress}</Text>
      </View>

      <TouchableOpacity style={styles.topRightButton} onPress={props.onPressButton}>
        <Text style={styles.buttonText}>{props.buttonText}</Text>
      </TouchableOpacity>

      <Image style={styles.avatarImage} source={{
        uri: props.avatarImageSource,
      }} />

      <View style={styles.bottomRightContainer}>
        <Text style={styles.bottomRightText}>{props.bottomRightText1}</Text>
        <Text style={styles.bottomRightText}>{props.bottomRightText2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topLeftContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#fff',
  },
  topRightButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  avatarImage: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bottomRightContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  bottomRightText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
});

export default UserDetailsHeader;
