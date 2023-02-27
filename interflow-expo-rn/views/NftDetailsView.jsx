import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import UserNftCard from '../components/social/user/UserNftCard'
import PrimaryBtnComponent from '../components/PrimaryBtnComponent'

export default function NftDetailsView({navigation}) {

  const NftActionsComponent = () => {

    const handleNav = () => {
      navigation.navigate("AiTransform")
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer1}
          onPress={handleNav}
          >
          <Image source={require('../assets/nft-view/CustomizeIcon.png')} style={styles.image} />
          <Text style={styles.label}>AI Variation</Text>
        </TouchableOpacity>
        <View style={[styles.imageContainer2]}>
          <Image source={require('../assets/nft-view/PostIcon.png')} style={styles.image} />
          <Text style={styles.label}>Post</Text>
        </View>
        <View style={styles.imageContainer3}>
          <Image source={require('../assets/nft-view/TransformIcon.png')} style={styles.image} />
          <Text style={styles.label}>3D Transform</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({

    centerBottom: {
      bottom: 0,
      justifyContent: 'flex-end',
    },
    container: {
      height: '30%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    imageContainer1: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 90,
    },
    imageContainer2: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      // align middle
      bottom: 30,
      width: "100%"

    }, imageContainer3: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      right: 90
    },
    image: {
      width: 70,
      height: 70,
    },
    label: {
      marginTop: 10,
      textAlign: 'center',
    },
  });

  return (
    <View>
      <View style={{
        height: "67%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <UserNftCard width={260} height={400} />
      </View>
      <NftActionsComponent />
    </View>
  )
}