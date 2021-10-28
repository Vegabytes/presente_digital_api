import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller"
const router = Router();
import { authJwt } from '../middlewares'

router.get('/', productsCtrl.getProducts);
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct);
router.get('/:productId', productsCtrl.getProductById);
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById);
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById);

export default router;