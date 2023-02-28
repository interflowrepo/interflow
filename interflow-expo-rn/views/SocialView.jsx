import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomTabs from "../components/CustomTabs";
import ExploreTab from "../components/social/tabs/ExploreTab";
import FollowingTab from "../components/social/tabs/FollowingTab";
import RankingsTab from "../components/social/tabs/RankingTab";
import { useAuth } from "../contexts/AuthContext";

const SocialView = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { auth, setIsOpen } = useAuth();

  const handleTabChange = (tabId) => {
    if (!auth) {
      setIsOpen(true);
      return;
    }
    setActiveTab(tabId);
  };

  const handleNavigateToUserDetails = (item) => {
    navigation.navigate({
      name: "UserDetails",
      params: {
        user: item,
      },
    });
  };

  return (
    <View style={styles.container}>
      <CustomTabs activeTab={activeTab} onChangeTab={handleTabChange} />
      {activeTab === 1 && (
        <FollowingTab
          onPressNoFollowing={() => handleTabChange(2)}
          onPress={handleNavigateToUserDetails}
        />
      )}
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
