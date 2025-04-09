import { dbPool } from '../utils/config.js'
import { cl, err } from '../utils/logger.js'

export class ModelsUsers {
  static async getAllUser () {
    try {
      const query =
        'SELECT id, name, username, email, phone, password FROM client'
      const [result] = await dbPool.query(query)
      return result
    } catch (error) {
      err(err)
    }
  }

  static async createUser ({ name, username, email, phone, password }) {
    try {
      const query =
        'INSERT INTO client (id, name, username, email, phone, password) VALUES(?,?,?,?,?,?)'
      const id = 3
      const [row] = await dbPool.query(query, [
        id,
        name,
        username,
        email,
        phone,
        password
      ])
      return { message: 'User created' }
    } catch (error) {
      err(error)
    }
  }

  static async loginUser ({ username, password }) {
    try {
      const query =
        'SELECT id, username, password FROM client WHERE username = ? AND password = ?'

      const [result] = await dbPool.query(query, [username, password])

      return result
    } catch (error) {
      err(error)
    }
  }

  static async verifycUserSignup ({ username, email }) {
    try {
      const query =
        'SELECT username, email FROM client WHERE username = ? OR email = ?'

      const [result] = await dbPool.query(query, [username, email])

      return result.length > 0 ? { message: 'User already existed' } : ''
    } catch (error) {
      err(error)
    }
  }

  static async verifycUserLogin ({ username, password }) {
    try {
      const query =
        'SELECT username, password FROM client WHERE username = ? AND password = ?'
      const [result] = await dbPool.query(query, [username, password])
      cl(result)
      return result.length > 0 ? 'ok' : ''
    } catch (error) {
      err(error)
    }
  }
}
