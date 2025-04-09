import { cl, err, serverError } from '../utils/logger.js'
import { jsonResponce } from './jsonResponce.js'
import bcryp from 'bcrypt'

export class ControllerProduct {
  constructor({ modelProducts }) {
    this.modelProducts = modelProducts
  }

  getProduct = async (req, res) => {
    try {
      const products = await this.modelProducts.getAllProducts() || []

      res.status(200).json(jsonResponce(200, true, products))
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, serverError))
    } 
  }

  getProductById = async (req, res) => {
    try {
      const { id } = req.params

      const product = await this.modelProducts.getByIdProduct({ id: id })
      
      res.status(200).json(jsonResponce(200, true, product))
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, serverError))
    }
  }

} 