import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import useUserData from "../../../hooks/useUserData";
import GridListComponent from "../../GridListComponent";

const ExploreTab = ({ onPress }) => {
  const { userId } = useAuth();
  const { exploreUsers } = useUserData();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridListComponent data={exploreUsers} numColumns={2} onPress={onPress} />
    </View>
  );
};

export default ExploreTab;
