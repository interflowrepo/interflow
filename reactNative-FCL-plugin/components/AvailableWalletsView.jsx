import { StyleSheet, View, Pressable, Text } from "react-native";

const AvailableWalletsView = ({
  services,
  userAddr,
  onPressActionFn,
  getStorageData,
  getAllStoredData,
  closeAvailableWalletsView,
}) => {
  // getStorageData();
  // getAllStoredData();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        marginTop: 25,
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      <View>
        <Text style={{ color: "white" }}>FCL Discovery</Text>
        {userAddr != undefined && (
          <Text style={{ color: "white" }}>User Address: {userAddr}</Text>
        )}
      </View>
      <View style={{ backgroundColor: "white", paddingVertical: 20 }}>
        <>
          {services != undefined &&
            services.map((service) => {
              return (
                <View style={styles.buttonContainer} key={service.endpoint}>
                  <Pressable
                    style={styles.button}
                    onPress={() => onPressActionFn(service)}
                  >
                    <Text style={styles.buttonLabel}>
                      {service.provider.name}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => closeAvailableWalletsView()}
            >
              <Text style={styles.buttonLabel}>Close</Text>
            </Pressable>
          </View>
        </>
      </View>
    </View>
  );
};

export default AvailableWalletsView;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    backgroundColor: "#000",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
