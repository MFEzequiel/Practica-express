import { dbPool } from '../utils/config.js'
import { cl, err } from '../utils/logger.js'

export class ModelProducts {
  static async getAllProducts () {
    try {
      const query =
        'SELECT id, name, description, available_quantity_in_stock, current_price, product_image_url FROM products'
      const [result] = await dbPool.query(query)

      return result
    } catch (error) {
      err(error)
    }
  }

  static async getProductById ({ id }) {
    try {
      const query =
        'SELECT id, name, description, available_quantity_in_stock, current_price, product_image_url FROM products WHERE id = ?'
      const [result] = await dbPool.query(query, [id])
      return result
    } catch (error) {
      err(error)
    }
  }
}
