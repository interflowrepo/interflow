const axios = require("axios");

class AxiosService {
  async get(url) {
    const config = {
      method: "get",
      url: `${process.env.WALLET_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios(config)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });

    return result;
  }

  async post(url, data?): Promise<any> {
    const config = {
      method: "post",
      url: `${process.env.WALLET_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const result = await axios(config)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });

    return result;
  }
}

export default new AxiosService();
