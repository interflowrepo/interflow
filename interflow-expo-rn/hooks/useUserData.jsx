import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import UserService from "../services/UserService";

export default function useUserData() {
  const { userId } = useAuth();
  const [collection, setCollection] = useState([]);
  const [nfts, setNfts] = useState([]);

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

  return {
    userData,
    collection,
    userNfts,
    nfts
  };
}
