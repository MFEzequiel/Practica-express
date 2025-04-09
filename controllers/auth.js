import { validateAllFields, validateFields } from "../scheme/scheme.js"
import { SECRET_KEY } from "../utils/config.js"
import { cl, err } from "../utils/logger.js"
import { jsonResponce } from "./jsonResponce.js"
import jwt from 'jsonwebtoken'
import bc from 'bcrypt'

export class ControllerUsers {
  constructor ({ modelsUsers }) {
    this.modelsUsers = modelsUsers
  }

  getAllUser = async (req, res) => {
    try {
      const data = await this.modelsUsers.getAllUser()
      res.status(200).json(jsonResponce(200, true, data))
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, { message: 'Internal server error' }))
    }
  }

  loginUser = async (req, res) => {
    try {
      const result = await validateFields(req.body)
      
      if (!result.success) {
        res.status(400).json(jsonResponce(400, false, { message: result.error })) 
      }else {
        const { username, password } = result.data
      
        const n = username.toLowerCase()
        // hashedPassword
        // const saltRounds = 10
        // const hashedPassword = await bc.hash(password, saltRounds)

        const isRegister = await this.modelsUsers.verifycUserLogin({ username: `@${n}`, password: password })
  
        if(isRegister) {
          const user = await this.modelsUsers.loginUser({ username: `@${n}`, password: password })
          const userData = {id:user[0].id, username: user[0].username}
          const token = jwt.sign(
            {id:user[0].id, username: user[0].username},  
            SECRET_KEY,
            {'expiresIn': '1h'}
          )

          res
          .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
          })
          .json(jsonResponce(200, true , { userData }))
          
        } else {
          res.status(404).json(jsonResponce(404, false, { message: 'Usuario o contraseña incorrectos' }))
        }
      }
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, { message: 'Internal server error' }))
    }
  } 

  signupUser = async (req, res) => {
    try {
      const result = await validateAllFields(req.body)
      
      if (!result.success) {
        res.status(400).json(jsonResponce(400, false, { message: result.error }))
      } else {
        const { name, username, email, password } = result.data
      
        const isRegitered = await this.modelsUsers.verifycUserSignup({ username: `@${username}`, email: email })
        const n = username.toLowerCase()
  
        if (isRegitered) {
          res.status(401).json(jsonResponce(401, false, isRegitered))
        } else {
          const user = await this.modelsUsers.createUser({name: name, username: `@${n}`, email: email, phone: '+54 3644', password: password})      
          res.status(201).json(jsonResponce(201, true, { message: 'Created user' }))
        }
        
      }
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, { message: 'Internal server error' }))
    }
  }

  verifycUser = async (req, res) => {
    try {
      
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, { message: 'Internal server error' }))
    }
  }

  logoutUser = async (req, res) => {
    try {
      res.clearCookie('access_token')
      res.status(200).json(jsonResponce(200, true, { message: 'Close sesion' }))
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, { message: 'Internal server error' }))
    }
  }

  protected = async (req, res) => {
    try {
      
    } catch (error) {
      err(error)
      res.status(500).json(jsonResponce(500, false, { message: 'Internal server error' }))
    }
  }
}