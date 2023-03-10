import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import AnimationComponent from "../components/AnimationComponent";
// import PrimaryBtn from "../components/PrimaryBtn";
import PrimaryBtnComponent from "../components/PrimaryBtnComponent";
import PrimaryBtnTxt from "../components/PrimaryBtnTxt";
import SecondaryBtn from "../components/SecondaryBtn";
import StepperComponent from "../components/StepperComponent";
import StepTxtComponent from "../components/StepTxtComponent";
import VideoPlayerComponent from "../components/VideoPlayerComponent";
import { useFcl } from "../contexts/FclContext";

const { width, height } = Dimensions.get("window");
const dimensions = {
  width,
  height,
};

const steps = [
  {
    id: "0",
    label: "Step 1",
    description: "Connect your wallets",
    src: require("../assets/onboarding/WalletIcon.png"),
  },
  {
    id: "1",
    label: "Step 2",
    description: "This is the second step",
    src: require("../assets/onboarding/avatarIcon.png"),
  },
  {
    id: "2",
    label: "Step 3",
    description: "This is the third step",
    src: require("../assets/onboarding/PhotoIcon.png"),
  },
];

const OnboardingView = ({ navigation }) => {
  const [ActualIdx, setActualIdx] = useState(0);
  const { authenticate } = useFcl()
  const pagerRef = React.useRef(null);

  useEffect(() => {
    if (pagerRef.current) {
      console.log("pagerRef.current", pagerRef.current)
      pagerRef.current.setPage(parseInt(ActualIdx));
    }

  }, [ActualIdx])

  const handleSkip = () => {
    if (ActualIdx <= 1) {
      const newIdx = parseInt(ActualIdx) + 1
      setActualIdx(newIdx.toString())
    } else {
      navigation.navigate("Home")
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StepperComponent steps={steps} actualIdx={ActualIdx} setActualIdx={setActualIdx} />
      <PagerView
        ref={pagerRef}
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={(event) => {
          setActualIdx(event.nativeEvent.position.toString());
        }}

      >
        <View style={styles.page} key="1">
          <Image source={require("../assets/n1.png")} style={styles.img2} />
          {/* <View style={styles.txtContainer}>
            <StepTxtComponent txt={steps[0].description} actualIdx={ActualIdx} />
          </View> */}
          <View style={styles.player}>
            <AnimationComponent actualIdx={ActualIdx} />
          </View>
          <View style={styles.actionsContainer}>
            <PrimaryBtnComponent
              label={"CONNECT WALLETS"}
              onPress={() => authenticate()}
            />
            <View style={styles.secondaryBtnContainer}>
              <SecondaryBtn label={"SKIP"} onPress={handleSkip} />
            </View>
          </View>
        </View>
        <View style={styles.page} key="2">
          <Image source={require("../assets/bg2.png")} style={styles.img2} />

          {/* <View style={styles.txtContainer}>
            <StepTxtComponent txt={steps[1].description} actualIdx={ActualIdx} />
          </View> */}
          <View style={styles.player}>
            <AnimationComponent actualIdx={ActualIdx} />
          </View>
          <View style={styles.actionsContainer}>
            <PrimaryBtnComponent
              label={"CREATE AVATAR"}
              onPress={() => navigation.navigate("Select")}
            />
            <View style={styles.secondaryBtnContainer}>
              <SecondaryBtn label={"SKIP"} onPress={handleSkip} />
            </View>
          </View>
        </View>
        <View style={styles.page} key="3">
          <Image source={require("../assets/bg3.png")} style={styles.img2} />
          {/* <View style={styles.txtContainer}>
            <StepTxtComponent txt={steps[1].description} actualIdx={ActualIdx} />
          </View> */}
          <View style={styles.player}>
            <AnimationComponent actualIdx={ActualIdx} />
          </View>
          <View style={styles.actionsContainer}>
            <PrimaryBtnComponent label="TAKE PROFILE PIC"
              onPress={() => navigation.navigate("Photo")}
            />
            <View style={styles.secondaryBtnContainer}>
              <SecondaryBtn label={"SKIP"} onPress={handleSkip} />
            </View>
          </View>
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  actionsContainer: {
    position: "absolute",
    bottom: 0,
    margin: 20,
    padding: 20,
  },

  viewPager: {
    flex: 1,
    backgroundColor: "#FFFFF",
  },
  page: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFF",
    position: "relative",
  },

  secondaryBtnContainer: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },

  txtContainer: {
    position: "absolute",
    width: width,
    height: height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  img1: {
    marginTop: 70,
  },

  img2: {
    width: 330,
    resizeMode: "contain",
    position: "absolute",
    top: height / 5,
    zIndex: -2,
  },
});

export default OnboardingView;
