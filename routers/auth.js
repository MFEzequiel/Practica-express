import { Router } from "express";
import { ControllerUsers } from "../controllers/auth.js";

export function routerUsers({ modelsUsers }) {
  const rU = Router()
  const controllersUsers = new ControllerUsers({ modelsUsers })

  rU.get('/', controllersUsers.getAllUser)
  
  rU.post('/login', controllersUsers.loginUser)
  rU.post('/signup', controllersUsers.signupUser)
  rU.post('/logout', controllersUsers.logoutUser)
  rU.post('/verifyc', controllersUsers.verifycUser)
  
  rU.get('/protected', controllersUsers.protected)

  return rU
}