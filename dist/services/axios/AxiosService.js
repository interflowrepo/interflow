"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const axios = require("axios");
class AxiosService {
  async get(url) {
    const config = {
      method: "get",
      url: `${process && process.env && process.env.WALLET_URL || "http://localhost:3000/v1"}${url}`,
      headers: {
        "Content-Type": "application/json"
      }
    };
    const result = await axios(config).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
    return result;
  }
  async post(url, data) {
    const config = {
      method: "post",
      url: `${process && process.env && process.env.WALLET_URL || "http://localhost:3000/v1"}${url}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    };
    const result = await axios(config).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
    return result;
  }
}
var _default = new AxiosService();
exports.default = _default;