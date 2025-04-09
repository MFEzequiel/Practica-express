import stripe from 'stripe'
import { cl } from '../utils/logger'

export async function createPaymentIntent({ amount }) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currenty: 'usd'
  })
  cl(paymentIntent.client_secret)
  return paymentIntent.client_secret
}