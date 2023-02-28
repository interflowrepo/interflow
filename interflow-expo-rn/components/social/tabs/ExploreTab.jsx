import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import useUserData from "../../../hooks/useUserData";
import GridLoaderSocialListComponent from "../../GridLoaderSocialListComponent";
import GridSocialListComponent from "../../GridSocialListComponent";

const ExploreTab = ({ onPress }) => {
  const { userId } = useAuth();
  const { getExploreUsers, exploreUsers } = useUserData();

  useEffect(() => {
    getExploreUsers();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      {!exploreUsers.length > 0 ? (
        <GridLoaderSocialListComponent />
      ) : (
        <GridSocialListComponent
          data={exploreUsers}
          numColumns={2}
          onPress={onPress}
        />
      )}
    </View>
  );
};

export default ExploreTab;
