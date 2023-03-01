import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useUserData from "../../../hooks/useUserData";

// LeaderComponent that renders the data of the leader
const LeaderComponent = ({ pfpLink, name, address, rank, nftLength }) => {
  return (
    <View style={styles.leader}>
      <View>
      <Text style={styles.textRank}>{rank}</Text>
      <Text style={styles.textRank2}>{rank}</Text>
      </View>
      <Image
        style={styles.avatarImage}
        source={{
          uri: pfpLink,
        }}
      />
      <View>
        <Text style={styles.textSub}>{name}</Text>
        <Text style={styles.textSubAddress}>{address}</Text>
      </View>
      <View>
        <Text style={styles.textSub}>{nftLength}</Text>
        <Text style={styles.textSubAddress}>Nfts</Text>
      </View>
    </View>
  );
};

const RankingsTab = () => {
  const { getRanking } = useUserData();
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    callGetRanking();
  }, []);

  const callGetRanking = async () => {
    const ranking = await getRanking();
    setRanking(ranking);
    console.log("RANKINGGGG", ranking);
  };

  return (
    <ScrollView>
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>Monthly Ranking</Text>
        <Text style={{ fontSize: 10 }}>Top 3 win exclusive prizes!</Text>
        <View style={{ flex: 1, margin: 30, marginBottom: 10 }}>
          {ranking.slice(0, 3).map((leader, index) => (
            <LeaderComponent
              key={index}
              name={leader.nickname}
              rank={index + 1}
              nftLength={leader.nftLength}
              address={leader.address}
              pfpLink={leader.pfpImage}
            />
          ))}
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            height: 50,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 30,
          }}
        >
          <Text>SEE FULL RANKING</Text>
        </View>

        <Text style={styles.text}>Daily Ranking</Text>
        <LinearGradient
          colors={["#f9fd19c1", "#577ed4", "#3059ca"]}
          style={styles.commingSoon}
        >
          <Text style={styles.text}>Coming soon...</Text>
        </LinearGradient>

        <Text style={styles.text}>Ranking by project</Text>
        <Text style={{ fontSize: 10 }}>
          Leaders of rankings by project will win exclusive prizes!
        </Text>
        <LinearGradient
          colors={["#f9fd19c1", "#577ed4", "#3059ca"]}
          style={styles.commingSoon}
        >
          <Text style={styles.text}>Coming soon...</Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default RankingsTab;

const styles = StyleSheet.create({
  centeredContainer: {
    paddingTop: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textSub: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textSubAddress: {
    fontSize: 10,
  },
  textRank: {
    fontSize: 26,
    fontWeight: "bold",
    position: "absolute",
    color: "#014e71",
    shadowColor: "#000",
    left: -2,
    bottom: 7,
  },
  textRank2: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    color: "#E4E914",
    shadowColor: "#000",
    left: 0,
    bottom: 7,
  },  
  commingSoon: {
    flex: 1,
    margin: 20,
    marginBottom: 50,
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leader: {
    flex: 1,
    width: "73%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    marginLeft: 40,
    gap: 40,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
