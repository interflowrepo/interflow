import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const EventDetail = ({ icon, title, data }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Ionicons name={icon} size={24} color="black" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text>
        {data}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    height: 100
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default EventDetail;