import { Router } from "express";
import { ControllerProduct } from "../controllers/product.js";

export function routerProduct({ modelProducts }) {
  const rP = Router()
  const controllerProduct = new ControllerProduct({ modelProducts })
  
  rP.get('/', controllerProduct.getProduct)
  rP.get('/:id', controllerProduct.getProductById)

  return rP
}