export const restRoutes = (id) => {
    return {
      // ------ POSTS
      login: "/users/auth/login",
      followUnfollow: `/users/social/followUnfollow/${id}`,
      createPost: `/posts/create/${id}`,
  
      // ------ GETS
      getUserCollectionData: `/users/getUserCollectionData/${id}`,
      getUserNfts: `/users/getUserNfts/${id}`,
      getUserFollowers: `/users/social/followers/${id}`,
      getUserFollowing: `/users/social/following/${id}`,
      getUserExplore: `/users/social/explore/${id}`,
      getRaking: `/users/social/ranking`,
      getAllPosts: `/posts/getAllPosts`,
  
      // ------ PUTS
      updateUserData: `/users/update/${id}`,
  
      // ------ DELETES
      deleteUser: `/users/delete/${id}`,
    };
  };