import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomTabs from "../components/CustomTabs";
import ExploreTab from "../components/social/tabs/ExploreTab";
import FollowingTab from "../components/social/tabs/FollowingTab";
import RankingsTab from "../components/social/tabs/RankingTab";

const SocialView = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNavigateToUserDetails = () => {
    navigation.navigate("UserDetails");
  };

  return (
    <View style={styles.container}>
      <CustomTabs activeTab={activeTab} onChangeTab={handleTabChange} />
      {activeTab === 1 && <FollowingTab onPress={() => handleTabChange(2)} />}
      {activeTab === 2 && <ExploreTab onPress={handleNavigateToUserDetails} />}
      {activeTab === 3 && <RankingsTab />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default SocialView;
