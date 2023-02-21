import React from "react";
import { ScrollView, View, Text } from "react-native";

// LeaderComponent that renders the data of the leader
const LeaderComponent = ({ name, rank }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{rank}</Text>
    </View>
  );
};

// Data for the leaders
const leaders = [
  { name: "Collector 91", rank: 1 },
  { name: "Collector 23", rank: 2 },
  { name: "Collector 33", rank: 3 },
  { name: "Collector 47", rank: 1 },
  { name: "Collector 51", rank: 2 },
  { name: "Collector 69", rank: 3 },
  { name: "Collector 84", rank: 1 },
  { name: "Collector 92", rank: 2 },
  { name: "Collector 13", rank: 3 },
];

const RankingsTab = () => {
  return (
    <ScrollView>
      <View style={{ flexDirection: "column" }}>
        <Text>Year</Text>
        <View style={{ flex: 1, margin: 30 }}>
          {leaders.slice(0, 3).map((leader) => (
            <LeaderComponent
              key={leader.rank}
              name={leader.name}
              rank={leader.rank}
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
            alignItems: "flex-end",
            alignSelf: "center",
          }}
        >
          <Text>SEE MORE</Text>
        </View>

        <Text>Month</Text>
        <View style={{ flex: 1, margin: 30 }}>
          {leaders.slice(3, 6).map((leader) => (
            <LeaderComponent
              key={leader.rank}
              name={leader.name}
              rank={leader.rank}
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
            alignItems: "flex-end",
            alignSelf: "center",
          }}
        >
          <Text>SEE MORE</Text>
        </View>

        <Text>Day</Text>
        <View style={{ flex: 1, margin: 30 }}>
          {leaders.slice(6, 9).map((leader) => (
            <LeaderComponent
              key={leader.rank}
              name={leader.name}
              rank={leader.rank}
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
            alignItems: "flex-end",
            alignSelf: "center",
          }}
        >
          <Text>SEE MORE</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RankingsTab;
