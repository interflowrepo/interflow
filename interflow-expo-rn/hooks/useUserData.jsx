import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import UserService from "../services/UserService";

export default function useUserData() {
  const { userId } = useAuth();
  const [collection, setCollection] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [exploreUsers, setExploreUsers] = useState([])
  const [followingUsers, setFollowingUsers] = useState([])

  const userData = useMemo(async () => {
    const result = await UserService.getUserCollectionData(userId);
    setCollection(Object.values(result.collections))
  }, [userId]);

  const userNfts = useMemo(async () => {
    const result = await UserService.getUserNfts(userId);
    let nfts = Object.values(result)
    let nftsFiltered = nfts.filter(nft => nft.length > 0)
    setNfts(nftsFiltered)
    }, [userId]);

    const exploreUsersFn = useMemo(async () => {
      const result = await UserService.getUserExplore(userId);
      console.log("EXPLORE USERS", result)
      setExploreUsers(result)
    }, [])

    const getUserCollectionData = useCallback(async (userId) => {
      let result = await UserService.getUserCollectionData(userId).then((res) => {
        return res;
      });
      return result
    }, [])

    const getUserNfts = useCallback(async (userId) => {
      let result = await UserService.getUserNfts(userId).then((res) => {
        return res;
      });
      return result
    }, [])

    const followingUsersFn = useMemo(async () => {
      const result = await UserService.getUserFollowing(userId);
      console.log("FOLLOWING USERS", result)
      setFollowingUsers(result)
    }, [])
    

    const followUnfollowUser = useCallback(async (id) => {
      const data = {
        userToFollowId: id
      }
      const result = await UserService.postFollowUnfollow(userId, data);
      console.log("FOLLOW USER", result)
      return result
    }, [])

    const getRanking = useCallback(async () => {
      const result = await UserService.getRanking();
      return result
    }, [])

  return {
    userData,
    collection,
    userNfts,
    nfts,
    exploreUsers,
    exploreUsersFn,
    exploreUsers,
    followingUsers,
    getUserCollectionData,
    followUnfollowUser,
    getUserNfts,
    getRanking
  };
}
