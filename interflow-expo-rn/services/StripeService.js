import { restRoutes } from "../utils/constants";
import RestClient from "../config/RestClient";

class StripeService {
    async createPaymentIntent(userId, amount) {
        const currency = 'usd'
        console.log('was hereeee')
    return RestClient().post(restRoutes(userId).createPaymentIntent, { amount, currency })
      .then((response) => {
        console.log('response', response.data)
         return response.data;
      });
     }

     async addTokens(userId, tokensAmount) {
        console.log('was hereeee, add tokens')
    return RestClient().post(restRoutes(userId).addTokens, { tokensAmount })
        .then((response) => {
            console.log('response', response.data)
            return response.data;
        })
    }
}

export default new StripeService();