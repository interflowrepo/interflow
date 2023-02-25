import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Pressable, Text,Image } from "react-native";
import { BlurView } from "expo-blur";

const AvailableWalletsView = ({
  wallets,
  services,
  userAddr,
  onPressActionFn,
  getStorageData,
  getAllStoredData,
  closeAvailableWalletsView,
  removeWalletFn,
}) => {

  const LogoContainer = ({ isOn }) => {
    const statusColor = isOn ? 'lightgreen' : 'grey';
    return (
      <View style={styles.logoContainer}>
        <View style={styles.logo} >
          <Image source={{
            uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677272668/logo_kkdwhj.png"
          }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        </View>
        <View style={[styles.status, { backgroundColor: statusColor }]} />
      </View>
    );
  };

  const onPressAction = async (service) => {
    await onPressActionFn(service);
  };
  // getStorageData();
  getAllStoredData();

  return (
    <BlurView
      tint="dark"
      intensity={70}
      borderBottomRightRadius={60}
      borderBottomLeftRadius={60}
      style={{
        marginTop: 100,
        alignItems: "center",
        width: "100%",
        position: "absolute",
        bottom:0,
        height:"60%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width:"110%",
        marginLeft:"-6%",
        overflow:"hidden",
      }}
    >
      <View>
        {userAddr != undefined && (
          <Text style={{ color: "white" }}>User Address: {userAddr}</Text>
        )}
      </View>
      <View style={{ paddingHorizontal:40 }}>
      <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => closeAvailableWalletsView()}
            >
              <MaterialCommunityIcons name="close-circle" size={28} color="white" />
            </Pressable>
          </View>
        <>
          {services != undefined &&
            services.map((service, idx) => {
              const isConnected = wallets[idx].connected;

              return (
                <View style={styles.walletCard} key={idx}>
                  <LogoContainer isOn={wallets[idx].connected} />
                  <View style={styles.textContainer}>
                    <Text style={styles.walletName}>{wallets[idx].walledName}</Text>
                    <Text style={styles.walletAddress}>{wallets[idx].address ? wallets[idx].address : "NO ADDRESS"}</Text>
                  </View>

                  <Pressable
                    style={{
                      width: "36%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "space-around",
                      paddingHorizontal: 24,
                      backgroundColor: "black",
                      display: "flex",
                      flexDirection: "row",
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                    onPress={
                     !isConnected  ?  () => onPressAction(service) : () => removeWalletFn(wallets[idx].address)
                      // () => removeWalletFn(wallet.address)
                    }
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      {(isConnected) ? "REMOVE" : "CONNECT"
                      }
                    </Text>
                    <MaterialCommunityIcons name="connection" size={16} color="white" />
                  </Pressable>
                </View>
              );
            })}
          
        </>
      </View>
    </BlurView>
  );
};

export default AvailableWalletsView;

const styles = StyleSheet.create({

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginTop: 10,
  },


  walletName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  walletAddress: {
    fontSize: 12,
    color: "grey",
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 14,
    height: "100%",
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  status: {
    position: 'absolute',
    top: -3,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  walletCard: { backgroundColor: "white", padding: 0, elevation: 1, width: "100%", height: 70, marginVertical: 10, borderRadius: 50, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
