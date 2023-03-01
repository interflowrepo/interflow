import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserNftCard from "../components/social/user/UserNftCard";
import UserService from "../services/UserService";
import PrimaryBtnComponent from "../components/PrimaryBtnComponent";

export default function NftDetailsView({ navigation, route }) {
  const [canReveal, setCanReveal] = useState(false);
  const [revealedLink, setRevealedLink] = useState("");
  const [revealed, setRevealed] = useState(false);

  const nft = useMemo(() => {
    return route.params.nft;
  }, [route.params]);

  const NftActionsComponent = () => {
    const [interflowNft, setInterflowNft] = useState(false);
    console.log(interflowNft);

    const handleNav = () => {
      navigation.navigate({
        name: "AiTransform",
        params: {
          nft: nft,
        },
      });
    };

    useEffect(() => {
      allowReveal();
    }, []);

    const allowReveal = useCallback(async () => {
      const result = await UserService.getCustom(nft.interflowId);
      if (result.readyToReveal) {
        setCanReveal(true);
      } else if(result.revealed){
        setRevealed(true);
      } else {
        setRevealed(false);
      }
      console.log("INTERFLOW DATA --- 123 ", result);
      setRevealedLink(result.customNftImageLink)
      console.log("CAN REVEAL", canReveal)
    }, []);

    const revealNft = useCallback(async () => {
      const result = await UserService.revealCustom(nft.interflowId);
      console.log("INTERFLOW DATA ---  333", result);
      if(result.revealed){
        setRevealedLink(result.customNftImageLink)
        console.log("REVEALED LINK", revealedLink)
        setRevealed(true);
      }
      Alert.alert("Interflow Revealed with success!");
    }, []);

    useCallback(async () => {
      if (nft && nft.isInterflow) {
        setInterflowNft(true);
      }
    }, [nft]);

    return (
      <>
        {nft.isInterflow ? (
          <View style={styles.container}>
            {revealed ? (
              <View style={[styles.imageContainer2]}>
                <Image
                  source={require("../assets/nft-view/PostIcon.png")}
                  style={styles.image}
                />
                <Text style={styles.label}>Post</Text>
              </View>
            ) : (
              <PrimaryBtnComponent
                label={"REVEAL"}
                onPress={revealNft}
                disabled={!canReveal}
              />
            )}
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.imageContainer1}
              onPress={handleNav}
            >
              <Image
                source={require("../assets/nft-view/CustomizeIcon.png")}
                style={styles.image}
              />
              <Text style={styles.label}>AI Variation</Text>
            </TouchableOpacity>
            <View style={[styles.imageContainer2]}>
              <Image
                source={require("../assets/nft-view/PostIcon.png")}
                style={styles.image}
              />
              <Text style={styles.label}>Post</Text>
            </View>
            <View style={styles.imageContainer3}>
              <Image
                source={require("../assets/nft-view/TransformIcon.png")}
                style={styles.image}
              />
              <Text style={styles.label}>3D Transform</Text>
            </View>
          </View>
        )}
      </>
    );
  };

  const styles = StyleSheet.create({
    centerBottom: {
      bottom: 0,
      justifyContent: "flex-end",
    },
    container: {
      height: "30%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
    },

    imageContainer1: {
      flex: 1,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: 0,
      left: 90,
    },
    imageContainer2: {
      flex: 1,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      // align middle
      bottom: 30,
      width: "100%",
    },
    imageContainer3: {
      flex: 1,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: 0,
      right: 90,
    },
    image: {
      width: 70,
      height: 70,
    },
    label: {
      marginTop: 10,
      textAlign: "center",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <View>
      <View
        style={{
          height: "67%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserNftCard
          width={260}
          height={400}
          thumbnail={revealedLink != "" ? revealedLink : nft.thumbnail}
        />
      </View>
      <NftActionsComponent />
    </View>
  );
}
