// const axios = require("axios");

class UserService {
  async createAddress(): Promise<any> {
    let address = "0x3333";

    return address;
  }

  async getUserNftLength(
    bloctoAddress?: string,
    dapperAddress?: string
  ): Promise<Number> {
    let bloctoNfts = bloctoAddress ? 33 : 0;
    let dapperNfts = dapperAddress ? 33 : 0;
    return bloctoNfts + dapperNfts;
  }
}

export default new UserService();
