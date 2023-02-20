import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomTabs from '../components/CustomTabs';
import FollowingTab from '../components/social/tabs/FollowingTab';

const SocialView = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <View style={styles.container}>
      <CustomTabs activeTab={activeTab} onChangeTab={handleTabChange} />
      {activeTab === 1 && <FollowingTab />}
      {activeTab === 2 && <View style={{ backgroundColor: 'green', flex: 1 }} />}
      {activeTab === 3 && <View style={{ backgroundColor: 'blue', flex: 1 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SocialView;
