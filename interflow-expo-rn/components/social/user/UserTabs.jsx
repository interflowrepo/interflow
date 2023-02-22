import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserTabs = ({ activeTab, onChangeTab }) => {
  const [tabs] = useState([
    { id: 1, title: "COLLECTIONS" },
    { id: 2, title: "FEED" },
  ]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      paddingHorizontal: 30,
      width: "100%",
      position: "absolute",
      zIndex: 1,
      top: 170,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "black",

    },
    activeTab: {
      backgroundColor: "black",
      borderBottomWidth: 2,
      borderBottomColor: "white",
    },
    tabTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#666",
    },
    activeTabTitle: {
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id ? styles.activeTab : null]}
          onPress={() => onChangeTab(tab.id)}
        >
          <Text
            style={[
              styles.tabTitle,
              activeTab === tab.id ? styles.activeTabTitle : null,
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserTabs;
