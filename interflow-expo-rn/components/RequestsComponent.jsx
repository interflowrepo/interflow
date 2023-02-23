import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import UserService from "../services/UserService";

export default function RequestsComponent() {
  const [result, setResult] = useState();

  //LOGIN / CREATE THE USER IF NOT EXIST
  // PARAMS: email, authId(Google Auth Id)
  const loginUser = async () => {
    let data = {
      email: "test3233@gmail.com",
      authId: "12312255213",
    };

    let result = await UserService.postLogin(data);
    console.log("response", result);
    setResult(result);
  };

  //SOCIAL PART -------------------------------------------

  // //START TO FOLLOW A USER
  // const followUser = async (id) => {
  //   id = "8d080d7d-c213-496e-b646-74647fe69880";
  //   let data = {
  //     userToFollowId: "74c10ebb-37ef-48a7-a88d-9c8fcc9f88ea",
  //   };
  //   let result = await UserService.postFollow(id, data);
  //   console.log("response", result);
  //   setResult(result);
  // };

  // //STOP TO FOLLOW A USER
  // const unfollowUser = async (id) => {
  //   let userToUnfollowId = {
  //     userToUnfollowId: "8d080d7d-c213-496e-b646-74647fe69880",
  //   };
  //   let result = await UserService.postUnfollow(id, userToUnfollowId);
  //   console.log("response", result);
  //   setResult(result);
  // };

  //GET THE ACCOUNTS THAT THE USER IS FOLLOWING SORTED
  // const getUserFollowing = async (id) => {
  //   id = "8d080d7d-c213-496e-b646-74647fe69880";
  //   let result = await UserService.getUserFollowing(id);
  //   console.log("response", result);
  //   setResult(result);
  // };

  // //GET THE ACCOUNTS THAT ARE FOLLOWING THE USER SORTED
  // const getUserFollowers = async (id) => {
  //   id = "8d080d7d-c213-496e-b646-74647fe69880";
  //   let result = await UserService.getUserFollowers(id);
  //   console.log("response", result);
  //   setResult(result);
  // };

  // const getUserExplorePageData = async (id) => {
  //   id = "8d080d7d-c213-496e-b646-74647fe69880";
  //   let result = await UserService.getUserExplorePageData(id);
  //   console.log("response", result);
  //   setResult(result);
  // };

  // const getRanking = async () => {
  //   let result = await UserService.getRaking();
  //   console.log("response", result);
  //   setResult(result);
  // };

  //SOCIAL PART -------------------------------------------

  //CREATE A POST FOR THE USER
  const createPost = async (id) => {
    id = "8d080d7d-c213-496e-b646-74647fe69880"
    let data = {
      nftId: "1234444",
      nftImageLink: "https/.44444",
      nftCollectionName: "string4444",
      nftType: "string4444",
      postText: "strin4123g",
      timestamp: "stri123123ng",
      isOwner: true,
    };
    let result = await UserService.postCreatePost(id, data);
    console.log("response", result);
    setResult(result);
  };

  //THIS GET ALL POSTS FROM ALL USERS
  const getAllPosts = async () => {
    let result = await UserService.getAllPosts();
    console.log("response", result);
    setResult(result);
  };

  //GET ALL NFTS FROM A USER WITH NFT DATA
  const getUserNfts = async (id) => {
    id = "8d080d7d-c213-496e-b646-74647fe69880";
    let result = await UserService.getUserNfts(id);
    console.log("response", result);
    setResult(result);
  };

  const getUserCollectionData = async (id) => {
    id = "8d080d7d-c213-496e-b646-74647fe69880";
    let result = await UserService.getUserCollectionData(id);
    console.log("response", result);
    setResult(result);
  };

  const updateUserData = async (id) => {
    id = "8d080d7d-c213-496e-b646-74647fe69880";
    let data = {
      nickname: "Test User",
      bloctoAddress: "0x123121312342",
      dapperAddress: "0x62b61f9f7fc77f7e",
    };
    let result = await UserService.updateUserData(id, data);
    console.log("response", result);
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Button title={"Login User"} onPress={loginUser} />
      <Button title={"Create Post"} onPress={createPost} />
      <Button title={"Get All Posts"} onPress={getAllPosts} />
      <Button title={"Get User Nfts"} onPress={getUserNfts} />
      {/* <Button title={"Follow User"} onPress={followUser} />
      <Button title={"Unfollow User"} onPress={unfollowUser} />
      <Button title={"Get User Following"} onPress={getUserFollowing} />
      <Button title={"Get User Followers"} onPress={getUserFollowers} /> */}
      {/* <Button
        title={"Get User Explore Page Data"}
        onPress={getUserExplorePageData}
      />
      <Button title={"Get Ranking"} onPress={getRanking} /> */}
      <Button title={"Update User Data"} onPress={updateUserData} />
      <Button
        title={"Get User Collection Data"}
        onPress={getUserCollectionData}
      />
      {/* <View style={styles.userInfo}>
        <Text>{result}</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
});
