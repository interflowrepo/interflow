export const restRoutes = (id) => {
    return {
      // ------ POSTS
      login: "/users/auth/login",
      followUnfollow: `/users/social/followUnfollow/${id}`,
      createPost: `/posts/create/${id}`,
      createPaymentIntent: `/payment/create/${id}`,
      addTokens: `/payment/addTokens/${id}`,
      generateCustom: `/image/generate/${id}`,
      revealCustom: `/image/reveal/${id}`,
      
  
      // ------ GETS
      getUserCollectionData: `/users/getUserCollectionData/${id}`,
      getUserNfts: `/users/getUserNfts/${id}`,
      getUserFollowers: `/users/social/followers/${id}`,
      getUserFollowing: `/users/social/following/${id}`,
      getUserExplore: `/users/social/explore/${id}`,
      getRanking: `/users/social/ranking`,
      getAllPosts: `/posts/getAllPosts`,
      getCustom: `/image/getInterflow/${id}`,
  
      // ------ PUTS
      updateUserData: `/users/update/${id}`,
  
      // ------ DELETES
      deleteUser: `/users/delete/${id}`,
    };
  };