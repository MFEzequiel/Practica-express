import paypal from 'payal-rest-sdk'
import { cl, err } from '../utils/logger'

paypal.configure({
  mode: 'live', // for production 
  client_id: '1$3@h',
  client_secret: '1Ab2$s3@c4#'
})

export function createPayment({ amount, returnUrl, cancelUrl }) {
  try {
    const paymentJson = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: returnUrl,
        cancel_url: cancelUrl
      },
      transaction : [{
        amount: {
          total: amount,
          currency: 'USD'
        },
        description: 'Compra en TheBrother'
      }]
    }

    paypal.payment.create(paymentJson, (er, pay) => {
      if (er) {
        err(er)
      } else {
        const approvalUrl = payment.link.find(link => link.rel === 'aproval_url').href
        cl('Regiter a: ', approvalUrl)
      }
    })
  } catch (error) {
    err(error)
  }
}