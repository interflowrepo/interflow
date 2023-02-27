import RestClient from "../config/RestClient";
import { restRoutes } from "../utils/constants";

class UserService {
  async postLogin(data) {
    return RestClient()
      .post(restRoutes().login, data)
      .then((response) => {
        return response.data;
      });
  }

  async generateCustom(id, data){
    return RestClient()
      .post(restRoutes(id).generateCustom, data)
      .then((response) => {
        return response.data;
      });
  }

  async revealCustom(id){
    return RestClient()
      .post(restRoutes(id).revealCustom)
      .then((response) => {
        return response.data;
      });
  }

  async getCustom(id){
    return RestClient()
      .get(restRoutes(id).getCustom)
      .then((response) => {
        return response.data;
      });
  }

  async postFollowUnfollow(id, data) {
    return RestClient()
      .post(restRoutes(id).followUnfollow, data)
      .then((response) => {
        return response.data;
      });
  }

  async postCreatePost(id, data) {
    return RestClient()
      .post(restRoutes(id).createPost, data)
      .then((response) => {
        return response.data;
      });
  }

  async getAllPosts() {
    return RestClient()
      .get(restRoutes().getAllPosts)
      .then((response) => {
        return response.data;
      });
  }

  async getUserNfts(id) {
    return RestClient()
      .get(restRoutes(id).getUserNfts)
      .then((response) => {
        return response.data;
      });
  }

  async getUserFollowers(id) {
    return RestClient()
      .get(restRoutes(id).getUserFollowers)
      .then((response) => {
        return response.data;
      });
  }

  async getUserFollowing(id) {
    return RestClient()
      .get(restRoutes(id).getUserFollowing)
      .then((response) => {
        return response.data;
      });
  }

  async getUserExplore(id) {
    return RestClient()
      .get(restRoutes(id).getUserExplore)
      .then((response) => {
        return response.data;
      });
  }

  async getRaking() {
    return RestClient()
      .get(restRoutes().getRaking)
      .then((response) => {
        return response.data;
      });
  }

  async getUserCollectionData(id) {
    return RestClient()
      .get(restRoutes(id).getUserCollectionData)
      .then((response) => {
        return response.data;
      });
  }

  async updateUserData(id, data) {
    return RestClient()
      .put(restRoutes(id).updateUserData, data)
      .then((response) => {
        return response.data;
      });
  }

  async deleteUser(id) {
    return RestClient()
      .delete(restRoutes(id).deleteUser)
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
