// const arrows = [
//     {
 //     id: 1,
 //     name: "top",
 //     image: require("../assets/top-arrow.png"),
 //     imgStyles: {
 //       position: "absolute",
 //       top: 8,
 //       left: 36,
 //       display: "flex",
 //       justifyContent: "center",
 //       alignItems: "center",
 //       height: 30,
 //       width: 30,
 //     },
 //   },
 //   {
 //     id: 2,
 //     name: "bottom",
 //     image: require("../assets/bottom-arrow.png"),
 //     imgStyles: {
 //       position: "absolute",
 //       bottom: 8,
 //       left: 36,
 //       display: "flex",
 //       justifyContent: "center",
 //       alignItems: "center",
 //       height: 30,
 //       width: 30,
 //     },
 //   },
 //   {
 //     id: 3,
 //     name: "left",
 //     image: require("../assets/left-arrow.png"),
 //     imgStyles: {
 //       position: "absolute",
 //       top: 36,
 //       left: 8,
 //       display: "flex",
 //       justifyContent: "center",
 //       alignItems: "center",
 //       height: 30,
 //       width: 30,
 //     },
 //   },
 //   {
 //     id: 4,
 //     name: "right",
 //     image: require("../assets/right-arrow.png"),
 //     imgStyles: {
 //       position: "absolute",
 //       top: 36,
 //       right: 8,
 //       display: "flex",
 //       justifyContent: "center",
 //       alignItems: "center",
 //       height: 30,
 //       width: 30,
 //     },
 //   },
 // ];
 
 // const AvatarControls = ({sendDataToWebView}) => {
 
 
   
 //   return (
 //     <View style={styles.arrowsContainer}>
 //       <ImageBackground
 //         source={require("../assets/base.png")}
 //         style={{
 //           width: 100,
 //           height: 100,
 //           display: "flex",
 //           justifyContent: "center",
 //           alignItems: "center",
 //           position: "relative",
 //         }}
 //       >
 //         {arrows.map((arrow) => {
 //           return (
 //             <TouchableOpacity
 //               style={arrow.imgStyles}
 //               onPress={() => {
 //                 sendDataToWebView(arrow.name);
 //                 // Alert.alert("You pressed the " + arrow.name + " arrow");
 //               }}
 //               key={arrow.id}
 //             >
 //               <Image source={arrow.image} />
 //             </TouchableOpacity>
 //           );
 //         })}
 //       </ImageBackground>
 //     </View>
 //   );
 // };