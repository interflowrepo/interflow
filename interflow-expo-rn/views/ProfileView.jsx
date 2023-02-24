import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ProfileView = () => {
  const handleBuyTokens = () => {
    // Add your logic for buying tokens here
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>
          Buy Tokens
        </Text>
        <TouchableOpacity onPress={handleBuyTokens}>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>Option 1: Buy 10 Tokens</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBuyTokens}>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>Option 2: Buy 20 Tokens</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBuyTokens}>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>Option 3: Buy 50 Tokens</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileView;
